<template>
    <ul class="menu">
        <li>
            <a @click="() => this.$router.push({path:'/'})">Dashboard</a>
        </li>
        <li>
            <a @click="() => this.$router.push({path:'/gerenciamento-de-pets'})">Pets</a>
        </li>
        <li>
            <a @click="() => this.$router.push({path:'/gerenciamento-de-usuarios'})">Usuario</a>
        </li>
        <li>
            <a @click="logout"> Sair</a>
        </li>
    </ul>
</template>

<script>
import usuarioService from '../../services/user-service';
import utilsStorage from '../../utils/storage';

export default {
    name:"Menu",
    data(){
        return{

        }
    },
    methods:{
        logout(){
            usuarioService.logout()
            .then(() =>  {
                utilsStorage.removerUsuarioNaStorage();
                utilsStorage.removerTokenNaStorage();

                this.$router.push({path:'/login'});
            })
            .catch(error => {
                console.log(error);
            })            
        }
    }
}
</script>
<style scoped>

    ul{
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background: linear-gradient(to right, #0039A8, #296CDB);
    }

    li {
        float: left;
    }

    li:first-child{
        margin-left: 40px;
    }

    li:last-child{
        float: right;
        margin-right: 10px;
    }

    ul.menu li a {
        display: block;
        color: #FFF;
        padding: 15px 17px;
        text-decoration: none;
        text-align: center;
        cursor: pointer;
    }

    li a:hover{
        color: #fff;
        background-color: rgba(0, 0, 0, 0.2);
    }

</style>