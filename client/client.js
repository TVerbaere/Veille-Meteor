Template.chat.helpers({
  messages_du_chat : function() {
    if (Session.get("active"))
      return Messages.find( {channel: null}, {sort : {heure : -1}, limit : 25});
    else
      return [];
  }
});

Template.channels.helpers({
  channels : function() {
    if (Session.get("active"))
      return Channels.find( {utilisateurs: Meteor.user()._id}, {sort : {heure : -1}, limit : 25});
    else
      return [];
  }
});
