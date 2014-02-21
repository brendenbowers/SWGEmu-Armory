/// <reference path="../../lib/angular-1.2.10/angular.js" />
/// <reference path="../../lib/angular-1.2.10/angular-resource.js" />
var module = angular.module('SWGEmuArmorySPA.Service');

module.service('StructureDetailsService', ['$http', function ($http) {
    return {
        getDetailsForStructure: function (structureOID, ownerOID) {
            return $http.get('http://devenv:81/structures', { params: { object_id: structureOID, owner_object_id: ownerOID } });
        }
    };
}]);