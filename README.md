# Angular IP21

AngularJS tiny library to access Aspentech InfoPlus21 Sql Web server.

### Install

```
npm install --save angular-ip21
```

### Configuration
Include the module name ```angular-ip21``` in your angular app. For example:
```javascript
angular.module('app', ['angular-ip21']);
```
### Usage
```javascript
function controller(ip21SqlService) {
    var ip21Sql = ip21SqlService.create({
        url: "http://172.21.199.106/ProcessData/AtProcessDataREST.dll/SQL",
        host: "localhost",
        port: 10014,
        adsa: "CHARINT=N;CHARFLOAT=N;CHARTIME=N;CONVERTERRORS=N"
    });

    ip21Sql.executeSelect("select name, ip_input_value from ip_analogdef where name like 'MUT-012%'")
        .then(function(data) {
            ...
        });
}
```
