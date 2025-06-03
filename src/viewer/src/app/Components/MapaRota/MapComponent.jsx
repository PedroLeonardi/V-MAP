'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoicGhsZW9uYXJkaSIsImEiOiJjbWF3bGljN2QwZmhyMm1vcjhjZ2pvZzllIn0.Xy1oeDY-K2mnPQ9dSNxaKA';

export default function MapComponent({ selectedIndex }) {
  const mapContainerRef = useRef(null);
  const markerRef = useRef(null);
  const mapRef = useRef(null);

  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const limite = [
    [-48.68449, -20.92510],
    [-48.60369, -20.89062],
  ];

  // 🔹 1. Carrega dados da API /mapa e monta coordenadas
  useEffect(() => {
    axios.get('http://localhost:3001/mapa')
      .then((response) => {
        const pontos = response.data.mensagem;

        const pontoInicial = [-48.63251, -20.90702];
        const pontoEscola = [-48.65079, -20.92392];

        // Transforma em [[lng, lat], ...]
        const checkpoints = pontos.map(p => [p.longitude, p.latitude]);
        const completa = [pontoInicial, ...checkpoints, pontoEscola];

        setRouteCoordinates(completa);
        
      })
      .catch(err => {
        console.error('Erro ao buscar o mapa: ', err);
      });
  }, []);

  // 🔹 2. Cria o mapa com a rota
  useEffect(() => {
    if (routeCoordinates.length === 0) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      zoom: 15.2,
      pitch: 0,
      bearing: -10,
      center: routeCoordinates[1],
      maxBounds: limite,
      style: 'mapbox://styles/phleonardi/cmazfo0p4008y01sd73upb4xx',
    });

    mapRef.current = map;

    map.on('load', async () => {
      try {
        // 🔸 Dados dos checkpoints simulando GeoJSON
        const geoData = {
          type: 'FeatureCollection',
          features: routeCoordinates.slice(1, -1).map((coord, i) => ({
            type: 'Feature',
            properties: {
              nome_rua: `Parada ${i + 1}`,
              horario: '06:00' // você pode colocar horário real se quiser
            },
            geometry: {
              type: 'Point',
              coordinates: coord
            }
          }))
        };

        map.addSource('geojson-data', {
          type: 'geojson',
          data: geoData,
        });

        // 🔸 Criar rota via Directions API
        const coord_string = routeCoordinates.map(c => c.join(',')).join(';');
        const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${coord_string}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
        const directionsRes = await fetch(directionsUrl);
        const directionsData = await directionsRes.json();
        const rotas = directionsData.routes[0].geometry;

        map.addSource('rotas', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: rotas
          }
        });

        map.addLayer({
          id: 'rotas_borda',
          type: 'line',
          source: 'rotas',
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: { 'line-color': '#6f87d4', 'line-width': 8 },
        });

        map.addLayer({
          id: 'rotas',
          type: 'line',
          source: 'rotas',
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: { 'line-color': '#bacafb', 'line-width': 6 },
        });

        map.addLayer({
          id: 'rota_checkpoint',
          type: 'circle',
          source: 'geojson-data',
          paint: {
            'circle-radius': 6,
            'circle-color': '#FFFFFF',
            'circle-stroke-width': 3.5,
            'circle-stroke-color': '#000000',
          },
        });

        // 🔸 Marcador customizado
        const el = document.createElement('div');
        el.style.backgroundImage = 'url(https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg)';
        el.style.width = '32px';
        el.style.height = '32px';
        el.style.backgroundSize = 'cover';

        const customMarker = new mapboxgl.Marker(el)
          .setLngLat(routeCoordinates[selectedIndex])
          .addTo(map);

        markerRef.current = customMarker;

        // 🔸 Popups
        const rota_popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });

        map.on('mouseenter', 'rota_checkpoint', (e) => {
          const feature = e.features?.[0];
          if (!feature) return;

          rota_popup
            .setLngLat(feature.geometry.coordinates)
            .setHTML(`<h3>${feature.properties.nome_rua}</h3><p>${feature.properties.horario}</p>`)
            .addTo(map);
        });

        map.on('mouseleave', 'rota_checkpoint', () => {
          rota_popup.remove();
        });
      } catch (err) {
        console.error('Erro ao carregar mapa:', err);
      }
    });

    return () => map.remove();
  }, [routeCoordinates]);

  // 🔹 3. Atualiza marcador ao mudar o selectedIndex
  useEffect(() => {
    if (markerRef.current && routeCoordinates[selectedIndex]) {
      markerRef.current.setLngLat(routeCoordinates[selectedIndex]);
    }
  }, [selectedIndex, routeCoordinates]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
}
