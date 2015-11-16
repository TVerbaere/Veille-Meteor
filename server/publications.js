Meteor.publish('messages', function(a) {
  return Messages.find( {channel: a}, {sort : {heure : -1}});
});

Meteor.publish('channels', function() {
  return Channels.find( {utilisateurs: this.userId}, {sort : {heure : -1}});
});

Meteor.publish('utilisateurs', function() {
   return Meteor.users.find({});
});

Meteor.publish('chercheaChannel', function() {
   return Channels.findOne({'_id': this.params._id});
});
