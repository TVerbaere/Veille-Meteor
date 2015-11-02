Template.inscription.events({
  "submit #form-inscription": function(e) {
    e.preventDefault();

    // Récupération des champs du formulaire d'inscription :
    var pseudo = $('input[name="inscription-pseudo"]').val();
    var nom = $('input[name="inscription-nom"]').val();
    var prenom = $('input[name="inscription-prenom"]').val();
    var email = $('input[name="inscription-email"]').val();
    var mdp = $('input[name="inscription-mdp"]').val();

    // On créé un utilisateur, les noms des champs ne doivent pas être renommés !
    var utilisateur = {
      username: pseudo,
      email: email,
      password: mdp,
      profile: {surname: prenom, name: nom}
    };

    // On créé l'utilisateur en utilisant le paquet Accounts :
    Accounts.createUser(utilisateur, function(err) {
      if (err) {
        alert(err.reason);
      }
      else {
        Router.go('accueil'); // Redirection en cas de succès
      }
    });
  }
});

Template.main.events({
  "click .deconnexion": function(e) {
      Meteor.logout();
  }
});

Template.connexion.events({
  "submit #form-connexion": function(e) {
    e.preventDefault();

    // Récupération des champs du formulaire de connexion :
    var pseudo = $('input[name="connexion-pseudo"]').val();
    var mdp = $('input[name="connexion-mdp"]').val();

    Meteor.loginWithPassword({
      username: pseudo
    }, mdp, function(err) {
      if (err.reason === 'Incorrect password')
        alert("Le mot de passe ou le pseudo est incorrect.");
      else
        alert("Aucun utilisateur avec un tel pseudo n'a été trouvé.");
    });
  }
});

Template.chat.events({
  'submit #form-chat' : function(e) {
    e.preventDefault();

    var pseudo = Meteor.user().username;
    var message = $('input[name="message-chat-public"]').val();

    var post = {
      contenu: message,
      ecrivain: pseudo,
      channel: null
    };

    if (message != "") {
      $('input[name="message-chat-public"]').val("");
      Meteor.call("ajouteMessage", post);
    }

  }
});

Template.channels.events({
  'submit #form-channel' : function(e) {
    e.preventDefault();

    var titre = $('input[name="titre-channel"]').val();

    var channel = {
      createur: Meteor.user().username,
      createur_id: Meteor.user()._id,
      titre: titre
    };

    if (titre != "") {
      $('input[name="titre-channel"]').val("");
      Meteor.call("ajouteChannel", channel);
    }

  }
});

Template.channels.events({
  "click .channel": function(e) {
      Router.go('/channel/'+this.id);
  }
})

Template.channel.events({
  'submit #form-chat-prive' : function(e) {
    e.preventDefault();

    var pseudo = Meteor.user().username;
    var message = $('input[name="message-chat-prive"]').val();

    var path = Iron.Location.get().path.split('/');
    var idchannel = parseInt(path[path.length-1]);

    console.log(idchannel);
    var post = {
      contenu: message,
      ecrivain: pseudo,
      channel: idchannel
    };

    if (message != "") {
      $('input[name="message-chat-prive"]').val("");
      Meteor.call("ajouteMessage", post);
    }
    
  }
});
