const METRO = [
 {
  title: "estacao",
  data: [
   {
    id: "1",
    title: "Azul",
    number: 1,
    description: "Linha azul do metro, conhecida por ter o memorável Santiago Bernabéu...",
    linhas: [
     "Hospital Infanta Sofia",
     "Santiago Bernabéu",
     "Manuel de Falla",
     "Cuzco",
     "Plaza de Castilla",
     "Las Tablass",
     "Tres Olivos",
     "Lago",
     "Principe Pio",
     "Puerta del Sur",
    ],
   },
   {
    id: "2",
    title: "Vermelho",
    number: 2,
    description: "Linha vermelha do metro, conhecida por cruzar a estacao Goya...",
    linhas: [
     "Goya",
     "Sol",
     "Opera",
     "Sevilla",
     "San Bernardo",
     "Quevedo",
     "Canal",
     "Santo Domingo",
     "Banco de Espana",
     "Cuarto Caminos",
    ],
   },
   {
    id: "3",
    title: "Amarelo",
    number: 3,
    description: "Linha amarela do metro, conhecida por cruzar a praca de Espana...",
    linhas: [
     "Sol",
     "Arguelles",
     "Callao",
     "Delicias",
     "Plaza de Espana",
     "Villaverde",
     "Almendrales",
     "San Cristobal",
     "Ventura Rodriguez",
     "Palos de la Frontera",
    ]
   },
   {
    id: "4",
    title: "Laranja",
    number: 4,
    description: "Linha laranja do metro, conhecida por ser o metro Este...",
    linhas: [
     "Hispital del Hernares",
     "Ascao",
     "Estadio Metropolitano",
     "Pitis",
     "Canal",
     "Pueblo Nuevo",
     "Lacoma",
     "Cartagena",
     "Las Musas",
     "San Blas",
    ]
   },
   {
    id: "5",
    title: "Marrom",
    number: 5,
    description: "Linha marrom do metro, comecando na estacao Argüelles...",
    linhas: [
     "Arguelles",
     "Goya",
     "Canillas",
     "Manoteras",
     "Avenida de la Paz",
     "Diego de Leon",
     "Lista",
     "Serrano",
     "Alfonso XIII",
     "San Lorenzo",
    ]
   },
   {
    id: "6",
    title: "verde",
    number: 6,
    description: "Linha verde do metro, conhecida por cruzar a Gran Via...",
    linhas: [
     "Opera",
     "Ventas",
     "Oporto",
     "Vista Alegre",
     "El Carmen",
     "Diego de Leon",
     "Canillejas",
     "El Capricho",
     "Alemeda de Osuna",
     "casa de Campo",
    ]
   },
   {
    id: "7",
    title: "Azul Claro",
    number: 7,
    description: "Linha azul claro do metro, conhecida por cruzar a estacao Bilbao...",
    linhas: [
     "Opera",
     "Atocha",
     "La Gavia",
     "Bilbao",
     "Sol",
     "Tribunal",
     "bambu",
     "Congosto",
     "Las Suertes",
     "Valdecarros",
    ]
   },
   {
    id: "8",
    title: "Roxo",
    number: 8,
    description: "Linha roxa do metro, conhecida por cruzar o aeropuerto...",
    linhas: [
     "Paco de Lucia",
     "Pio XII",
     "Artilleros",
     "San Cipriano",
     "Pavones",
     "Ibiza",
     "Cruz del Rayo",
     "Estrella",
     "Colombia",
     "Concha Espina",
    ]
   },
  ]
 },
]

const ESTACOES = METRO.map((item) => item.data).flat()

const CATEGORIES = METRO.map((item) => item.title)

type StationProps = (typeof ESTACOES)[0]

export { METRO, ESTACOES, CATEGORIES, StationProps}