'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'SEU_TOKEN_DO_MAPBOX'; // substitua aqui

export default function MapaRota() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const waypoints = [
    [-43.2096, -22.9035],
    [-43.1965, -22.9122],
    [-43.1800, -22.9707],
  ];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: waypoints[0],
      zoom: 13,
    });

    const map = mapRef.current;

    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
      <strong>Copacabana</strong><br/>
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/77/Rio_de_Janeiro_Copacabana.jpg" width="200" style="border-radius:8px;" />
    `);

    new mapboxgl.Marker()
      .setLngLat(waypoints[2])
      .setPopup(popup)
      .addTo(map);

    // Monta a URL para a API Directions
    const coordsStr = waypoints.map(coord => coord.join(',')).join(';');

    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordsStr}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (!data.routes || !data.routes.length) {
          console.error('Nenhuma rota encontrada');
          return;
        }

        const routeGeo = data.routes[0].geometry;

        map.on('load', () => {
          if (map.getSource('route')) return;

          map.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: routeGeo,
            },
          });

          map.addLayer({
            id: 'route-line',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: {
              'line-color': '#0074D9',
              'line-width': 4,
            },
          });
        });
      })
      .catch(err => {
        console.error('Erro ao buscar rota:', err);
      });

    return () => map.remove();
  }, []);

  return (
    <div style={{ width: '100%', height: '80vh' }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
