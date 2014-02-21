/// <reference path="../../lib/angular-1.2.10/angular.js" />
/// <reference path="../../lib/angular-1.2.10/angular-resource.js" />

var module = angular.module('SWGEmuArmorySPA.Directive');

//from http://stackoverflow.com/questions/17863732/angularjs-how-to-render-a-partial-with-variables
module.directive('withLocals', function ($parse) {
    return {
        scope: true,
        compile: function (element, attributes, transclusion) {
            // for each attribute that matches locals-* (camelcased to locals[A-Z0-9]),
            // capture the "key" intended for the local variable so that we can later
            // map it into $scope.locals (in the linking function below)
            var mapLocalsToParentExp = {};
            for (attr in attributes) {
                if (attributes.hasOwnProperty(attr) && /^locals[A-Z0-9]/.test(attr)) {
                    var localKey = attr.slice(6);
                    localKey = localKey[0].toLowerCase() + localKey.slice(1);

                    mapLocalsToParentExp[localKey] = attributes[attr];
                }
            }

            var updateParentValueFunction = function ($scope, localKey) {
                // Find the $parent scope that initialized this directive.
                // Important in cases where controllers have caused this $scope to be deeply nested inside the original parent
                var $parent = $scope.$parent;
                while ($parent !== null && !$parent.hasOwnProperty(mapLocalsToParentExp[localKey])) {
                    $parent = $parent.$parent;
                }

                if ($parent == null) {
                    return null;
                }

                return function (newValue) {
                    $parse(mapLocalsToParentExp[localKey]).assign($parent, newValue);
                }
            };

            return {
                pre: function ($scope, $element, $attributes) {

                    // setup `$scope.locals` hash so that we can map expressions
                    // from the parent scope into it.
                    $scope.locals = {};
                    for (localKey in mapLocalsToParentExp) {
                        
                        var parsedGetter = $parse(mapLocalsToParentExp[localKey]);
                        //if value is a constant literal, set it
                        if (parsedGetter.literal && parsedGetter.constant) {
                            $scope.locals[localKey] = parsedGetter();
                        }

                        var cur = $scope;

                        if (/locals(\.{1}\w+)+/.test(mapLocalsToParentExp[localKey])) {
                            cur = $scope.$parent;
                        }

                        // For each local key, $watch the provided expression and update
                        // the $scope.locals hash (i.e. attribute `locals-cars` has key
                        // `cars` and the $watch()ed value maps to `$scope.locals.cars`)
                        cur.$watch(
                            mapLocalsToParentExp[localKey],
                            function (localKey) {
                                return function (newValue, oldValue) {
                                    $scope.locals[localKey] = newValue;
                                };
                            }(localKey),
                            true
                        );

                        // Also watch the local value and propagate any changes
                        // back up to the parent scope.
                        
                        if (parsedGetter.assign) {
                            $scope.$watch('locals.' + localKey, updateParentValueFunction($scope, localKey));
                        }

                    }
                }
            };
        }
    };
});