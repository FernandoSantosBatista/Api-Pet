<template>
  <div class="container-fluid">
    <div class="col-lg-4 offset-lg-4">
      <div class="container">
      <div class="">
          <h1 class="titulo">{{ registrationMode ? "Adicionar" : "Editar" }} Pet</h1>
      </div>
      <div class="">
        <p> Quem você deseja adotar ? </p>
      </div>
    </div>

      <div class="col-sm-10">
          <div class="form-group">
            <label class="form-label" for="name">Nome do Pet</label>
            <input id="description" v-model="adopter.description" type="text" class="form-control" />
          </div>
      </div>
      <div class="col-sm-10">
        <div class="form-group">
          <label class="form-label" for="name">O seu nome</label>
          <input  id="name" v-model="adopter.name" type="text" class="form-control" />
        </div>
      </div>
 
      <div class="col-sm-10">
        <div class="form-group">
          <label class="form-label" for="name">Email</label>
          <input id="email" v-model="adopter.email" type="email" class="form-control" />
        </div>
      </div>

     <div class="col-sm-10">
        <div class="form-group">
          <label class="form-label" for="name">Telefone para contato</label>
          <input id="telefone" v-model="adopter.telephone" type="nunber" class="form-control" />
        </div>
      </div>

      <div class="row">
      <div class="col-sm-10">
        <hr />
      </div>

      <div class="col-sm-10">
        <button  @click="cancelAction" class="btn btn-default float-end" type="button">
          Cancelar
        </button>
        <button @click="save" class="btn btn-primary float-end" type="button">
          Enviar
        </button>
        </div>
      </div>
   </div>
   </div>
  
</template>

<script>

import Adopter from '../models/Adopter';
import adopterService from '../services/adopter-service';

export default {
    name:"AdopterForm",
    data(){
        return {

            adopter: new Adopter(),
            registrationMode: true,
        }
    },
    mounted(){
        let id = this.$route.params.id;
        if(!id) return;

        this.registrationMode = false;
        this.getProductById(id);
    },
    methods:{
        getProductById(id){
            adopterService.getById(id)
            .then(response => {
                this.adopter = new Adopter(response.data);
            })
            .catch(error =>{
                console.log(error)
                this.$swal({
                  icon: 'error',
                  title: 'Não foi possível obter o produto pelo id ' + id,
                  confirmButtonColor: '#0039A8',
                  animate: true
                });
            })
        },

        cancelAction(){
            this.adopter = new Adopter();
            this.$router.push({name: "Dashboard"})
        },
        registerAdopter(){
            if(!this.adopter.modelValidForRegistration()){
                this.$swal({
                  icon: 'warning',
                  title: 'O nome do adotante é obrigatório para o cadastro.',
                  confirmButtonColor: '#0039A8',
                  animate: true
                });
                return;
            }

            adopterService.register(this.adopter)
            .then(() => {
                this.$swal({
                  icon: 'success',
                  title: 'Aguarde entraremos em contato com você!',
                  confirmButtonColor: '#0039A8',
                  animate: true
                });

                this.adopter = new Adopter();
                    this.$router.push({name: "Dashboard"})
            })
            .catch(error =>{
                console.log(error);
                this.$swal({
                  icon: 'error',
                  title: 'Não foi possível cadastrar o produto',
                  confirmButtonColor: '#0039A8',
                  animate: true
                });
            });
        },

        updateAdopter(){
            if(!this.adopter.modelValidToUpdate()){
                this.$swal({
                  icon: 'warning',
                  title: 'O código e nome do adotante são obrigatórios para o cadastro.',
                  confirmButtonColor: '#0039A8',
                  animate: true
                });
                return;
            }
            
            

            adopterService.update(this.adopter)
            .then(() =>{
                this.$swal({
                  icon: 'success',
                  title: 'Adotante atualizado com sucesso!',
                  confirmButtonColor: '#0039A8',
                  animate: true
                });
                this.$router.push({name: "Dashboard"});
            })
            .catch(error => {
                console.log(error);
                this.$swal({
                  icon: 'error',
                  title: 'Não foi possível atualizar o adotante',
                  confirmButtonColor: '#0039A8',
                  animate: true
                });
            });
        },

        save(){
            (this.registrationMode) ? this.registerAdopter() : this.updateAdopter();
        },
    }    
};
</script>

<style scoped>
.container-fluid{
    margin-top: 50px;
}



</style>