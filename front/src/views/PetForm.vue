<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h1 class="titulo">{{ modoCadastro ? "Adicionar" : "Editar" }} Pet</h1>
        <hr />
      </div>
    </div>

    <div class="row">
      <div class="col-sm-2">
        <div class="form-group">
          <label for="id">Código</label>
          <input id="id" v-model="pet.id" type="text" disabled class="form-control" />
        </div>
      </div>

      <div class="col-sm-10">
        <div class="form-group">
          <label for="name">Nome</label>
          <input id="name" v-model="pet.name" type="text" class="form-control" />
        </div>
      </div>
 
      <div class="col-sm-3">
        <div class="form-group">
          <label for="species">Especies</label>
          <input id="species" v-model="pet.species" type="text" class="form-control" />
        </div>
      </div>
     <div class="col-sm-3">
        <div class="form-group">
          <label for="sex">Sexo</label>
          <input id="sex" v-model="pet.sex" type="text" class="form-control" />
        </div>
      </div>
      <div class="col-sm-3">
        <div class="form-group">
          <label for="age">Idade</label>
          <input id="age" v-model="pet.age" type="text" class="form-control" />
        </div>
      </div>
      <div class="col-sm-12">
        <div class="form-group">
          <label for="observacao">Tamanho</label>
            <input id="age" v-model="pet.size" type="text" class="form-control" />
        </div>
      </div>
    
      <div class="col-sm-12">
        <div class="form-group">
          <label for="observacao">Upload</label>
          <input type="file" @change="onFileChange" class="form-control" />
        </div>
      </div>

      <div class="col-sm-12">
        <div class="form-group">
          <label for="observacao"></label>
          <img :src="pet.logo" class="img-responsive" height="100" width="100"/>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <hr />
      </div>

      <div class="col-sm-12">
        <div v-show="modoCadastro" class="form-check-inline">
          <label class="form-check-label">
            <input v-model="continuarAdicionando"  type="checkbox" class="form-check-input"  />
            Continuar adicionando
          </label>
        </div>

        <button  @click="cancelarAcao" class="btn btn-default float-right" type="button">
          Cancelar
        </button>
        <button @click="salvarProduto" class="btn btn-primary float-right mr-2" type="button">
          Salvar
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import Pet from '../models/Pet';
import petService from '../services/pet-service';
import conversorDeData from "../utils/conversor-data";

export default {
    name:"PetForm",
    data(){
        return {

            pet: new Pet(),
            modoCadastro: true,
            continuarAdicionando: false,
        }
    },
    mounted(){
        let id = this.$route.params.id;
        if(!id) return;

        this.modoCadastro = false;
        this.obterProdutoPorId(id);
    },
    methods:{
        obterProdutoPorId(id){
            petService.obterPorId(id)
            .then(response => {
                this.pet = new Pet(response.data);
            })
            .catch(error =>{
                console.log(error)
                this.$swal({
                  icon: 'error',
                  title: 'Não foi possível obter o produto pelo id ' + id,
                  confirmButtonColor: '#FF3D00',
                  animate: true
                });
            })
        },

        cancelarAcao(){
            this.pet = new Pet();
            this.$router.push({name: "ControleDeProdutos"})
        },
        codastrarProduto(){
            if(!this.pet.modeloValidoParaCadastro()){
                this.$swal({
                  icon: 'warning',
                  title: 'O nome do produto é obrigatório para o cadastro.',
                  confirmButtonColor: '#FF3D00',
                  animate: true
                });
                return;
            }

            this.pet.dataCadastro = 
                conversorDeData.aplicarMascaraISOEmFormatoAmericano(this.pet.dataCadastro);
        
            petService.cadastrar(this.pet)
            .then(() => {
                this.$swal({
                  icon: 'success',
                  title: 'Produto cadastrado com sucesso!',
                  confirmButtonColor: '#FF3D00',
                  animate: true
                });

                this.pet = new Pet();

                if(!this.continuarAdicionando){
                    this.$router.push({name: "ControleDeProdutos"})
                }
            })
            .catch(error =>{
                console.log(error);
                this.$swal({
                  icon: 'error',
                  title: 'Não foi possível cadastrar o produto',
                  confirmButtonColor: '#FF3D00',
                  animate: true
                });
            });
        },

        atualizarProduto(){
            if(!this.pet.modeloValidoParaAtualizar()){
                this.$swal({
                  icon: 'warning',
                  title: 'O código e nome do pet são obrigatórios para o cadastro.',
                  confirmButtonColor: '#FF3D00',
                  animate: true
                });
                return;
            }
            
            this.pet.dataCadastro = 
                conversorDeData.aplicarMascaraISOEmFormatoAmericano(this.pet.dataCadastro);

            petService.atualizar(this.pet)
            .then(() =>{
                this.$swal({
                  icon: 'success',
                  title: 'Produto atualizado com sucesso!',
                  confirmButtonColor: '#FF3D00',
                  animate: true
                });
                this.$router.push({name: "ControleDeProdutos"});
            })
            .catch(error => {
                console.log(error);
                this.$swal({
                  icon: 'error',
                  title: 'Não foi possível atualizar o produto',
                  confirmButtonColor: '#FF3D00',
                  animate: true
                });
            });
        },

        salvarProduto(){
            (this.modoCadastro) ? this.codastrarProduto() : this.atualizarProduto();
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
textarea {
  resize: none;
}
</style>