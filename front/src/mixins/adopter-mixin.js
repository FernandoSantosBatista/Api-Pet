import adopterService from "@/services/adopter-service";
import Adopter from "../models/Adopter";

let AdopterMixin = {
   
    data(){
        return {
            adopters: [],
        }
    },

    mounted() {
        this.gettAllAdopters();
    },

    methods: {    
        editAdopters(adopter) {
          this.$router.push({ name: "EditAdopter", params: { id: adopter.id } });
        },
    
        removeAdopters(adopter) {
          this.$swal({
            icon: "question",
            title: "Deseja excluir o adotante?",
            text: `Código: ${adopter.id} - Nome: ${adopter.name}`,
            showCancelButton: true,
            confirmButtonColor: "#0039A8",
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
            animate: true,
          }).then((result) => {
            if (result.isConfirmed) {
              adopterService
                .remove(adopter.id)
                .then(() => {
                  let indice = this.adopters.findIndex((p) => p.id == adopter.id);
                  this.adopters.splice(indice, 1);
    
                    this.$swal({
                      icon: 'success',
                      title: 'Adotante deletado com sucesso!',
                      confirmButtonColor: '#0039A8',
                      animate: true
                    });
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          });
        },
    
        orderAdopter(a, b) {
          // A < B = -1
          // A > B = 1
          // A == B = 0
          return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
        },
    
        gettAllAdopters() {
          adopterService
            .getAll()
            .then((response) => {
              let adopters = response.data.map((p) => new Adopter(p));
              this.adopters = adopters.reverse();
            })
            .catch((error) => {
              console.log(error);
            });
        },
    },
}

export default AdopterMixin;