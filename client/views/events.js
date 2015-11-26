// Fichiers contenant les évenements de l'application.


//                                **************** Evenements liés au menu ****************



// Déconnexion lors d'un clic sur le bouton "déconnexion" (template main).
Template.main.events({
  "click .deconnexion": function(e) {
      // Déconnexion + Redirection vers l'accueil
      Meteor.logout();
      Router.go('accueil');
  }
});

// Redirection vers le formulaire d'inscription lors d'un clic sur le bouton "inscription" (template main).
Template.main.events({
  "click .inscription": function(e) {
      Router.go('inscription');
  }
});

// Redirection vers la recherche lors d'un clic sur le bouton "Recherche" (template main).
Template.main.events({
  "click .recherche": function(e) {
      Router.go('recherche');
  }
});

// Redirection vers l'accueil lors d'un clic sur le bouton "Accueil" (template main).
Template.main.events({
  "click .accueil": function(e) {
      Router.go('accueil');
  }
});


//                                **************** Submit de formulaires ****************



// Submit du formulaire d'inscription (template inscription).
Template.inscription.events({
  "submit #form-inscription": function(e) {
    e.preventDefault();

    // Récupération des champs du formulaire d'inscription :
    var pseudo = $('input[name="inscription-pseudo"]').val().replace(" ","_");
    var nom = $('input[name="inscription-nom"]').val();
    var prenom = $('input[name="inscription-prenom"]').val();
    var email = $('input[name="inscription-email"]').val();
    var mdp = $('input[name="inscription-mdp"]').val();

    // On créé un utilisateur, les noms des champs ne doivent pas être renommés !
    var utilisateur = {
      username: pseudo,
      email: email,
      password: mdp,
      profile: {surname: nom, name: prenom}
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

// Submit du formulaire de connexion (template connexion).
Template.connexion.events({
  "submit #form-connexion": function(e) {
    e.preventDefault();

    // Récupération des champs du formulaire de connexion :
    var pseudo = $('input[name="connexion-pseudo"]').val().replace(" ","_");
    var mdp = $('input[name="connexion-mdp"]').val();

    // On essaye de se logger, en utilisant l'excellent paquet Accounts.
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

// Submit du formulaire d'envoi de message dans le chat global (template chat).
Template.chat.events({
  'submit #form-chat' : function(e) {
    e.preventDefault();

    // On récupère le pseudo et le message du textarea :
    var pseudo = Meteor.user().username;
    var message = $('textarea[name="message-chat-public"]').val();

    // On créé le post :
    var post = {
      contenu: message,
      ecrivain: pseudo,
      channel: null
    };

    // Si le message n'est pas vide on fait un appel au serveur (méthode ajouteMessage) :
    if (message != "") {
      $('textarea[name="message-chat-public"]').val("");
      Meteor.call("ajouteMessage", post);
    }

  }
});

// Submit du formulaire de création de channel (template channels).
Template.channels.events({
  'submit #form-channel' : function(e) {
    e.preventDefault();

    // On récupère le titre :
    var titre = $('input[name="titre-channel"]').val();

    // On créé la nouvelle channel :
    var channel = {
      createur: Meteor.user().username,
      createur_id: Meteor.user()._id,
      titre: titre
    };

    // Si le titre n'est pas vide on fait un appel au serveur (méthode ajouteChannel) :
    if (titre != "") {
      $('input[name="titre-channel"]').val("");
      Meteor.call("ajouteChannel", channel);
    }

  }
});

// Submit du formulaire d'envoi de message dans une channel :
Template.channel.events({
  'submit #form-chat-prive' : function(e) {
    e.preventDefault();

    // On récupère l'utilisateur courant ainsi que le message à envoyer :
    var pseudo = Meteor.user().username;
    var message = $('textarea[name="message-chat-prive"]').val();

    // On récupère l'id de la channel qui se trouve dans l'url :
    var path = Iron.Location.get().path.split('/');
    var idchannel = path[path.length-1];

    // On créé le post :
    var post = {
      contenu: message,
      ecrivain: pseudo,
      channel: idchannel
    };

    // Si le message n'est pas vide on fait un appel au serveur (méthode ajouteMessage) :
    if (message != "") {
      $('textarea[name="message-chat-prive"]').val("");
      Meteor.call("ajouteMessage", post);
    }

  }
});

// Submit du select de channel dans le profil d'un utilisateur (template profil).
Template.profil.events({
  'submit #form-profil' : function(e) {
    e.preventDefault();

    // On récupère le pseudo et l'id de la channel :
    var path = Iron.Location.get().path.split('/');

    var pseudo = path[path.length-1];
    var id_channel = $('#form-profil option:selected').val();

    // On fait un appel au serveur (méthode ajoutedansChannel) :
    Meteor.call("ajoutedansChannel", pseudo, id_channel);

  }
});


Template.recherche.events({
  'submit #form-recherche' : function(e, template) {
    e.preventDefault();

    var motcle = $('input[name="motcle"]').val().replace(" ","_");
    var type = $('input[name="recherche"]:checked').val();

    var utilisateurs;

    switch (type) {
      case "pseudo":
        utilisateurs = Meteor.users.find({"username" : {'$regex': motcle}}).fetch();
        break;
        case "nom":
          utilisateurs = Meteor.users.find({"profile.surname" : {'$regex': motcle}}).fetch();
          break;
        case "prenom":
          utilisateurs = Meteor.users.find({"profile.name" : {'$regex': motcle}}).fetch();
          break;
      default:
        utilisateurs = Meteor.users.find({ $or: [ {"username" : {'$regex': motcle}}, {"profile.name" : {'$regex': motcle}}, {"profile.surname" : {'$regex': motcle}}]}).fetch();
        break;

    }

    var liste = "";

    utilisateurs.map(function(utilisateur) {
      liste = liste + "<li><a href=\"/membre/"+utilisateur.username+"\">"+utilisateur.username+"</a><li>";
    });

    if (utilisateurs.length != 0)
      template.lastNode.innerHTML = "<ul>"+liste+"</ul>";
    else
      template.lastNode.innerHTML = "<ul><li>Pas de résultats<li></ul>";

  }
});


//                                **************** Evenements onClic ****************


// Suppression de la channel : clic sur X (template channels).
Template.channels.events({
  "click .supchannel": function(e) {
    e.preventDefault();
    // On supprime les messages se trouvant dans la channel
    Meteor.call("supprimerMessageduChannel", this);
    // On supprime la channel en elle même
    Meteor.call("supprimerChannel", this);
  }
});

// Suppression d'un utilisateur d'une channel': clic sur X (template channel).
Template.channel.events({
  "click .suputilisateur": function(e) {
    e.preventDefault();

    // On récupère l'id de la channel :
    var path = Iron.Location.get().path.split('/');

    var id_channel = path[path.length-1];
    Meteor.call("supprimerduChannel", this.toString(), id_channel);
  }
});
