Meteor.methods ({
  ajouteMessage : function(message) {
    var heure = new Date();
    var pseudo = "toto";
    Messages.insert({
      pseudo : message.ecrivain,
      date : heure,
      message : message.contenu
    });
  }
});
