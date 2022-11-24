const urlApi = 'http://localhost:3333/';

export const apiServices = {
    get: (route) => fetch(`${urlApi}${route}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.log(error))
}
