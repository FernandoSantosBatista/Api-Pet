<template>
<div class="container">
  <div class="row">
      <div class="title col-sm-12">
        <h1 class="titulo">Amigo não se compra</h1>
        <hr />
        <p>A adoção é um ato de amor e responsabilidade. Para adotar, 
          basta se comprometer com um bichinho que dependerá sempre de você,
           cuidar dele, dar afeto e um lar seguro.
           <br> O amor é uma obrigação para adotar um coração.
        </p>
        <hr />
      </div>
  </div>
  <div class="row row-cols-1 row-cols-md-4 g-4" >
    <div class="col" v-for="item in pets" :key="item.id">
      <div class="card" >
        <img class="card-img-top" :src="item.logo" alt="" height="200" width="200">  
        <div class="card-body">
          <h5 class="card-title">{{item.name}}</h5>
          <p class="text">{{item.species}} | {{item.sex}} | {{item.age}} | Porte: {{item.size}}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>

 //<img class="img-responsive" :src="item.logo" alt="" height="60" width="60">
         // {{item.name}} | {{item.species}} | {{item.sex}} | {{item.size}} | {{item.age}}


import PetMixin from '../mixins/pet-mixin';

export default {
  name: "Dashboard",
  mixins:[PetMixin],
  components: {
  },

  data() {
    return {
    };
  },


};
</script>
<style >
  .title {
    margin-top: 40px;
    margin-bottom: 40px;
}
  p{
    font-size: 15px;
  }

</style>
