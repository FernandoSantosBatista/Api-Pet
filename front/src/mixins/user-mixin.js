import petService from "@/services/pet-service";
import Pet from "../models/Pet";

let PetMixin = {
   // filters: {
        //data(data) {
          //return conversorDeData.aplicarMascaraEmDataIso(data);
        //},
    data(){
        return {
            pets: [],
        }
    },

    mounted() {
        this.getAllPets();
    },

    methods: {    
        editPets(pet) {
          this.$router.push({ name: "EditPet", params: { id: pet.id } });
        },
    
        removePet(pet) {
          this.$swal({
            icon: "question",
            title: "Deseja excluir o pet?",
            text: `Código: ${pet.id} - Nome: ${pet.name}`,
            showCancelButton: true,
            confirmButtonColor: "#FF3D00",
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
            animate: true,
          }).then((result) => {
            if (result.isConfirmed) {
              petService
                .remove(pet.id)
                .then(() => {
                  let indice = this.pets.findIndex((p) => p.id == pet.id);
                  this.pets.splice(indice, 1);
    
                    this.$swal({
                      icon: 'success',
                      title: 'Pet deletado com sucesso!',
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
    
        orderPets(a, b) {
          // A < B = -1
          // A > B = 1
          // A == B = 0
          return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
        },
    
        getAllPets() {
          petService
            .getAll()
            .then((response) => {
              let pets = response.data.map((p) => new Pet(p));
              this.pets = pets.reverse();
            })
            .catch((error) => {
              console.log(error);
            });
        },
    },
}

export default PetMixin;