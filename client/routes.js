Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', {
  name: 'accueil'
});

Router.route('/inscription', {
  name: 'inscription'
});

// TODO: on ne doit pas pouvoir y aller déconnecté
Router.route('/membres/:_pseudo, /profil', {
  name: 'profil',
  data: function() {
    if (this.params._pseudo) {
      return {}
        utilisateur: {/*TODO*/}
      }
    else {
      return {
        utilisateur: Meteor.user()
      }
    }
  }
});

// TODO: on ne doit pas pouvoir y aller déconnecté
Router.route('/channel/:_id', {
  name: 'channel',
  data: function() {
    return {
      idchannel: this.params._id
    }
  }
});
