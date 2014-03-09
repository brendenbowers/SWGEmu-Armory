/// <reference path="../../lib/angular-1.2.10/angular.js" />
/// <reference path="../../lib/angular-1.2.10/angular-resource.js" />
var module = angular.module('SWGEmuArmorySPA.Service');

module.service('StructureDetailsService', ['$http', 'endpoints', function ($http, endpoints) {
    return {
        getDetailsForStructure: function (structureOID, ownerOID) {
            return $http.get(endpoints.apiHost + '/structures', { params: { object_id: structureOID, owner_object_id: ownerOID } });
        }
    };
}]);