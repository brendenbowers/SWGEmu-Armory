/// <reference path="../../lib/angular-1.2.10/angular.js" />
/// <reference path="../../lib/angular-1.2.10/angular-resource.js" />

var module = angular.module('SWGEmuArmorySPA.Service');

module.service('TokenService', ['$http', 'endpoints', function ($http, endpoints) {
    return {
        getTokenInfo: function (token) {
            if (angular.isObject(token)) {
                token = token.access_token;
            }

            return $http.get(endpoints.oauth2LoginEndpoint + '/tokeninfo/' + token);
        }
    };
}]);