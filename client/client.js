UI.registerHelper('formatDate', function(date) {
  return moment(date).format("DD/MM/YYYY, HH:mm");
});

Template.chat.helpers({
  messages_du_chat : function() {
    if (Session.get("active")) {
      return Messages.find( {channel: null}, {sort : {heure : -1}});
    }
    else
      return [];
  }
});

Template.channels.helpers({
  channels : function() {
    if (Session.get("active"))
      return Channels.find( {utilisateurs: Meteor.user()._id}, {sort : {heure : -1}});
    else
      return [];
  }
});

Template.profil.helpers({
  utilisateur_channels : function(pseudo) {
      return Channels.find( {createur: pseudo}, {sort : {heure : -1}});
  },
  estIdentique: function (utilisateur_connecte, utilisateur) {
    if (utilisateur_connecte && utilisateur) {
      return utilisateur_connecte.username !== utilisateur.username;
    }
  }
});

Template.channel.helpers({
  fil : function() {
    if (Session.get("active")) {
      var path = Iron.Location.get().path.split('/');
      var idchannel = path[path.length-1];
      return Messages.find( {channel: idchannel}, {sort : {heure : -1}});
    }
    else
      return [];
  }
});
