/**
 * Created by waqas_000 on 12/17/2015.
 */
angular.module('socialize').controller('ContactsController', function($scope){
    $scope.rooms = Rooms.find({});
});