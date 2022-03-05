<template>
<div class="box-register">

        <div class="logo">
            <h1>Cadastrar</h1>
        </div>

        <Input
          label="Nome"
          placeHolder=""
          v-model="user.name"
        ></Input>
        
         <Input
          label="E-mail"
          placeHolder="exemplo@exemplo.com"
          v-model="user.email"
        ></Input>

         <Input
          label="Senha"
          placeHolder="******"
          type="password"
          v-model="user.password"
        ></Input>
       

        <button  @click="cancelAction" class="btn btn-default float-right" type="button">
          Cancelar
        </button>
        <button @click="save" class="btn btn-primary float-right mr-2" type="button">
          Salvar
        </button>
        </div>
    
  
</template>

<script>
import Input from '../components/input/Input.vue';
import User from '../models/User';
import UserService from '../services/user-service';

export default {
    name:"UserForm",
    components:{
    Input,
    
  },
    data(){
        return {

            user: new User(),
            registrationMode: true,
            continueAdding: false,
        }
    },
    mounted(){
        let id = this.$route.params.id;
        if(!id) return;

        this.registrationMode = false;
        this.getProductById(id);
    },
    methods:{
        cancelAction(){
            this.user = new User();
            this.$router.push({name: "Dashboard"})
        },
        registerUser(){
            if(!this.user.modelValidForRegistration()){
                this.$swal({
                  icon: 'warning',
                  title: 'O nome do usuario é obrigatório para o cadastro.',
                  confirmButtonColor: '#0039A8',
                  animate: true
                });
                return;
            }

            UserService.register(this.user)
            .then(() => {
                this.$swal({
                  icon: 'success',
                  title: 'Usuario cadastrado com sucesso!',
                  confirmButtonColor: '#0039A8',
                  animate: true
                });

                this.user = new User();

                if(!this.continueAdding){
                    this.$router.push({name: "Dashboard"})
                }
            })
            .catch(error =>{
                console.log(error);
                this.$swal({
                  icon: 'error',
                  title: 'Não foi possível cadastrar o Usuario',
                  confirmButtonColor: '#0039A8',
                  animate: true
                });
            });
        },

        save(){
             this.registerUser() 
        },
    }    
};
</script>

<style scoped>
  .box-register {
    width: 400px;
    margin: auto;
    border: 1px solid #ddd;
    margin-top: 70px;
    padding: 50px;
  }

  .logo {
    text-align: center;
    color: var(--cor-primaria);
    
  }
</style>