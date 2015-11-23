// Publication des messages de channel 'a' (a null pour le chat public) :
Meteor.publish('messages', function(a) {
  return Messages.find( {channel: a}, {sort : {heure : -1}});
});

// Publication des channels :
Meteor.publish('channels', function() {
  return Channels.find( {utilisateurs: this.userId}, {sort : {heure : -1}});
});

// Publication des utilisateurs :
Meteor.publish('utilisateurs', function() {
   return Meteor.users.find({});
});
