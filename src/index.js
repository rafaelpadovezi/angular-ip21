import angular from 'angular';
import ip21SqlService from './angular-ip21.js';

const angularIp21 = angular
    .module('angular-ip21', [])
    .factory('ip21SqlService', ip21SqlService)
    .name;

export default angularIp21;