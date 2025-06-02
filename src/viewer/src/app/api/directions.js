// pages/api/directions.js
export default async function handler(req, res) {
    const { waypoints } = req.query;
  
    if (!waypoints) {
      return res.status(400).json({ error: 'Waypoints são necessários' });
    }
  
    const accessToken = process.env.MAPBOX_ACCESS_TOKEN;
  
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${waypoints}?geometries=geojson&access_token=${accessToken}`;
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        const errorText = await response.text();
        return res.status(response.status).json({ error: errorText });
      }
  
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  