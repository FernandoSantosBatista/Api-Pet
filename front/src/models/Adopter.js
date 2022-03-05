export default class Adopter {
    constructor(obj){
        obj = obj || {};
        this.id = obj.id;
        this.name = obj.name;
        this.email = obj.email;
        this.telephone = obj.telephone;
        this.description = obj.description;
    }

    modelValidForRegistration(){
        return !!this.name;
    }

    modelValidToUpdate(){
        return !! (this.id && this.name)
    }
}