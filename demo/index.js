angular
    .module('app', ['angular-ip21'])
    .controller('angularIp21Demo', controller);

function controller(ip21SqlService) {
    var vm = this;
    var url = 'http://hostname/ProcessData/AtProcessDataREST.dll/SQL';
    var port  = 10014;

    var ip21Sql = ip21SqlService.create(url, port);


    vm.query = "select name, ip_input_value from ip_analogdef where name like 'abc-012%'";
    ip21Sql.executeSelect(vm.query)
        .then(function(data) {
            console.log(data);
            vm.data = data;
        })
        .catch(function(error) {
            console.log(error);
        });
}