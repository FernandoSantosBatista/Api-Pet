<template>

  <div class="container col-sm-5 ">
    <div class="row " >
      <div class="col-sm-10">
        <h1 class="titulo">{{ registrationMode ? "Adicionar" : "Editar" }} Pet</h1>
        <hr />
      </div>
    </div>

    <div class="row">
      <div class="col-sm-5">
        <div class="form-group">
          <label class="form-label" for="id">Código</label>
          <input id="id" v-model="pet.id" type="text" disabled class="form-control" />
        </div>
      </div>

      <div class="col-sm-5">
        <div class="form-group">
          <label class="form-label" for="name">Nome</label>
          <input id="name" v-model="pet.name" type="text" class="form-control" />
        </div>
      </div>
 
      <div class="col-sm-5">
        <div class="form-group">
          <label class="form-label" for="species">Especies</label>
          <select v-model="pet.species" id="size" class="form-control">
              <option selected>Cachorro</option>
              <option>Gato</option>
            </select>
        </div>
      </div>

     <div class="col-sm-5">
        <div class="form-group">
          <label class="form-label" for="sex">Sexo</label>
          <select v-model="pet.sex" id="size" class="form-control">
              <option selected>Masculino</option>
              <option>Feminino</option>
            </select>
        </div>
      </div>

      <div class="col-sm-5">
        <div class="form-group">
          <label class="form-label" for="age">Idade</label>
          <select v-model="pet.age" id="size" class="form-control">
              <option selected>Adulto</option>
              <option>Filhote</option>
            </select>
        </div>
      </div>
      
      <div class="col-sm-5">
        <div class="form-group">
          <label class="form-label" for="size">Tamanho</label>
            <select v-model="pet.size" id="size" class="form-control">
              <option selected>Grande</option>
              <option>Médio</option>
              <option>Pequeno</option>
            </select>
        </div>
      </div>
    
      <div class="col-sm-10">
        <div class="form-group">
          <label class="fas fa-cloud-upload-alt" for="image">Upload</label>
          <input type="file" @change="onFileChange" class="form-control" />
        </div>
      </div>

      <div class="col-sm-8">
        <div class="form-group">
          <label for="image"></label>
          <img :src="pet.logo" class="img-responsive" height="100" width="100"/>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <hr />
      </div>

      <div class="col-sm-10">
        <div v-show="registrationMode" class="form-check-inline">
          <label class="form-check-label">
            <input v-model="continueAdding"  type="checkbox" class="form-check-input"  />
            Continuar adicionando
          </label>
        </div>

        <button  @click="cancelAction" class="btn btn-default float-right" type="button">
          Cancelar
        </button>
        <button @click="save" class="btn btn-primary float-right mr-2" type="button">
          Salvar
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import Pet from '../models/Pet';
import petService from '../services/pet-service';

export default {
    name:"PetForm",
    data(){
        return {

            pet: new Pet(),
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
        getProductById(id){
            petService.getById(id)
            .then(response => {
                this.pet = new Pet(response.data);
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
            this.pet = new Pet();
            this.$router.push({name: "PetController"})
        },
        registerPet(){
            if(!this.pet.modelValidForRegistration()){
                this.$swal({
                  icon: 'warning',
                  title: 'O nome do produto é obrigatório para o cadastro.',
                  confirmButtonColor: '#0039A8',
                  animate: true
                });
                return;
            }

            petService.register(this.pet)
            .then(() => {
                this.$swal({
                  icon: 'success',
                  title: 'Pet cadastrado com sucesso!',
                  confirmButtonColor: '#0039A8',
                  animate: true
                });

                this.pet = new Pet();

                if(!this.continueAdding){
                    this.$router.push({name: "PetController"})
                }
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

        updatePet(){
            if(!this.pet.modelValidToUpdate()){
                this.$swal({
                  icon: 'warning',
                  title: 'O código e nome do pet são obrigatórios para o cadastro.',
                  confirmButtonColor: '#0039A8',
                  animate: true
                });
                return;
            }
            
            

            petService.update(this.pet)
            .then(() =>{
                this.$swal({
                  icon: 'success',
                  title: 'Pet atualizado com sucesso!',
                  confirmButtonColor: '#0039A8',
                  animate: true
                });
                this.$router.push({name: "PetController"});
            })
            .catch(error => {
                console.log(error);
                this.$swal({
                  icon: 'error',
                  title: 'Não foi possível atualizar o pet',
                  confirmButtonColor: '#0039A8',
                  animate: true
                });
            });
        },

        save(){
            (this.registrationMode) ? this.registerPet() : this.updatePet();
        },

        onFileChange(e){
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = (e) => {

              
                this.pet.logo = e.target.result;

            }
            reader.readAsDataURL(file);
        }
    }    
};
</script>

<style scoped>
.container{
    padding: 40px;

}

</style>