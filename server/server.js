Meteor.methods ({
  ajouteMessage : function(message) {
    var heure = new Date();
    Messages.insert({
      pseudo : message.ecrivain,
      date : heure,
      message : message.contenu,
      channel : message.channel
    });
  },

  ajouteChannel : function(channel) {
      Channels.insert({
        titre : channel.titre,
        createur : channel.createur,
        utilisateurs : [channel.createur_id],
        heure : new Date()
      });
  },

  ajoutedansChannel : function(pseudo, id_channel) {
    var channel = Channels.findOne({'_id': id_channel});
    var utilisateur = Meteor.users.findOne({'username': pseudo});

    var id_utilisateur = utilisateur._id;
    var tab = channel.utilisateurs;

    if (tab.indexOf(id_utilisateur) == -1) {

      tab.splice(0, 0, id_utilisateur);

      Channels.update({ "_id" : id_channel },{
        $set: { "utilisateurs": tab },
        $currentDate: { "lastModified": true }
      }
    )
  }
},

supprimerMessageduChannel : function(channel) {
  Messages.remove({ channel : channel});
},

supprimerChannel : function(channel) {
  Channels.remove(channel._id);
}

});
