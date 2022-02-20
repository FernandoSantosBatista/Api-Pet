import api from './api';

function getAll(){
    return new Promise((resolve, reject) => {
        return api.get('/dogs')
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function getById(id){
    return new Promise((resolve, reject) => {
        return api.get(`/dogs/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function register(pet){
    return new Promise((resolve, reject) => {
        return api.post(`/dogs`, pet)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function update(pet){
    return new Promise((resolve, reject) => {
        return api.put(`/dogs/${pet.id}`, pet)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function remove(id){
    return new Promise((resolve, reject) => {
        return api.delete(`/dogs/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}


export default {
    getAll,
    getById,
    register,
    update,
    remove
}