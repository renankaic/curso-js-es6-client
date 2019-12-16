import {HttpService} from "./HttpService";
import {ConnectionFactory} from "./ConnectionFactory";
import {NegociacaoDao} from "../dao/NegociacaoDao";
import {Negociacao} from "../models/Negociacao";

export class NegociacaoService {

    constructor() {

        this._http = new HttpService();

    }

    lista() {

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection)) //O "return" aqui é implícito
            .then(dao => dao.listaTodos()) //O "return" aqui é implícito. Retornará uma lista do metodo listaTodos()
            .catch(erro => {
                console.log(erro);
                throw new Error("Não foi possível listar as Negociações");
            });

    }

    cadastra(negociacao) {

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => "Negociação adicionada com sucesso!")
            .catch(erro => { 
                console.log(error);
                throw new Error("Não foi possível adicionar a negociação.")
            });

    }

    apagaTodos() {

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(() => "Negociações apagadas com sucesso")
            .catch(erro => {
                console.log(erro);
                throw new Error("Não foi possível apagar as Negociações");
            })

    }

    importa(listaAtual) {

        return  this
                    .obterNegociacoes()
                    .then(negociacoes =>
                        negociacoes
                            .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                            .filter(negociacao =>
                                !listaAtual.some(negociacaoExistente => negociacao.isEquals(negociacaoExistente)))
                                    
                    )
                    .catch(error => {
                        console.log(error);
                        throw new Error("Não foi possível buscar as negociações para importar");
                    });

    }

    obterNegociacoes() {

        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]);

    }

    obterNegociacoesDaSemana() {

        return new Promise((resolve, reject) => {

            this._http
                .get("negociacoes/semana")
                .then(negociacoes => {
                    resolve( negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)) )
                })
                .catch(error => {
                    console.log(error);
                    reject("Não foi possível obter as negociações da Semana");
                });

        });

    }

    obterNegociacoesDaSemanaRetrasada() {

        return new Promise((resolve, reject) => {

            this._http
                .get("negociacoes/retrasada")
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                })
                .catch(error => {
                    console.log(error);
                    reject("Não foi possível obter as negociações da Semana");
                });

        });   

    }

    obterNegociacoesDaSemanaAnterior() {

        return new Promise((resolve, reject) => {

            this._http
                .get("negociacoes/anterior")
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                })
                .catch(error => {
                    console.log(error);
                    reject("Não foi possível obter as negociações da Semana");
                });

        });

    }

}