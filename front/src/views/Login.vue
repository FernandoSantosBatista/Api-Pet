<template>
    <div class="box-login">

        <div class="logo">
            <h1>Login</h1>
        </div>

        <Input
          label="E-mail"
          placeHolder="exemplo@exemplo.com"
          v-model="usuario.email" 
        ></Input>
        
        <Input
          label="Senha"
          type="password"
          placeHolder="******"
          v-model="usuario.password"
        ></Input>

        <Button value="Entrar" :callback="login"></Button>
        
    </div>
</template>
<script>
import Input from '../components/input/Input.vue';
import Button from '../components/button/Button.vue';
import Usuario from '../models/User';
import usuarioService from '../services/user-service';
import utilsStorage from '../utils/storage';

export default {
  name:"Login",
  components:{
    Input,
    Button
  },
  data(){
    return {
      usuario: new Usuario()
    }
  },
  methods:{
    recebendoValor(valor){
      alert(valor);
    },
    login(){

      if(!this.usuario.modeloValidoLogin()){
        this.$swal({
            icon: "warning",
            title: "Email e senha são obrigatórios.",
            confirmButtonColor: "#0039A8",
            animate: true
          })
        return;
      }

      usuarioService
      .login(this.usuario.email, this.usuario.password)
      .then(response => {
        this.usuario = new Usuario(response.data.usuario);

        utilsStorage.salvarUsuarioNaStorage(this.usuario);
        utilsStorage.salvarTokenNaStorage(response.data.token);
        
        this.$router.push({name: "PetController"});
      })
      .catch(error => {
        console.log(error);
      })
    }
  }
}
</script>

<style >


  .box-login {
    width: 300px;
    margin: auto;
    border: 1px solid #ddd;
    margin-top: 70px;
    padding: 30px;
  }

  .logo {
    text-align: center;
    color: var(--cor-primaria);
    
  }
</style>
