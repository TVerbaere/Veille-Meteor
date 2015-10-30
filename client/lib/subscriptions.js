Deps.autorun(function() {
  Meteor.subscribe('messages', {
    onReady : function() {
      Session.set("active", true);
    }
  });
});
