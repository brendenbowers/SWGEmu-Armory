/// <reference path="../../lib/angular-1.2.10/angular.js" />
/// <reference path="../../lib/angular-1.2.10/angular-resource.js" />

var module = angular.module('SWGEmuArmorySPA.Controller');

module.controller('authenticationController', ['$routeParams','$location','$window', '$scope', function ($routeParams, $location, $window, $scope) {
    
    
    var parentScope = $window.opener.angular.element($window.opener.document).scope();
    parentScope.$apply(function () {
        parentScope.oauthToken = {
            access_token: $routeParams.access_token,
            expires_in: $routeParams.expires_in,
            token_type: $routeParams.token_type,
        };
    });

    $window.close();

}]);