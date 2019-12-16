export class View {

    constructor(elemento) {
        this._elemento = elemento;
    }

    template(model) {
        //Como não há classes abstratas em JS
        //Essa é uma das maneiras de obrigar as classes filhas implementarem um método obrigatório
        throw new Error("O método template deve ser implementado!");
    }

    update(model) {
        this._elemento.innerHTML = this.template(model);
    }

}