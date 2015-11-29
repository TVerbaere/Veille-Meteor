// Fichier regroupant toutes les méthodes du serveur.
Meteor.methods ({
  // Permet l'ajout d'un message en base, spécifié en paramètre.
  ajouteMessage : function(message) {
    var heure = new Date();
    Messages.insert({
      pseudo : message.ecrivain,
      date : heure,
      message : message.contenu,
      channel : message.channel
    });
  },

  // Permet l'ajout d'une channel en base, spécifiée en paramètre.
  ajouteChannel : function(channel) {
      Channels.insert({
        titre : channel.titre,
        createur : channel.createur,
        utilisateurs : [channel.createur_id],
        heure : new Date()
      });
  },

  // Permet d'ajouter un utilisateur de pseudo 'pseudo' dans une channel d'identifiant 'id_channel'.
  ajoutedansChannel : function(pseudo, id_channel) {
    // On retrouve la channel et l'utilisateur dont il est question :
    var channel = Channels.findOne({_id: id_channel});
    var utilisateur = Meteor.users.findOne({username: pseudo});

    var id_utilisateur = utilisateur._id;
    var tab = channel.utilisateurs;

    // Cas possible : l'utilisateur est déja dans la channel : On ne fait rien !
    // Sinon :
    if (id_channel && tab.indexOf(id_utilisateur) == -1) {
      // On l'ajoute dans le tableau des utilisateurs :
      Channels.update({ _id : id_channel },{
        $push: { utilisateurs: id_utilisateur }
      }
      )};
  },

  // Permet de supprimer les messages d'une channel spécifiée en paramètre.
  supprimerMessageduChannel : function(channel) {
    Messages.remove({ channel : channel});
  },

  // Permet de supprimer une channel spécifiée en paramètre.
  supprimerChannel : function(channel) {
    Channels.remove(channel._id);
  }

});

