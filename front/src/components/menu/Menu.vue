<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand text-white" href="#">PET</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link to="/" class="nav-item text-white nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/gerenciamento-de-pets" class="nav-item text-white nav-link">Pets</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/gerenciamento-de-usuarios" class="nav-item text-white  nav-link">Usuarios</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/gerenciamento-de-adotantes" class="nav-item text-white nav-link">Adotantes</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
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
<style  scoped >
.navbar {
    background: linear-gradient(to right, #0039A8, #296CDB);
}


</style>