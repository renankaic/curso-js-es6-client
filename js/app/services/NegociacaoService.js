"use strict";

System.register(["./HttpService", "./ConnectionFactory", "../dao/NegociacaoDao", "../models/Negociacao"], function (_export, _context) {
    "use strict";

    var HttpService, ConnectionFactory, NegociacaoDao, Negociacao, _createClass, NegociacaoService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HttpService) {
            HttpService = _HttpService.HttpService;
        }, function (_ConnectionFactory) {
            ConnectionFactory = _ConnectionFactory.ConnectionFactory;
        }, function (_daoNegociacaoDao) {
            NegociacaoDao = _daoNegociacaoDao.NegociacaoDao;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("NegociacaoService", NegociacaoService = function () {
                function NegociacaoService() {
                    _classCallCheck(this, NegociacaoService);

                    this._http = new HttpService();
                }

                _createClass(NegociacaoService, [{
                    key: "lista",
                    value: function lista() {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }) //O "return" aqui é implícito
                        .then(function (dao) {
                            return dao.listaTodos();
                        }) //O "return" aqui é implícito. Retornará uma lista do metodo listaTodos()
                        .catch(function (erro) {
                            console.log(erro);
                            throw new Error("Não foi possível listar as Negociações");
                        });
                    }
                }, {
                    key: "cadastra",
                    value: function cadastra(negociacao) {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.adiciona(negociacao);
                        }).then(function () {
                            return "Negociação adicionada com sucesso!";
                        }).catch(function (erro) {
                            console.log(error);
                            throw new Error("Não foi possível adicionar a negociação.");
                        });
                    }
                }, {
                    key: "apagaTodos",
                    value: function apagaTodos() {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.apagaTodos();
                        }).then(function () {
                            return "Negociações apagadas com sucesso";
                        }).catch(function (erro) {
                            console.log(erro);
                            throw new Error("Não foi possível apagar as Negociações");
                        });
                    }
                }, {
                    key: "importa",
                    value: function importa(listaAtual) {

                        return this.obterNegociacoes().then(function (negociacoes) {
                            return negociacoes.reduce(function (arrayAchatado, array) {
                                return arrayAchatado.concat(array);
                            }, []).filter(function (negociacao) {
                                return !listaAtual.some(function (negociacaoExistente) {
                                    return negociacao.isEquals(negociacaoExistente);
                                });
                            });
                        }).catch(function (error) {
                            console.log(error);
                            throw new Error("Não foi possível buscar as negociações para importar");
                        });
                    }
                }, {
                    key: "obterNegociacoes",
                    value: function obterNegociacoes() {

                        return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]);
                    }
                }, {
                    key: "obterNegociacoesDaSemana",
                    value: function obterNegociacoesDaSemana() {
                        var _this = this;

                        return new Promise(function (resolve, reject) {

                            _this._http.get("negociacoes/semana").then(function (negociacoes) {
                                resolve(negociacoes.map(function (objeto) {
                                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                                }));
                            }).catch(function (error) {
                                console.log(error);
                                reject("Não foi possível obter as negociações da Semana");
                            });
                        });
                    }
                }, {
                    key: "obterNegociacoesDaSemanaRetrasada",
                    value: function obterNegociacoesDaSemanaRetrasada() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {

                            _this2._http.get("negociacoes/retrasada").then(function (negociacoes) {
                                resolve(negociacoes.map(function (objeto) {
                                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                                }));
                            }).catch(function (error) {
                                console.log(error);
                                reject("Não foi possível obter as negociações da Semana");
                            });
                        });
                    }
                }, {
                    key: "obterNegociacoesDaSemanaAnterior",
                    value: function obterNegociacoesDaSemanaAnterior() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {

                            _this3._http.get("negociacoes/anterior").then(function (negociacoes) {
                                resolve(negociacoes.map(function (objeto) {
                                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                                }));
                            }).catch(function (error) {
                                console.log(error);
                                reject("Não foi possível obter as negociações da Semana");
                            });
                        });
                    }
                }]);

                return NegociacaoService;
            }());

            _export("NegociacaoService", NegociacaoService);
        }
    };
});
//# sourceMappingURL=NegociacaoService.js.map