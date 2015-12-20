/**
 * Created by waqas_000 on 12/17/2015.
 */
angular.module('socialize').controller('RoomsController', function($scope, $meteor){
    $scope.rooms = $meteor.collection(Rooms);
    $scope.messages = $meteor.collection(function(){
        return Messages.find({}, {sort: {createdAt: 1}, limit: Session.get("messageLimit")});   // Newest will come at the bottom.
    });

    $scope.recentMessages =  function () {
      return Messages.find({}, {sort: {createdAt: 1}});
    };
    $scope.sendMessage = function () {
        this.message.owner = Meteor.userId();
        this.message.createdAt = new Date();
        Messages.insert(this.message);
        this.message = {};
    };
    $scope.addRoom = function () {
        this.room.owner = Meteor.userId();
        this.message.createdAt = new Date();
        Rooms.insert(this.room);
        this.room = {};
    };
    $scope.deleteRoom = function (room){
        $scope.rooms.remove(room);
    };
    $scope.deleteMessage = function (message){
        $scope.messages.remove(message);
    };

    $scope.getUserById = function (userId) {
        var user = Meteor.users.findOne({_id: userId});
        if (user) {
            return user.username;
        } else {
            return "Anonymous";
        }
    };
});