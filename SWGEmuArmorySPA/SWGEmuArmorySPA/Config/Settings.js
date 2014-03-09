/// <reference path="../../lib/angular-1.2.10/angular.js" />
/// <reference path="../../lib/angular-1.2.10/angular-resource.js" />

var module = angular.module('SWGEmuArmorySPA.Config');


module.constant('endpoints', {
    apiHost: '', //api host here
    oauth2LoginEndpoint: '', //OAuth2 host here
    oauth2LogoutURL: '', //logout url here
});