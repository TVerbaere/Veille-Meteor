// Fichier contenant les helpers de l'application.

// Helper permettant le formatage des dates (accessible partout) :
UI.registerHelper('formatDate', function(date) {
  return moment(date).format("DD/MM/YYYY, HH:mm");
});

// Helper permettant d'initialiser les messages du chat global (template chat).
Template.chat.helpers({
  messages_du_chat : function() {
    if (Session.get("active")) {
      return Messages.find( {channel: null}, {sort : {date: -1}, limit: 20});
    }
    else
      return [];
  }
});

// Helper permettant d'initialiser les channels de l'utilisateur (template channels).
Template.channels.helpers({
  channels : function() {
    if (Session.get("active"))
      return Channels.find( {utilisateurs: Meteor.user()._id}, {sort : {heure : -1}});
    else
      return [];
  }
});

// Helper permettant d'initialiser la page de profil d'un utilisateur (template profil).
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

// Helper permettant d'initialiser les messages d'un channel (template channel).
Template.channel.helpers({
  fil : function() {
    if (Session.get("active")) {
      var path = Iron.Location.get().path.split('/');
      var idchannel = path[path.length-1];
      return Messages.find( {channel: idchannel}, {sort : {date : -1}, limit: 20});
    }
    else
      return [];
  }
});
