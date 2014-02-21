/// <reference path="../../lib/angular-1.2.10/angular.js" />
/// <reference path="../../lib/angular-1.2.10/angular-resource.js" />
/// <reference path="../Service/AccountService.js" />

var module = angular.module('SWGEmuArmorySPA.Controller');

module.controller('mainController', ['$scope', '$rootScope', '$location', '$routeParams', 'AccountService', 'CharacterDetailsService', 'StructureDetailsService', function ($scope, $rootScope, $location, $routeParams, accountService, characterDetailsService, structureDetailsService) {
    accountService.getAccountByUsername('crazyguymrkii').then(function (data) {

        $rootScope.accounts = data.data[0];
        $rootScope.selectedCharacter = null;
        $scope.selectCharacter = function (selectedCharacter) {
            $rootScope.selectedCharacter = selectedCharacter;
        };
    });

    $rootScope.$watch('selectedCharacter', function (newValue, oldValue) {

        if (typeof (newValue.character_oid) === 'undefined') {
            $rootScope.characterDetails = null;
        }
        else {
            characterDetailsService.getCharacterDetailsByOID(newValue.character_oid).then(function (data) {
                $rootScope.characterDetails = data.data[0];
            });
        }
    });

    $rootScope.$watch('selectedStructure', function (newVal, oldVal) {
        if (angular.isUndefined(newVal) || angular.isUndefined(newVal.object_id)) {
            $rootScope.selectedStructureDetails = null;
        }
        else {
            structureDetailsService.getDetailsForStructure(newVal.object_id, $rootScope.selectedCharacter.character_oid)
                .then(function (data) {
                    $rootScope.selectedStructureDetails = data.data;
                });
        }

    });

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
}]);
