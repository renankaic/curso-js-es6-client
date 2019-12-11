var ConnectionFactory = (function() {

    const stores = ['negociacoes'];
    const version = 5;
    const dbName = 'aluraframe';
    
    var conn = null;
    var close = null;

    return class ConnectionFactory {

        constructor() {
            throw new Error("Não é possível criar instâncias de ConnectionFactory");
        }

        static getConnection() {

            return new Promise((resolve, reject) => {

                let openRequest = window.indexedDB.open(dbName, version);
                openRequest.onupgradeneeded = e => {

                    ConnectionFactory._createStores(e.target.result);

                };

                openRequest.onsuccess = e => {

                    if (!conn) { 
                        conn = e.target.result;
                        close = conn.close.bind(conn);
                        conn.close = function() {
                            throw new Error("Você não pode fechar diretamente a conexão.");
                        }
                    };
                    resolve(conn);

                };

                openRequest.onerror = e => {

                    console.error(e.target.error);
                    reject(e.target.error.name);

                };

            });

        }

        static closeConnection(){

            if(conn) {
                close();
                conn = null;
            }

        }

        static _createStores(connection) {

            stores.forEach(store => {

                if (connection.objectStoreNames.contains(store)) {
                    connection.deleteObjectStore(store);
                }

                connection.createObjectStore(store, { autoIncrement: true });

            });

        }

    }

})();