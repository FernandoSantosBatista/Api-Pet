export default class Usuario {
    constructor(obj){
        obj = obj || {};
        this.id = obj.id;
        this.name = obj.name;
        this.email = obj.email;
        this.password = obj.password;
    }

    modeloValidoLogin(){
        return !!(this.email && this.password);
    }

    modelValidForRegistration(){
        return !!this.name;
    }

    modelValidToUpdate(){
        return !! (this.id && this.name)
    }
}