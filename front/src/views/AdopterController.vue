<template>
  <div class="container">
    <div class="row">
      <div class="title col-sm-10">
        <h2 class="title">Adotantes</h2>
        <hr />
      </div>
    </div>

    <div class="subcontainer row sub-cointainer">
      <div class="col-sm-2">
        <Button :callback="addAdopter" value="Adicionar"></Button>
      </div>
      <div class="col-sm-8">
        <a @click="seeAdopInCards" class="float-end ver-em-cards"> Home </a>
      </div>
    </div>

    <div class="row">
      <div class="table-responsive col-sm-11">
        <table class="table table-hover table-borderless ">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Pet</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in adopters" :key="item.id">
              
              <td>{{item.name}}</td>
              <td>{{item.email}}</td>
              <td>{{item.telephone }}</td>
              <td>{{item.description}}</td>
              <td>
                <i
                  @click="editAdopters(item)"
                  class="fas fa-pencil-alt edit"
                ></i>
                <i
                  @click="removeAdopters(item)"
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
import AdopterMixin from '../mixins/adopter-mixin';

export default {
  name: "AdopterController",
  mixins:[AdopterMixin],
  components: {
    Button,
  },

  data() {
    return {
    };
  },

  methods: {
    seeAdopInCards(){
      this.$router.push({ name: "Dashboard" });
    },

    addAdopter() {
      this.$router.push({ name: "NewAdopter" });
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
