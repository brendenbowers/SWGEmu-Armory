/// <reference path="../../lib/angular-1.2.10/angular.js" />
/// <reference path="../../lib/angular-1.2.10/angular-resource.js" />
/// <reference path="../Service/AccountService.js" />


var module = angular.module('SWGEmuArmorySPA.Filter');

module.filter('join',
    function joinFilter() {
        return function (input, glue, attr) {
            if (angular.isUndefined(input) || !angular.isArray(input) || input.length === 0) {
                return '';
            }

            var returnVal = '';
            if (typeof(attr) === 'undefined') {
                returnVal = input.join(glue);
            }
            else if (!angular.isUndefined(attr)) {
                var collectedValues = [];
                angular.forEach(input, function (val, key)
                {
                    collectedValues.push(val[attr]);
                });

                returnVal = collectedValues.join(glue);
            }

            return returnVal;
        };
    });