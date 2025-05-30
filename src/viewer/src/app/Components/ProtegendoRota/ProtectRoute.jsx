'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RotaProtegidaAdm({ children, requiredRole = 'admin' }) {

    const router = useRouter();

    useEffect(() => {
        // aqui estou verificando o tipo
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');

            // se ele nao tiver passado pelo form
            if (!token || userTyoe !== requiredRole) {
                // redirecionar para fazer login
                router.push('/login')
            }
        }
    }, [router, requiredRole]);


    // se user nao estiver autenticado, nao renderizado
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        const userType = localStorage.getItem('usuarioType');

        if (!token || userType !== requiredRole) {
            return null;
        }

    }

    return children;
}