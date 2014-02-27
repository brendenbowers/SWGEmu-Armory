/// <reference path="../../lib/angular-1.2.10/angular.js" />
/// <reference path="../../lib/angular-1.2.10/angular-resource.js" />

var module = angular.module('SWGEmuArmorySPA.Service');

module.service('TokenService', ['$http', function ($http) {
    return {
        getTokenInfo: function (token) {
            if (angular.isObject(token)) {
                token = token.access_token;
            }

            return $http.get('http://localhost:59798/tokeninfo/' + token);
        }
    };
}]);