Meteor.publish('messages', function(a) {
  return Messages.find( {channel: a}, {sort : {heure : -1}, limit : 25});
});

Meteor.publish('channels', function() {
  return Channels.find( {utilisateurs: this.userId}, {sort : {heure : -1}, limit : 25});
});
