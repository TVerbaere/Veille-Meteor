Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', {
  name: 'accueil'
});

Router.route('/inscription', {
  name: 'inscription'
});

Router.route('/membres', {
  name: 'membres',
  onBeforeAction: function() {
    if (!Meteor.user())
      Router.go('inscription');
  }
});

Router.route('/membres/:_pseudo, /profil', {
  name: 'profil',
  onBeforeAction: function() {
    if (!Meteor.user())
      Router.go('inscription');
  },
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

Router.route('/channel/:_id', {
  name: 'channel',
  onBeforeAction: function() {
    if (!Meteor.user())
      Router.go('inscription');
  }
});
