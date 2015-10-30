// Foncion de validation des données envoyées lors de l'inscription. Ne pas toucher !
Accounts.validateNewUser( function(user) {

  // Vérification 1 : l'adresse mail est sous une forme traditionnelle :
  if (/^[a-zA-Z][a-zA-Z0-9_\.\-]+@([a-zA-Z][a-zA-Z0-9-]+\.)+[a-zA-Z]{2,3}$/
        .test(user.emails[0].address)) {

  }
  else {
    throw new Meteor.Error(403,"Veuillez donner une adresse email valide.");
  }

  // Vérification 2 : l'email entrée est déja utilisée :
  var emailDejaExistante = Meteor.users.find({"emails.address": user.emails[0].address}, {limit: 1}).count() > 0;
  if (emailDejaExistante) {
    throw new Meteor.Error(403, "Votre email est déja utilisée par un autre membre.");
  }

  // Vérification 3 : le pseudo est deja utilisé :
  var pseudoDejaExistant = Meteor.users.find({"username": user.username}, {limit: 1}).count() > 0;
  if (pseudoDejaExistant) {
    throw new Meteor.Error(403, "Le pseudo est déja utilisé par un autre membre.");
  }

  return true;

});
