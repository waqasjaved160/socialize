/**
 * Created by waqas_000 on 12/6/2015.
 */
angular.module('socialize').controller('PartiesListCtrl', [
    '$scope', '$meteor', '$rootScope', '$state', '$modal', function ($scope, $meteor, $rootScope, $state, $modal) {

    $scope.page = 1;
    $scope.perPage = 3;
    $scope.sort = {name: 1};
    $scope.orderProperty = '1';

    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

    $scope.parties = $meteor.collection(function () {
        return Parties.find({}, {
            sort: $scope.getReactively('sort')
        });
    });

    $meteor.autorun($scope, function () {
        $meteor.subscribe('parties', {
            limit: parseInt($scope.getReactively('perPage')),
            skip: (parseInt($scope.getReactively('page')) - 1) * parseInt($scope.getReactively('perPage')),
            sort: $scope.getReactively('sort')
        }, $scope.getReactively('search')).then(function () {
            $scope.partiesCount = $meteor.object(Counts, 'numberOfParties', false);
        });
    });

    $scope.$watch('orderProperty', function () {
        if ($scope.orderProperty)
            $scope.sort = {name: parseInt($scope.orderProperty)};
    });

    $scope.rsvp = function (partyId, rsvp) {
        $meteor.call('rsvp', partyId, rsvp).then(
            function (data) {
                console.log('success responding', data);
            },
            function (err) {
                console.log('failed', err);
            }
        );
    };

    $scope.outstandingInvitations = function (party) {
        return _.filter($scope.users, function (user) {
            return (_.contains(party.invited, user._id) && !_.findWhere(party.rsvps, {user: user._id}));
        });
    };

    $scope.getUserById = function (userId) {
        return Meteor.users.findOne(userId);
    };

    $scope.creator = function (party) {
        if (!party)
            return;
        var owner = $scope.getUserById(party.owner);
        if (!owner)
            return 'nobody';

        if ($rootScope.currentUser)
            if ($rootScope.currentUser._id)
                if (owner._id === $rootScope.currentUser._id)
                    return 'me';

        return owner;
    };

    $meteor.autorun($scope, function(){
        $meteor.subscribe("parties", {
            limit: parseInt($scope.getReactively('perPage')),
            skip: parseInt(($scope.getReactively('page') - 1) * parseInt($scope.getReactively('perPage'))),
            sort: $scope.getReactively('sort')
        }, $scope.getReactively('search')).then(function () {
            $scope.partiesCount = $meteor.object(Counts, 'numberOfParties', false);
        });
    });

    $scope.remove = function (party) {
        $scope.parties.remove(party);
    };
    $scope.removeAll = function () {
        $scope.parties.remove();
    };

    $scope.pageChanged = function (newPage) {
        $scope.page = newPage;
    };

    $scope.openAddNewPartyModal = function () {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'client/parties/views/add-new-party-model.html',
            controller: 'AddNewPartyCtrl',
            resolve: {
                parties: function () {
                    return $scope.parties;
                }
            }
        });

        modalInstance.result.then(function () {
        }, function () {
        });
    };
}]);