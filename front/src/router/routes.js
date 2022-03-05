import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import UserForm from '@/views/UserForm.vue'
import PetController from '@/views/PetController.vue'
import AdopterController from '@/views/AdopterController.vue'
import Pet from '@/views/PetForm.vue'
import Adopter from '@/views/AdopterForm.vue'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        title: 'Login',
        meta: { requiredAuth: false }
    },
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        title: 'Dashboard',
        meta: { requiredAuth: true }
    },
    {
        path: '/gerenciamento-de-usuarios',
        name: 'UserForm',
        component: UserForm,
        title: 'Usuarios',
        meta: { requiredAuth: true }
    },
    {
        path: '/gerenciamento-de-pets',
        name: 'PetController',
        component: PetController,
        title: 'Pets',
        meta: { requiredAuth: true }
    },
    {
        path: '/gerenciamento-de-pets/novo',
        name: 'NewPet',
        component: Pet,
        title: 'Adicionar Pet',
        meta: { requiredAuth: true }
    },
    {
        path: '/gerenciamento-de-pets/editar',
        name: 'EditPet',
        component: Pet,
        title: 'Editar pet',
        meta: { requiredAuth: true }
    },

    {
        path: '/gerenciamento-de-adotantes',
        name: 'AdopterController',
        component: AdopterController,
        title: 'Adopters',
        meta: { requiredAuth: true }
    },
    {
        path: '/gerenciamento-de-adotantes/novo',
        name: 'NewAdopter',
        component: Adopter,
        title: 'Adicionar Pet',
        meta: { requiredAuth: true }
    },
    {
        path: '/gerenciamento-de-adotantes/editar',
        name: 'EditAdopter',
        component: Adopter,
        title: 'Editar adopter',
        meta: { requiredAuth: true }
    },
];


export default routes;