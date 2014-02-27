/// <reference path="../lib/angular-1.2.10/angular.js" />

var module = angular.module('SWGEmuArmorySPA', ['ngRoute', 'LocalStorageModule', 'ui.bootstrap', 'SWGEmuArmorySPA.Service', 'SWGEmuArmorySPA.Controller', 'SWGEmuArmorySPA.Filter', 'SWGEmuArmorySPA.Directive']);

module.config(['$routeProvider',function ($routeProvider)
{
    $routeProvider.when('/character/:characterIdOrName?',
        {
            templateUrl: '/SWGEmuArmorySPA/View/characterView.html',
            controller: 'characterDetailsController'
        });
    $routeProvider.when('/inventory/:characterIdOrName?',
        {
            templateUrl: '/SWGEmuArmorySPA/View/inventoryView.html',
            controller: 'characterDetailsController'
        });
    $routeProvider.when('/character/:characterIdOrName/structures/:structureId?',
    {
        templateUrl: '/SWGEmuArmorySPA/View/structuresView.html',
        controller: 'structureDetailsController'
    });
    $routeProvider.when('/structures',
        {
            templateUrl: '/SWGEmuArmorySPA/View/structuresView.html',
            controller: 'structureDetailsController'
        });
    $routeProvider.when('/authenticate', 
        {
            templateUrl: '/SWGEmuArmorySPA/View/authResultView.html',
            controller: 'authenticationController'
        });
}]);