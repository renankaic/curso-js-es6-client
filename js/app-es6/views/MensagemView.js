import {View} from "./View";

export class MensagemView extends View {

    template(model){
        if (model.texto){
            return `<p class="alert alert-info">${model.texto}</p>`;
        }
        return '';
    }

}