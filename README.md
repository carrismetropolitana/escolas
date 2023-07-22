Based on starter template for [Learn Next.js](https://nextjs.org/learn).

# Passos

1. instalar npm: `install npm`
2. lançar app: `npm run dev`. Eventualmente correr noutro porto para não entrar em conflito com o index do pdf_generator, `npm run dev -- -p 3005`

futuros passos:
3. deploy in docker container, https://blog.tericcabrel.com/create-docker-image-nextjs-application/


# Generate pdf

em /pdf_generator executar:
* node index.js
* node pdf_generator.js


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


# schedules API 

* [https://github.com/carrismetropolitana/schedules-api](https://github.com/carrismetropolitana/schedules-api)

get routes