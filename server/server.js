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
      var idc = Channels.find( {}, {sort : {id : -1}, limit : 1}).count();
      Channels.insert({
        id : idc+1,
        titre : channel.titre,
        createur : channel.createur,
        utilisateurs : [channel.createur_id],
        heure : new Date()
      });
  },

  ajoutedansChannel : function(pseudo, id_channel) {
    var channel = Channels.findOne({'id': id_channel});
    var utilisateur = Meteor.users.findOne({'username': pseudo});

    var id_utilisateur = utilisateur._id;
    var tab = channel.utilisateurs;

    if (tab.indexOf(id_utilisateur) == -1) {

      tab.splice(0, 0, id_utilisateur);

      Channels.update({ "id" : id_channel },{
        $set: { "utilisateurs": tab },
        $currentDate: { "lastModified": true }
      }
    )
  }
}

});
