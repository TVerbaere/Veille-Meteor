Meteor.methods ({
  ajouteMessage : function(message) {
    var heure = new Date();
    Messages.insert({
      pseudo : message.ecrivain,
      date : heure,
      message : message.contenu,
      channel : message.channel
    });
  }
});

Meteor.methods ({
ajouteChannel : function(channel) {
  var dejaExistant = Channels.find(channel, {limit: 1}).count() > 0;
  if (!dejaExistant) {
    Channels.insert({
      titre : channel.titre,
      createur : channel.createur,
      utilisateurs : [channel.createur_id],
      heure : new Date()
    });
  }
}
});
