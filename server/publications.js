Meteor.publish('messages', function() {
  return Messages.find( {channel: null}, {sort : {heure : -1}, limit : 25});
});

Meteor.publish('channels', function() {
  return Channels.find( {utilisateurs: this.userId}, {sort : {heure : -1}, limit : 25});
});
