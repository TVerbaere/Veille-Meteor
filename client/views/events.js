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
      Router.go('accueil');
  }
});

Template.main.events({
  "click .accueil": function(e) {
      Router.go('accueil');
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
      if (err) {
        if (err.reason === 'Incorrect password')
          alert("Le mot de passe ou le pseudo est incorrect.");
        else
          alert("Aucun utilisateur avec un tel pseudo n'a été trouvé.");
      }
    });
  }
});

Template.chat.events({
  'submit #form-chat' : function(e) {
    e.preventDefault();

    var pseudo = Meteor.user().username;
    var message = $('textarea[name="message-chat-public"]').val();

    var post = {
      contenu: message,
      ecrivain: pseudo,
      channel: null
    };

    if (message != "") {
      $('textarea[name="message-chat-public"]').val("");
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
      $("#fil").scrollTop($("#fil").prop("scrollHeight"));
    }

  }
});

Template.channel.events({
  'submit #form-chat-prive' : function(e) {
    e.preventDefault();

    var pseudo = Meteor.user().username;
    var message = $('textarea[name="message-chat-prive"]').val();

    var path = Iron.Location.get().path.split('/');
    var idchannel = path[path.length-1];

    var post = {
      contenu: message,
      ecrivain: pseudo,
      channel: idchannel
    };

    if (message != "") {
      $('textarea[name="message-chat-prive"]').val("");
      Meteor.call("ajouteMessage", post);
    }

  }
});

Template.profil.events({
  'submit #form-profil' : function(e) {
    e.preventDefault();

    var path = Iron.Location.get().path.split('/');

    var pseudo = path[path.length-1];
    var id_channel = $('#form-profil option:selected').val();

    Meteor.call("ajoutedansChannel", pseudo, id_channel);

  }
});
