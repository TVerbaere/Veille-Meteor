// Fonction de validation des données envoyées lors de l'inscription. Ne pas toucher !
Accounts.validateNewUser( function(user) {

  if (user.services.password.length < 5) {
    throw new Meteor.Error(500,"Votre mot de passe doit contenir plus de 5 caractères.")
  }

  if (/^[a-zA-Z][a-zA-Z0-9_\.\-]+@([a-zA-Z][a-zA-Z0-9-]+\.)+[a-zA-Z]{2,3}$/
        .test(user.emails[0].address)
      ) {
    return true;
  }
  else {
    throw new Meteor.Error(500,"Veuillez donner une adresse email valide.");
  }

});
