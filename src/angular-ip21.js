ip21SqlService.$inject = ['$http', '$q'];

export default ip21SqlService;

function ip21SqlService($http, $q) {
    return {
        create
    };

    function create(url, port, config = {}) {
        if (typeof(url) !== 'string') throw new TypeError('create expects a valid URL string as first parameter');
        if (typeof(port) !== 'number') throw new TypeError('create expects a valid Port number as first parameter');
        config.asda = config.asda || 'CHARINT=N;CHARFLOAT=N;CHARTIME=N;CONVERTERRORS=N';
        config.host = config.host || 'localhost';

        return {
            executeSelect,
            executeNonSelect
        };

        function execute(query, isSelect) {
            const deferred = $q.defer();

            const s = isSelect ? 1 : 0;
            const payload =
                
                '<SQL c="DRIVER={AspenTech SQLplus};' +
                'HOST=' + config.host + ';' +
                'Port=' + port + ';' +
                config.adsa + '" s="' + s + '">' +
                '<![CDATA[' + query + ']]>' +
                '</SQL>';

            $http({
                method: 'POST',
                url: url,
                data: payload,
                withCredentials: true,
                headers: {
                    'Content-Type': 'text/plain'
                }
            })
                .then(function (response) {
                    if (isSelect)
                        deferred.resolve(parseDataSelect(response));
                    else
                        deferred.resolve(parseDataNonSelect(response));
                })
                .catch(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function parseDataSelect(response) {
            const data = response.data.data;

            if (data.result)
                if (data.result.es)
                    throw 'O Web Service do InfoPlus.21 retornou um erro: ' + data.result.es;

            if (data[0].r === 'E')
                throw 'O Web Service do InfoPlus.21 retornou um erro: ' + data[0].aes;

            if (data[0].r === 'N')
                return [];

            //Verificar
            if (Number.isInteger(rows))
                return rows;

            const cols = data[0].cols.reduce(function (acc, item) {
                acc[item.i] = item.n;
                return acc;
            }, {});

            const rows = [];
            data[0].rows.forEach(function (row) {
                const newRow = row.fld.reduce(function (acc, item) {
                    acc[cols[item.i]] = item.v;
                    return acc;
                }, {});
                rows.push(newRow);
            });

            return rows;
        }

        function parseDataNonSelect(response) {
            const data = response.data.data;

            if (data.result)
                if (data.result.es)
                    throw 'O Web Service do InfoPlus.21 retornou um erro: ' + data.result.es;

            if (data[0].r === 'E')
                throw 'O Web Service do InfoPlus.21 retornou um erro: ' + data[0].aes;

            if (data[0].r === 'N')
                return [];

            return response;
        }

        function executeSelect(query) {
            return execute(query, true);
        }

        function executeNonSelect(query) {
            return execute(query, false);
        }
    }
}