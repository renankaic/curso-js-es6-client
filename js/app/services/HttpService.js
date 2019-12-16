class HttpService {

    _handleErrors(response) {

        if (!response.ok) throw new Error(response.statusText);
        return response;

    }

    get(url) {

        return fetch(url)
            .then(response => this._handleErrors(response))
            .then(response => response.json());

    }

    post(url, dado) {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("POST",url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () => {

                if (xhr.readyState === 4) {

                    if (xhr.status === 200) {

                        resolve(JSON.parse(xhr.responseText));

                    } else {

                        reject(xhr.responseText);

                    }

                }

            }
            xhr.send(JSON.stringify(dado));

        });

    }
}