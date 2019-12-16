import {currentInstance} from "./controllers/NegociacaoController";
import {} from "./polyfill/fetch";

let negociacaoController = currentInstance();

document.querySelector(".form").onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector("#bt-apaga").onclick = negociacaoController.apaga.bind(negociacaoController);