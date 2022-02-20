import produtoService from "@/services/pet-service";
import Produto from "../models/Pet";
import conversorMonetario from "../utils/conversor-monetario";
import conversorDeData from "../utils/conversor-data";

let PetMixin = {
    filters: {
        data(data) {
          return conversorDeData.aplicarMascaraEmDataIso(data);
        },
        real(valor) {
          return conversorMonetario.aplicarMascaraParaRealComPrefixo(valor);
        },
    },
    data(){
        return {
            pets: [],
        }
    },

    mounted() {
        this.obterTodosOsProdutos();
    },

    methods: {    
        editarProduto(produto) {
          this.$router.push({ name: "EditarProduto", params: { id: produto.id } });
        },
    
        excluirProduto(produto) {
          this.$swal({
            icon: "question",
            title: "Deseja excluir o produto?",
            text: `Código: ${produto.id} - Nome: ${produto.nome}`,
            showCancelButton: true,
            confirmButtonColor: "#FF3D00",
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
            animate: true,
          }).then((result) => {
            if (result.isConfirmed) {
              produtoService
                .remove(produto.id)
                .then(() => {
                  let indice = this.pets.findIndex((p) => p.id == produto.id);
                  this.pets.splice(indice, 1);
    
                    this.$swal({
                      icon: 'success',
                      title: 'Produto deletado com sucesso!',
                      confirmButtonColor: '#FF3D00',
                      animate: true
                    });
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          });
        },
    
        ordernarProdutos(a, b) {
          // A < B = -1
          // A > B = 1
          // A == B = 0
          return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
        },
    
        obterTodosOsProdutos() {
          produtoService
            .getAll()
            .then((response) => {
              let pets = response.data.map((p) => new Produto(p));
              this.pets = pets.reverse();
            })
            .catch((error) => {
              console.log(error);
            });
        },
    },
}

export default PetMixin;