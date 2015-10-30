Template.chat.helpers({
  messages_du_chat : function() {
    if (Session.get("active"))
      return Messages.find( {}, {sort : {heure : -1}, limit : 25});
    else
      return [];
  }
});
