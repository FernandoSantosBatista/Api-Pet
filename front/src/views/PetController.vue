<template>
  <div class="container">
    <div class="row">
      <div class="title col-sm-10">
        <h2 class="title00">Pets</h2>
        <hr />
      </div>
    </div>

    <div class="subcontainer row sub-cointainer">
      <div class="col-sm-2">
        <Button :callback="addPet" value="Adicionar"></Button>
      </div>
      <div class="col-sm-8">
        <a @click="seePetsInCards" class="float-end ver-em-cards"> Home </a>
      </div>
    </div>

    <div class="row">
      <div class="table-responsive col-sm-11">
        <table class="table table-hover table-borderless ">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Nome</th>
              <th>Espécie</th>
              <th>Sexo</th>
              <th>Idade</th>
              <th>Tamanho</th>
              <th>Ações</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in pets" :key="item.id">
              <td >
                <img class="img-responsive rounded-pill" :src="item.logo" alt="" height="40" width="60">
              </td>
              <td>{{item.name}}</td>
              <td>{{item.species}}</td>
              <td>{{item.sex }}</td>
              <td>{{item.age}}</td>
              <td>{{item.size}}</td>
              
              <td>
                <i
                  @click="editPets(item)"
                  class="fas fa-pencil-alt edit"
                ></i>
                <i
                  @click="removePet(item)"
                  class="fas fa-trash-alt remove"
                ></i>
              </td>
              </tr>
            </tbody>
          </table>
      </div>
    </div>

  </div>
</template>
<script>
import Button from "../components/button/Button.vue";
import PetMixin from '../mixins/pet-mixin';

export default {
  name: "PetController",
  mixins:[PetMixin],
  components: {
    Button,
  },

  data() {
    return {
    };
  },

  methods: {
    seePetsInCards(){
      this.$router.push({ name: "Dashboard" });
    },

    addPet() {
      this.$router.push({ name: "NewPet" });
    }
  },
};
</script>
<style scoped>
.edit {
  color: #090753;
  cursor: pointer;
  margin: 5px;
}
.remove {
  color: #FF0000;
  cursor: pointer;
  margin: 5px;
}
.ver-em-cards {
 
  cursor: pointer;
  color: var(--cor-primaria);
  
}

.title{
  padding: 5px;
  color: #212F36;
}

.table{
  margin-top: 20px;
}


</style>
