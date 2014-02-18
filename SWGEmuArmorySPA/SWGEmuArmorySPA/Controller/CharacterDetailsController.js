/// <reference path="../../lib/angular-1.2.10/angular.js" />
/// <reference path="../../lib/angular-1.2.10/angular-resource.js" />

var module = angular.module('SWGEmuArmorySPA.Controller');

module.controller('characterDetailsController', ['$scope', '$rootScope',  '$routeParams', 'CharacterDetailsService', function ($scope, $rootScope, $routeParams, characterDetailsService) {

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



    $scope.isInvItemSelected = function (selected) {
        return $scope.selectedInvItem == selected;
    };

    $scope.onInvItemClick = function (item) {
        $scope.selectedInvItem = item;
    };

    $scope.$watch('selectedInvItem', function (newVal, oldVal)
    {
        if (typeof (newVal) === 'undefined') {
            $scope.invItemTemplatePath = null;
        }
        else if (typeof (newVal.__type) === 'undefined') {
            $scope.invItemTemplatePath = '/SWGEmuArmorySPA/View/Inventory/CharacterInventoryItem.html';
        }
        else {
            $scope.invItemTemplatePath = '/SWGEmuArmorySPA/View' + newVal.__type.replace(/SWGEmuAPI\.Models/g, '').replace(', ', '').replace(/\./g, '/') + '.html';
        }
        
    });
}]);