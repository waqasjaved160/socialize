/**
 * Created by waqas_000 on 12/6/2015.
 */
angular.module('socialize').controller("PartyDetailsCtrl", function ($scope, $stateParams, $meteor) {
    $scope.party = $meteor.object(Parties, $stateParams.partyId);
    $scope.users = $meteor.collection(Meteor.users, false).subscribe("users");
    $scope.$meteorSubscribe('parties');

    $scope.save = function () {
        $scope.party.save().then(function (numberOfDocs) {
            console.log('save success doc affected ', numberOfDocs);
        }, function (error) {
            console.log('save error', error);
        });
    };

    $scope.reset = function () {
        $scope.party.reset();
    };
});