Deps.autorun(function() {
  Meteor.subscribe('messages', {
    onReady : function() {
      Session.set("active", true);
    }
  });

  Meteor.subscribe('channels', {
    onReady : function() {
      Session.set("active", true);
    }
  });
});
