const METRO = [
 {
  title: "Stations",
  data: [
   {
    id: "1",
    title: "Blue",
    number: 1,
    description: "Linha azul do metro, conhecida por ter o memorável Santiago Bernabéu...",
    stations: [
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
    title: "Red",
    number: 2,
    description: "Linha vermelha do metro, conhecida por cruzar a estacao Goya...",
    stations: [
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
    title: "Yellow",
    number: 3,
    description: "Linha amarela do metro, conhecida por cruzar a praca de Espana...",
    stations: [
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
    title: "Orange",
    number: 4,
    description: "Linha laranja do metro, conhecida por ser o metro Este...",
    stations: [
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
    title: "Brown",
    number: 5,
    description: "Linha marrom do metro, comecando na estacao Argüelles...",
    stations: [
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
    title: "Green",
    number: 6,
    description: "Linha verde do metro, conhecida por cruzar a Gran Via...",
    stations: [
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
    title: "Light Blue",
    number: 7,
    description: "Linha azul claro do metro, conhecida por cruzar a estacao Bilbao...",
    stations: [
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
    title: "Purple",
    number: 8,
    description: "Linha roxa do metro, conhecida por cruzar o aeropuerto...",
    stations: [
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

const STATIONS = METRO.map((item) => item.data).flat()

const CATEGORIES = METRO.map((item) => item.title)

type StationProps = (typeof STATIONS)[0]

export { METRO, STATIONS, CATEGORIES, StationProps}