angular
    .module('app', ['angular-ip21'])
    .controller('angularIp21Demo', controller);

function controller(ip21SqlService) {
    var vm = this;

    var ip21Sql = ip21SqlService.create({
        url: "http://172.21.199.106/ProcessData/AtProcessDataREST.dll/SQL",
        host: "localhost",
        port: 10014,
        batchPort: 10016,
        adsa: "CHARINT=N;CHARFLOAT=N;CHARTIME=N;CONVERTERRORS=N"
    });


    vm.query = "select name, ip_input_value from ip_analogdef where name like 'MUT-012%'";
    ip21Sql.executeSelect(vm.query)
        .then(function(data) {
            console.log(data);
            vm.data = data;
        })
        .catch(function(error) {
            console.log(error);
        });
}