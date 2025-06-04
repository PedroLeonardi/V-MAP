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
  const [idOnibusAtual, setIdOnibusAtual] = useState([]);

  const limite = [
    [-48.68449, -20.92510],
    [-48.60369, -20.89062],
  ];

  // 1. Carrega rota da API
  useEffect(() => {
    axios.get('http://localhost:3001/mapa')
      .then((response) => {
        const pontos = response.data.mensagem;
        const pontoInicial = [-48.63251, -20.90702];
        const pontoEscola = [-48.65079, -20.92392];

        const checkpoints = pontos.map(p => [p.longitude, p.latitude]);
        const completa = [pontoInicial, ...checkpoints, pontoEscola];
        const idOnibus = pontos.map(p => p.rota_id);

        setRouteCoordinates(completa);
        setIdOnibusAtual(idOnibus);
      })
      .catch(err => console.error('Erro ao buscar o mapa: ', err));
  }, []);

  // 2. Inicializa o mapa
  useEffect(() => {
    if (routeCoordinates.length === 0) return;

    const centerInicial = routeCoordinates[selectedIndex] || routeCoordinates[0];

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      zoom: 15.2,
      pitch: 0,
      bearing: -10,
      center: centerInicial,
      maxBounds: limite,
      style: 'mapbox://styles/phleonardi/cmazfo0p4008y01sd73upb4xx',
    });

    mapRef.current = map;

    map.on('load', async () => {
      try {
        // Dados GeoJSON para checkpoints
        const geoData = {
          type: 'FeatureCollection',
          features: routeCoordinates.slice(1, -1).map((coord, i) => ({
            type: 'Feature',
            properties: {
              nome_rua: `Parada ${i + 1}`,
              horario: '06:00'
            },
            geometry: {
              type: 'Point',
              coordinates: coord
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

        // Popups
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
        console.error('Erro ao carregar mapa:', err);
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
      id_rota_onibus: idOnibusAtual[selectedIndex]
    };
  
    axios.post('http://localhost:3001/log/onibus', dataLog)
      .then(() => console.log("Log enviado"))
      .catch(err => console.error("Erro ao enviar log:", err));
  
    // Salva local no localStorage
    try {
      const localizacao = routeCoordinates[selectedIndex];
      localStorage.setItem("currentLocation", JSON.stringify(localizacao));
      console.log("Localização salva no localStorage:", localizacao);
    } catch (err) {
      console.error("Erro ao salvar localização:", err);
    }
  
    // Recupera local do localStorage com verificação segura
    try {
      const stored = localStorage.getItem("currentLocation");
      if (stored) {
        const local = JSON.parse(stored);
        console.log("Localização recuperada:", local);
      } else {
        console.log("Nenhuma localização salva no localStorage.");
      }
    } catch (err) {
      console.error("Erro ao recuperar localização:", err);
    }
  }, [selectedIndex, routeCoordinates]);
  


  


  return <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />;
}
