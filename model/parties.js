/**
 * Created by waqas_000 on 12/6/2015.
 */
Parties = new Mongo.Collection("parties");
Parties.allow({
  insert: function (userId, party) {
    return userId && party.owner === userId;
  },
  update: function (userId, party, fields, modifier) {
    return userId && party.owner === userId;
  },
  remove: function (userId, party) {
    return userId && party.owner === userId;
  }
});