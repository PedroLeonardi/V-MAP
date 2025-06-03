import MapWrapper from '../Components/MapaRota/MapWrapper';

export default function MapPage() {
  return (
    <main>
      <h1>Mapa com Rota e Marcador</h1>
      <div className='h-500 w-full'>
      <MapWrapper />
      </div>
    </main>
  );
}
