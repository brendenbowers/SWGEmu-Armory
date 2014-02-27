var module = angular.module('SWGEmuArmorySPA.Service');

module.factory('bearerTokenHttpInterceptor', ['$q', 'LocalStorageModule', function ($q, localStorageModule) {
    return {
        request: function (config) {
            
            var token = localStorageModule.get('oauthToken');
            if (token != null) {
                config.headers.Authorization = token.token_type + ' ' + token.access_token;
            }
            return config || $q.when(config);
        },
    };
}]);