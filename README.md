Based on starter template for [Learn Next.js](https://nextjs.org/learn).

# Passos

1. para lançar: `npm run dev`


# API cmescola
usa api `https://cmescola.pythonanywhere.com/` com os seguintes endpoints:
* `https://cmescola.pythonanywhere.com/municipios`
    * exemplo: `{"municipios": [{"id": 4, "nome": "Alcochete"}, {"id": 1, "nome": "Almada"}, {"id": 13, "nome": "Amadora"}, {"id": 14, "nome": "Cascais"}, {"id": 15, "nome": "Lisboa"}, {"id": 9, "nome": "Loures"}, {"id": 11, "nome": "Mafra"}, {"id": 5, "nome": "Moita"}, {"id": 6, "nome": "Montijo"}, {"id": 10, "nome": "Odivelas"}, {"id": 16, "nome": "Oeiras"}, {"id": 7, "nome": "Palmela"}, {"id": 2, "nome": "Seixal"}, {"id": 3, "nome": "Sesimbra"}, {"id": 8, "nome": "Set\u00fabal"}, {"id": 17, "nome": "Sintra"}, {"id": 12, "nome": "Vila Franca de Xira"}]}`
* `https://cmescola.pythonanywhere.com/escolas/<municipio_id>`
    * exemplo: `{"escolas": [{"id": 1, "nome": "EB1 Almada", "municipio_id": 1, "morada": "Rua da Escola, 1, Almada"}, {"id": 2, "nome": "EB2 Almada", "municipio_id": 1, "morada": "Rua da Escola, 2, Almada"}, {"id": 3, "nome": "EB3 Almada", "municipio_id": 1, "morada": "Rua da Escola, 3, Almada"}, {"id": 4, "nome": "EB4 Almada", "municipio_id": 1, "morada": "Rua da Escola, 4, Almada"}, {"id": 5, "nome": "EB5 Almada", "municipio_id": 1, "morada": "Rua da Escola, 5, Almada"}, {"id": 6, "nome": "EB5 Almada", "municipio_id": 1, "morada": "Rua da Escola, 5, Almada"}]}`
* `https://cmescola.pythonanywhere.com/escola/<escola_id>`
    : exemplo: `{"escola": {"id": 1, "nome": "EB1 Almada", "municipio_id": 1, "morada": "Rua da Escola, 1, Almada"}}`