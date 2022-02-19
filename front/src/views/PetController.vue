<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h2 class="titulo">Produtos</h2>
        <hr />
      </div>
    </div>

    <div class="row sub-cointainer">
      <div class="col-sm-2">
        <Button :callback="adicionarProduto" value="Adicionar"></Button>
      </div>
      <div class="col-sm-10">
        <a @click="verProdutosEmCards" class="float-right ver-em-cards"> Ver em cards</a>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Espécie</th>
              <th>Sexo</th>
              <th>Idade</th>
              <th>Tamanho</th>
              <th>Logo</th>
              <th>Ações</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in pets" :key="item.id">
              <td>{{item.name}}</td>
              <td>{{item.species}}</td>
              <td>{{item.sex }}</td>
              <td>{{item.age}}</td>
              <td>{{item.size}}</td>
              <td >
                <img
            class="img-responsive" :src="item.logo" alt="" height="60" width="60">

            </td>
              <td>
                <i
                  @click="editarProduto(item)"
                  class="fas fa-pencil-alt icones-tabela"
                ></i>
                <i
                  @click="excluirProduto(item)"
                  class="fas fa-trash-alt icones-tabela"
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
import ProdutoMixin from '../mixins/produto-mixin';

export default {
  name: "PetController",
  mixins:[ProdutoMixin],
  components: {
    Button,
  },

  data() {
    return {
    };
  },

  methods: {
    verProdutosEmCards(){
      this.$router.push({ name: "ListaProdutoCards" });
    },

    adicionarProduto() {
      this.$router.push({ name: "NovoProduto" });
    }
  },
};
</script>
<style scoped>

.icones-tabela,
.ver-em-cards {
  margin: 5px;
  cursor: pointer;
  color: var(--cor-primaria);
}

.ver-em-cards {
  margin-top: 25px;
}
</style>
