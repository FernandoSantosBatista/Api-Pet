import api from './api';
function login(email, password){
    return new Promise((resolve, reject) => {
        return api.post(`/login`, { email, password } )
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function register(pet){
    return new Promise((resolve, reject) => {
        return api.post(`/users`, pet)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function logout(){
    return new Promise((resolve, reject) => {
        return api.delete(`/logout`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}


function getById(id){
    return new Promise((resolve, reject) => {
        return api.get(`/users/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

export default {
    login,
    logout,
    getById,
    register
}