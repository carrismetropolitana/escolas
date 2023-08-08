Based on starter template for [Learn Next.js](https://nextjs.org/learn).

# Passos

1. descarregar do repo
1. instalar npm: `npm install`
2. lançar app: `npm run dev`
3. na pasta /utils lançar app gerador pdfs `node pdfGenerator.js`


### Proximos passos

* deploy in docker container: https://blog.tericcabrel.com/create-docker-image-nextjs-application/
* usar SWR: https://swr.vercel.app/docs/with-nextjs
* integrar fonte Inter
* 


## APIs da TML usadas

* [https://github.com/carrismetropolitana/schedules-api](https://github.com/carrismetropolitana/schedules-api)
* https://schedules.carrismetropolitana.pt/api/stops
* https://api.carrismetropolitana.pt/facilities


* api.carrismetropolitana.pt/municipalities
* api.carrismetropolitana.pt/facilities
* api.carrismetropolitana.pt/facilities/{facilities_id}
* api.carrismetropolitana.pt/stops
* api.carrismetropolitana.pt/stops/{stop_id}
* api.carrismetropolitana.pt/patterns/{pattern_id}
* api.carrismetropolitana.pt/lines

### listagem de municipios
`api.carrismetropolitana.pt/municipalities`

### listagem de escolas e universidades de um município
`api.carrismetropolitana.pt/facilities`
* filtrar facilities por school ou university e municipio

### informação da escola 
`api.carrismetropolitana.pt/facilities/{facilities_id}`
da escola escolhida, extrair objeto que tem:
* nome da escola, coordenadas
* lista de paragens vizinhas

### informação de cada paragem 
`https://schedules.carrismetropolitana.pt/api/stops/{stop_id}`
extrair info de uma paragem:
* nome da paragem, numero, coordenadas, 
* linhas que passam




# API cmescola no PYthonAnyWhere
foi desenvolvida uma API teste, antes de estarem disponiveis as APIs da TML:
* `https://cmescola.pythonanywhere.com/` 
* username: cmescola
* pwd: cmescola

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


# Mapa

* Pacotes a instalar:  `npm i react-map-gl maplibre-gl`

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