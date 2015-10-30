Meteor.publish('messages', function() {
  return Messages.find( {}, {sort : {heure : -1}, limit : 25});
});
