import axios from 'axios';
const APIToken = 'Tpk_0978211ac1244fb680abf5c2e0b3ec21';
const url = "https://sandbox.iexapis.com/stable";

export async function importCompanies(params, limit) {
    return axios.get(url + params, {
        params: {
            token: APIToken,
            listLimit: limit ? limit : 10
        }
      })
    .then(response => response)
    .then(data => data)
    .catch(error => console.log(error));
};