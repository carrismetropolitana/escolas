Based on starter template for [Learn Next.js](https://nextjs.org/learn).

# Passos

1. instalar npm: `install npm`
2. lançar app: `npm run dev`. Eventualmente correr noutro porto para não entrar em conflito com o index do pdf_generator, `npm run dev -- -p 3005`
3. em /utils lançar app gerador pdfs `node pdfGenerator.js`


futuros passos:
3. deploy in docker container, https://blog.tericcabrel.com/create-docker-image-nextjs-application/



# Pacotes a instalar
* npm i react-map-gl maplibre-gl

# A integrar

* SWR: https://swr.vercel.app/docs/with-nextjs


# API cmescola
* `https://cmescola.pythonanywhere.com/` 
* cmescola
* cmescola


###  **enpoint: municípios**

* [https://cmescola.pythonanywhere.com/municipios](https://cmescola.pythonanywhere.com/municipios)
* **exemplo**: `{"municipios": [{"id": 4, "nome": "Alcochete"}, {"id": 1, "nome": "Almada"}, {"id": 13, "nome": "Amadora"}, {"id": 14, "nome": "Cascais"}, {"id": 15, "nome": "Lisboa"}, {"id": 9, "nome": "Loures"}, {"id": 11, "nome": "Mafra"}, {"id": 5, "nome": "Moita"}, {"id": 6, "nome": "Montijo"}, {"id": 10, "nome": "Odivelas"}, {"id": 16, "nome": "Oeiras"}, {"id": 7, "nome": "Palmela"}, {"id": 2, "nome": "Seixal"}, {"id": 3, "nome": "Sesimbra"}, {"id": 8, "nome": "Set\u00fabal"}, {"id": 17, "nome": "Sintra"}, {"id": 12, "nome": "Vila Franca de Xira"}]}`



### **enpoint: escolas do município**

* [https://cmescola.pythonanywhere.com/escolas/<municipio_id>](https://cmescola.pythonanywhere.com/escolas/1)
* **exemplo**: `{"escolas": [{"id": 1, "nome": "EB1 Almada", "municipio_id": 1, "morada": "Rua da Escola, 1, Almada"}, {"id": 2, "nome": "EB2 Almada", "municipio_id": 1, "morada": "Rua da Escola, 2, Almada"}, {"id": 3, "nome": "EB3 Almada", "municipio_id": 1, "morada": "Rua da Escola, 3, Almada"}, {"id": 4, "nome": "EB4 Almada", "municipio_id": 1, "morada": "Rua da Escola, 4, Almada"}, {"id": 5, "nome": "EB5 Almada", "municipio_id": 1, "morada": "Rua da Escola, 5, Almada"}, {"id": 6, "nome": "EB5 Almada", "municipio_id": 1, "morada": "Rua da Escola, 5, Almada"}]}`


### **enpoint: escola**
* retorna:
    * nome da escola
    * coordenadas da escola
    * paragens dentro dum raio de 100 metros, com:
        * coordenadas 
        * linhas que por lá passam com informação de:
            * número
            * cor
            * nome partida-chegada

* [https://cmescola.pythonanywhere.com/escola/<escola_id>](https://cmescola.pythonanywhere.com/escola/1)
* **exemplo**: `{"escola": {"id": 1, "nome": "EB1 Almada", "municipio_id": 1, "morada": "Rua da Escola, 1, Almada"}}`


# Fonte

Inter



# Mapa
https://github.com/joao-vasconcelos/go/tree/production/dashboard/components/OSMMap


```
<OSMMap id='allStops' mapStyle={mapStyle} onClick={handleMapClick} interactiveLayerIds={['all-stops']}>
        <Source id='all-stops' type='geojson' data={mapData}>
          <Layer id='all-stops' type='circle' source='all-stops' paint={{ 'circle-color': '#ffdd01', 'circle-radius': 6, 'circle-stroke-width': 2, 'circle-stroke-color': '#000000' }} />
        </Source>
      </OSMMap>
```

```
const mapData = useMemo(() => {
    // Create a GeoJSON object
    const geoJSON = {
      type: 'FeatureCollection',
      features: [],
    };

    // Loop through each stop in the collection and setup the feature to the GeoJSON object.
    if (allStopsData) {
      for (const stop of allStopsData) {
        geoJSON.features.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [parseFloat(stop.longitude), parseFloat(stop.latitude)],
          },
          properties: {
            _id: stop._id,
            code: stop.code,
            name: stop.name,
            latitude: stop.latitude,
            longitude: stop.longitude,
          },
        });
      }
    }
    // Return parsed data
    return geoJSON;
    // Only run if allStopsData changes
  }, [allStopsData]);
```

# APIs

* [https://github.com/carrismetropolitana/schedules-api](https://github.com/carrismetropolitana/schedules-api)
* https://schedules.carrismetropolitana.pt/api/stops
* https://api.carrismetropolitana.pt/facilities


* api.carrismetropolitana.pt/facilities
* api.carrismetropolitana.pt/stops
* api.carrismetropolitana.pt/stops/{stop_id}
* api.carrismetropolitana.pt/lines
* api.carrismetropolitana.pt/municipalities
* api.carrismetropolitana.pt/patterns/{pattern_id}

### escolhe municipio
* api.carrismetropolitana.pt/municipalities

### escolhe escola
de api.carrismetropolitana.pt/facilities
* filtrar facilities por school e municipio
* listar escolas obtidas

### escola
da escola escolhida, extrair objeto
* info da paragem
* lista de stops

de api.carrismetropolitana.pt/stops/{stop_id}
* extrair info de cada um dos stop

