'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RotaProtegidaAdm({ children, requiredRole = 'admin' }) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            const userType = localStorage.getItem('usuarioType');

            if (!token || userType !== requiredRole) {
                router.push('/login');
            } else {
                setIsAuthorized(true);
            }
            setIsLoading(false);
        }
    }, [router, requiredRole]);

    if (typeof window === 'undefined' || isLoading) {
        return null; // Ou um componente de loading
    }

    if (!isAuthorized) {
        return null;
    }

    return children;
}