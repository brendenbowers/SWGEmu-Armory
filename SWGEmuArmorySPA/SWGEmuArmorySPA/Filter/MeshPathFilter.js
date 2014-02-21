/// <reference path="../../lib/angular-1.2.10/angular.js" />
/// <reference path="../../lib/angular-1.2.10/angular-resource.js" />


var module = angular.module('SWGEmuArmorySPA.Filter');

module.filter('meshPath',
    function modelMeshPathFilter() {
        return function (input) {

            var toFormat = input;

            if (angular.isObject(input)) {
                if (angular.isDefined(input.portals_file_name) && input.portals_file_name !== '') {
                    toFormat = input.portals_file_name;
                }
                else if (angular.isDefined(input.appearance_file_name) && input.appearance_file_name !== '') {
                    toFormat = input.appearance_file_name;
                }
                else {
                    return null;
                }
            }

            var regxp = /appearance\/(\w+)\.\w{3}/;
            
            var parsed = regxp.exec(toFormat);
            if (parsed == null) {
                return null;
            }
            parsed = parsed[1];
            if (angular.isDefined(parsed) && parsed !== '') {
                return '/SWGEmuArmorySPA/3dmodels/' + parsed + '.js';
            }

            return null;
        };
    });

