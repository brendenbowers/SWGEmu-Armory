/// <reference path="../../lib/angular-1.2.10/angular.js" />
/// <reference path="../../lib/angular-1.2.10/angular-resource.js" />
/// <reference path="../Service/AccountService.js" />

//filter function from https://github.com/angular/angular.js/pull/3877/files

var module = angular.module('SWGEmuArmorySPA.Filter');

module.filter('replace', 
    function replaceFilter() {
        return function (input, replacements) {

            // Handle invalid replacements
            if (!angular.isObject(replacements)) {
                return input;
            }

            // Perform replacements
            angular.forEach(replacements, function (to, from) {
                if (typeof(to) !== 'undefined') {

                    // Convert to regular expression for global replacement
                    var regex = new RegExp(from, "g");
                    input = input.replace(regex, to);
                }
            });

            return input;
        };
    });

