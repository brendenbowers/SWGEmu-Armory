/// <reference path="../../lib/angular-1.2.10/angular.js" />
/// <reference path="../../lib/angular-1.2.10/angular-resource.js" />

var module = angular.module('SWGEmuArmorySPA.Controller');

module.controller('structureDetailsController', ['$scope', '$rootScope', '$routeParams', 'StructureDetailsService', function ($scope, $rootScope, $routeParams, structureDetailsService) {

    $rootScope.$watch('accounts', function (newVal, oldVal) {
        if (angular.isDefined(newVal)) {
            if (angular.isDefined($routeParams.characterIdOrName)) {
                if (angular.isNumber($routeParams.characterIdOrName)) {
                    angular.forEach($rootScope.accounts.characters, function (character) {
                        if (character.character_oid == $routeParams.characterIdOrName) {
                            $rootScope.selectedCharacter = character;
                        }
                    });
                }
                else if ($routeParams.characterIdOrName !== '') {
                    angular.forEach($rootScope.accounts.characters, function (character) {
                        if (character.firstname == $routeParams.characterIdOrName) {
                            $rootScope.selectedCharacter = character;
                        }
                    });
                }
            }
        }
    });

    $rootScope.$watch('characterDetails', function (newVal, oldVal) {
        if (angular.isDefined(newVal) && angular.isDefined($routeParams.structureId)) {
            angular.forEach(newVal.Structures, function (structure) {
                if (structure.object_id == $routeParams.structureId) {
                    $rootScope.selectedStructure = structure;
                }
            });
        }
    });

    $scope.onStructureSeledcted = function (selectedStructure) {
        $rootScope.selectedStructure = selectedStructure;
    }

    $scope.isSelectedStructure = function (structure) {
        return $rootScope.selectedStructure == structure;
    }

    $scope.onBuildingInvItemClick = function (clickedItem) {
        $scope.selectedBuildingInvItem = clickedItem;
    }
}]);