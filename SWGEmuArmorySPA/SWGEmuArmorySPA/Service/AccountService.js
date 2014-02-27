/// <reference path="../../lib/angular-1.2.10/angular.js" />
/// <reference path="../../lib/angular-1.2.10/angular-resource.js" />

var module = angular.module('SWGEmuArmorySPA.Service');

module.service('AccountService', ['$http', function ($http) {
    return {
        getAccountByUsername: function (username) {
            return $http.get('http://localhost:59798/account', { params: { username: username } });
        },
        getAccountByAccountID : function(accountID) {
            return $http.get('http://localhost:59798/account', { params: { account_id: accountID } });
        }
    };
}]);