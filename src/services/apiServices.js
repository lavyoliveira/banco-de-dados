const urlApi = 'http://localhost:3333/';

export const apiServices = {
    get: (route) => fetch(urlApi + route, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
        .then(response => response.json())
        .catch(error => console.log(error)),
    
    post: (route, body) => fetch(urlApi + route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .catch(error => console.log(error)),
}
