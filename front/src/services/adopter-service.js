import api from './api';

function getAll(){
    return new Promise((resolve, reject) => {
        return api.get('/adopters')
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function getById(id){
    return new Promise((resolve, reject) => {
        return api.get(`/adopters/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function register(adopter){
    return new Promise((resolve, reject) => {
        return api.post(`/adopters`, adopter)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function update(adopter){
    return new Promise((resolve, reject) => {
        return api.put(`/adopters/${adopter.id}`, adopter)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function remove(id){
    return new Promise((resolve, reject) => {
        return api.delete(`/adopters/${id}`)
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