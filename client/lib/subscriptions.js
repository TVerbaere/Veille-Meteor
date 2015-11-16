Deps.autorun(function() {
  var path = Iron.Location.get().path.split('/');
  var idchannel = path[path.length-1] || null;

  Meteor.subscribe('messages',idchannel, {
    onReady : function() {
      Session.set("active", true);
    }
  });

  Meteor.subscribe('utilisateurs', {
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
