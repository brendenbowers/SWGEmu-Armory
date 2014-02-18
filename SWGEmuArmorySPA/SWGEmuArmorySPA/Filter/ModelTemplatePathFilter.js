/// <reference path="../../lib/angular-1.2.10/angular.js" />
/// <reference path="../../lib/angular-1.2.10/angular-resource.js" />
/// <reference path="../Service/AccountService.js" />


var module = angular.module('SWGEmuArmorySPA.Filter');

module.filter('modelTempaltePath',
    function inventoryTempaltePathFilter() {
        return function (input) {
            
            var toFormat = input;

            if (angular.isObject(input)) {
                if (angular.isUndefined(input.__type)) {
                    return '/SWGEmuArmorySPA/View/Inventory/CharacterInventoryItem.html';
                }

                toFormat = input.__type;
            }

            return '/SWGEmuArmorySPA/View' + input.__type.replace(/SWGEmuAPI\.Models/g, '').replace(', ', '').replace(/\./g, '/') + '.html';
            
        };
    });

