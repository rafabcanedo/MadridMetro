import axios from "axios";

const api = axios.create({
 baseURL: "https://openapi.emtmadrid.es/v1",
 headers: {
  'Content-Type': 'application/json',
 },
})

export const getLines = async () => {
 const response = await fetch("https://openapi.emtmadrid.es/v1/transport/busemtmad/stops/list/");
 const result = await response.json();
 return result;
}

export { api }