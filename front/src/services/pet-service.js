import api from './api';

function obterTodos(){
    return new Promise((resolve, reject) => {
        return api.get('/dogs')
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function obterPorId(id){
    return new Promise((resolve, reject) => {
        return api.get(`/dogs/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function cadastrar(produto){
    return new Promise((resolve, reject) => {
        return api.post(`/dogs`, produto)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function atualizar(produto){
    return new Promise((resolve, reject) => {
        return api.put(`/dogs/${produto.id}`, produto)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function deletar(id){
    return new Promise((resolve, reject) => {
        return api.delete(`/dogs/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}


export default {
    obterTodos,
    obterPorId,
    cadastrar,
    atualizar,
    deletar
}