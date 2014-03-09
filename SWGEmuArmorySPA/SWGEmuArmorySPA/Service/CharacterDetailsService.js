/// <reference path="../../lib/angular-1.2.10/angular.js" />
/// <reference path="../../lib/angular-1.2.10/angular-resource.js" />

var module = angular.module('SWGEmuArmorySPA.Service');

module.service('CharacterDetailsService', ['$http', 'endpoints', function ($http, endpoints) {
    return {
        getCharacterDetailsByOID: function (characterOID) {
            return $http.get(endpoints.apiHost + '/account/characters', { params: { character_oid: characterOID } });
        },
        getCharacterDetailsByName: function (firstname) {
            return $http.get(endpoints.apiHost + '/account/characters', { params: { firstname: firstname } });
        },
    };
}]);