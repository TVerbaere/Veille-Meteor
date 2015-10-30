Template.inscription.events({
  "submit form": function(e) {
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
  "submit form": function(e) {
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
  'submit form' : function(e) {
    e.preventDefault();

    var pseudo = Meteor.user().username;
    var message = $('input[name="message-chat-public"]').val();

    var post = {
      contenu: message,
      ecrivain: pseudo
    };

    if (message != "") {
      $('input[name="message-chat-public"]').val("");
      Meteor.call("ajouteMessage", post);
    }

  }
});
