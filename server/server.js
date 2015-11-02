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
  }
});
