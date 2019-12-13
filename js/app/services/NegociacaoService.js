class NegociacaoService {

    constructor() {

        this._http = new HttpService();

    }

    lista() {

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection)) //O "return" aqui é implícito
            .then(dao => dao.listaTodos()) //O "return" aqui é implícito. Retornará uma lista do metodo listaTodos()
            .catch(erro => {
                console.error(erro);
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
                console.error(error);
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
                console.error(erro);
                throw new Error("Não foi possível apagar as Negociações");
            })

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
                    console.error(error);
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
                    console.error(error);
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
                    console.error(error);
                    reject("Não foi possível obter as negociações da Semana");
                });

        });

    }

}