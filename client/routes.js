/**
 * Created by waqas_000 on 12/6/2015.
 */

angular.module("socialize").run(function ($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireUser promise is rejected
        // and redirect the user back to the main page
        if (error === 'AUTH_REQUIRED') {
            $state.go('parties');
        }
    });
});

angular.module('socialize').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('parties', {
            url: '/parties',
            templateUrl: 'client/parties/views/parties-list.html',
            controller: 'PartiesListCtrl',
            resolve: {
                "currentUser": function ($meteor) {
                    return $meteor.requireUser();
                }
            }
        })
        .state('partyDetails', {
            url: '/parties/:partyId',
            templateUrl: 'client/parties/views/parties-details.html',
            controller: 'PartyDetailsCtrl'
        });

    $urlRouterProvider.otherwise("/parties");
});