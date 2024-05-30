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

export const fetchTest = () => {
 const url = "https://openapi.emtmadrid.es/v1/hello/";
 const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  },
 };

 fetch(url, options)
 .then((response) => response.json())
 .then((json) => console.log(json))
 .catch((error) => console.log("error:" + error))
}

export { api }