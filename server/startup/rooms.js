/**
 * Created by waqas_000 on 12/16/2015.
 */
Meteor.startup(function () {
    if (Rooms.find().count() === 0) {
        var rooms = [
            {
                'name': 'QC Dev Rockstars',
                'description': 'All rockstars'
            },
            {
                'name': 'Corporate',
                'description': 'Few rockstars'
            },
            {
                'name': 'Chee Patakh Dumpukht Karimba',
                'description': 'ok'
            }
        ];

        for (var i = 0; i < rooms.length; i++) {
            Rooms.insert(rooms[i]);
        }
    }
});