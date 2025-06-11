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
  const [idOnibusAtual, setIdOnibusAtual] = useState(null);
  const [checkpointsCompletos, setCheckpointsCompletos] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('rotaAtual');
    const id = stored ? Number(stored) : null;


   
    if (stored !== null && !isNaN(id) && id > 0) {
      setIdOnibusAtual(id); 

    }
  }, []);

  useEffect(() => {
    const handleCustomStorageChange = () => {
      const stored = localStorage.getItem('rotaAtual');
      const id = stored ? Number(stored) : null;

      if (stored !== null && !isNaN(id) && id > 0) {
        setIdOnibusAtual(id);

      }
    };

    window.addEventListener('rotaAtualChanged', handleCustomStorageChange);
    return () => {
      window.removeEventListener('rotaAtualChanged', handleCustomStorageChange);
    };
  }, []);;

  useEffect(() => {
    // Evita fazer a requisição se idOnibusAtual for 0, null, undefined ou qualquer falsy
    if (!idOnibusAtual || isNaN(idOnibusAtual)) return;
    if (idOnibusAtual === null || idOnibusAtual === undefined) return;
    if (!idOnibusAtual) return;

    axios.get(`http://localhost:3001/mapa/${idOnibusAtual}`)
      .then((response) => {
        const pontos = response.data.mensagem;
        const pontoInicial = [-48.63858, -20.91640];
        const pontoEscola = [-48.65011, -20.91481];

        const checkpoints = pontos.map(p => [p.longitude, p.latitude]);
        const completa = [pontoInicial, ...checkpoints, pontoEscola];
        const idOnibus = pontos[0].rota_id

        setRouteCoordinates(completa);
        setIdOnibusAtual(idOnibus);
        setCheckpointsCompletos(pontos);
      })

      .catch(err => console.error('Erro ao buscar o mapa: ', err));
  }, [idOnibusAtual]);

  
  // 2. Inicializa o mapa
  useEffect(() => {
    if (routeCoordinates.length === 0) return;

    const centerInicial = routeCoordinates[selectedIndex] || routeCoordinates[0];

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      zoom: 14.2,
      pitch: 0,
      bearing: -10,
      center: centerInicial,
      style: 'mapbox://styles/phleonardi/cmazfo0p4008y01sd73upb4xx',
    });

    mapRef.current = map;

    map.on('load', async () => {
      try {
        // Dados GeoJSON para checkpoints
        const geoData = {
          type: 'FeatureCollection',
          features: checkpointsCompletos.map((checkpoint, i) => ({
            type: 'Feature',
            properties: {
              parada: `Parada ${i + 1}`,
              horario: checkpoint.horario,
              identificacao: checkpoint.identificacao
            },
            geometry: {
              type: 'Point',
              coordinates: [checkpoint.longitude, checkpoint.latitude]
            }
          }))

        };

        // Direções da rota
        const coord_string = routeCoordinates.map(c => c.join(',')).join(';');
        const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${coord_string}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
        const directionsRes = await fetch(directionsUrl);
        const directionsData = await directionsRes.json();
        const rotas = directionsData.routes[0].geometry;

        // Rota
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

        // Checkpoints (após a linha)
        map.addSource('geojson-data', {
          type: 'geojson',
          data: geoData,
        });

        // layer checkpoint das paradas do onibus
        map.addLayer({
          id: 'rota_checkpoint',
          type: 'circle',
          source: 'geojson-data',
          paint: {
            'circle-radius': 10,
            'circle-color': '#3c8cdc',
            'circle-stroke-width': 1.5,
            'circle-stroke-color': '#404040',
          },
        });

        // layer dos numeros dos checkpoints
        map.addLayer({
          id: 'numero_parada',
          type: 'symbol',
          source: 'geojson-data',
          layout: {
            'text-field': ['slice', ['get', 'parada'], 7],
            'text-size': 12,
            'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
            'text-allow-overlap': true,
          },
          paint: {
            'text-color': '#FFFFFF',
          }
        });

        const pontoEscola_Geo = {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: { parada: 'Escola Senai', identificacao: 'Rua Élcio Delago', horario: '07:30' },
            geometry: {
              type: 'Point',
              coordinates: [-48.65011, -20.91481],
            }
          }]
        };

        // Adicionar o ponto da escola
        map.addSource('escola', {
          type: 'geojson',
          data: pontoEscola_Geo,
        });

        map.loadImage('https://upload.wikimedia.org/wikipedia/commons/f/f9/Blue_Gps_Marker.png', function (error, image) {
          if (error) {
            console.error('Erro ao carregar a imagem:', error);
            return;
          }
          map.addImage('icone_gps', image);

          map.addLayer({
            id: 'rota_escola',
            type: 'symbol',
            source: 'escola',
            layout: {
              'icon-image': 'icone_gps', // Icone temporario ate achar um melhor
              'icon-size': 0.13,
              'icon-anchor': 'bottom',
              'icon-offset': [0, 200]
            }
          });
        });

        // Popups
        const rota_popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });

        map.on('mouseenter', ['rota_checkpoint', 'rota_escola'], (e) => {
          const features = map.queryRenderedFeatures(e.point, { layers: ['rota_checkpoint', 'rota_escola'] });
          if (!features.length) return;

          const feature = features[0];

          rota_popup
            .setLngLat(feature.geometry.coordinates)
            .setHTML(`
<div class="custom-popup-content p-3 min-w-[220px] font-sans">

<h3 class="popup-title text-lg font-bold text-gray-800 mb-1">
${feature.properties.parada}
</h3>

<div class="popup-identificacao mb-3">
<span class="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-1 rounded-full">
Rua: ${feature.properties.identificacao}
</span>
</div>

<div class="popup-horario mb-4 text-sm text-gray-600 flex items-center">
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 stroke-current">
<circle cx="12" cy="12" r="10"></circle>
<polyline points="12 6 12 12 16 14"></polyline>
</svg>
<span>${feature.properties.horario}</span>
</div>

<div class="popup-coordinates text-xs text-gray-400 text-right break-all">
${Array.isArray(feature.geometry.coordinates)
                ? feature.geometry.coordinates.map(coord => coord.toFixed(6)).join(', ')
                : feature.geometry.coordinates
              }
</div>

</div>
    `)
            .addTo(map);

          map.on('mouseleave', ['rota_checkpoint', 'rota_escola'], () => {
            rota_popup.remove();
          });

        });

        // Marcador do ônibus
        const el = document.createElement('div');
        el.style.backgroundImage = 'url(https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg)';
        el.style.width = '32px';
        el.style.height = '32px';
        el.style.backgroundSize = 'cover';

        const customMarker = new mapboxgl.Marker(el)
          .setLngLat(centerInicial)
          .addTo(map);

        markerRef.current = customMarker;

      } catch (err) {
        console.log('Erro ao carregar mapa:', err);
      }
    });

    return () => map.remove();
  }, [routeCoordinates]);

  // 3. Atualiza marcador e envia log
  useEffect(() => {
    if (!routeCoordinates || !routeCoordinates[selectedIndex]) return;

    // Atualiza marcador
    if (markerRef.current) {
      markerRef.current.setLngLat(routeCoordinates[selectedIndex]);
    }

    // Envia log de localização
    const dataLog = {
      localizacao: routeCoordinates[selectedIndex],
      id_rota_onibus: idOnibusAtual

    };
    
    axios.post('http://localhost:3001/log/onibus', dataLog)
     
      .catch(err => console.log("Erro ao enviar log:", err));

    // Salva local no localStorage
    try {
      const localizacao = routeCoordinates[selectedIndex];
      localStorage.setItem("currentLocation", JSON.stringify(localizacao));
      
    } catch (err) {
      console.log("Erro ao salvar localização:", err);
    }

    // Recupera local do localStorage com verificação segura
    try {
      const stored = localStorage.getItem("currentLocation");
      if (stored) {
        const local = JSON.parse(stored);
        
      } else {
        
      }
    } catch (err) {
      console.log("Erro ao recuperar localização:", err);
    }
  }, [selectedIndex, routeCoordinates]);






  return <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />;
}
