import MapWrapper from '../Components/MapaRota/MapWrapper';

export default function MapPage() {
  return (
    <main>
      <h1>Mapa com Rota e Marcador</h1>
      <div className='h-100 w-[50%]'>
      <MapWrapper />
      </div>
    </main>
  );
}
