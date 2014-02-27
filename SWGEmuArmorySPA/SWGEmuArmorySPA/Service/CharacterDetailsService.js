/// <reference path="../../lib/angular-1.2.10/angular.js" />
/// <reference path="../../lib/angular-1.2.10/angular-resource.js" />

var module = angular.module('SWGEmuArmorySPA.Service');

module.service('CharacterDetailsService', ['$http', function ($http) {
    return {
        getCharacterDetailsByOID: function (characterOID) {
            return $http.get('http://localhost:59798/account/characters', { params: { character_oid: characterOID } });
        },
        getCharacterDetailsByName: function (firstname) {
            return $http.get('http://localhost:59798/account/characters', { params: { firstname: firstname } });
        },
    };
}]);