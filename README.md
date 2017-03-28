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
The ```create``` function accept three parameters. The ```config``` parameter is *optional*
```javascript
ip21SqlService.create(url, port, config)
```
An example of utilization:
```javascript
function controller(ip21SqlService) {
    var ip21Sql = ip21SqlService.create(
        "http://hostname/ProcessData/AtProcessDataREST.dll/SQL", // url
        10014,                                                         // port
        {                                                              // config
            host: "localhost",
            adsa: "CHARINT=N;CHARFLOAT=N;CHARTIME=N;CONVERTERRORS=N"
        }
    );

    ip21Sql.executeSelect("select name, ip_input_value from ip_analogdef")
        .then(function(data) {
            ...
        });
}
```

### Demo

To run the demo ```npm start```