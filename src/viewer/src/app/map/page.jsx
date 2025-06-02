import dynamic from 'next/dynamic';
import Head from 'next/head';
import MapaRota from '../Components/MapaRota/MapaRota.jsx'

// const MapaRota = dynamic(() => import('../components/MapaRota'), { ssr: false });

export default function Home() {
  return (
    <>


      <main style={{ padding: '1rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>
          Mapa com Rota e Imagem
        </h1>

        <MapaRota />
      </main>
    </>
  );
}
