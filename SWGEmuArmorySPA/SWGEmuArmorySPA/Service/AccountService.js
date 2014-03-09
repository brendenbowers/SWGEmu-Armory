/// <reference path="../../lib/angular-1.2.10/angular.js" />
/// <reference path="../../lib/angular-1.2.10/angular-resource.js" />

var module = angular.module('SWGEmuArmorySPA.Service');

module.service('AccountService', ['$http', 'endpoints', function ($http, endpoints) {
    return {
        getAccountByUsername: function (username) {
            return $http.get(endpoints.apiHost + '/account', { params: { username: username } });
        },
        getAccountByAccountID : function(accountID) {
            return $http.get(endpoints.apiHost + '/account', { params: { account_id: accountID } });
        }
    };
}]);