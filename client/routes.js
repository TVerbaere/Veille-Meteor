Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', {
  name: 'accueil'
});

Router.route('/inscription', {
  name: 'inscription'
});

Router.route('/membre/:_pseudo', {
  name: 'profil',
  data: function() {
      return {
        utilisateur: Meteor.users.findOne({"username": this.params._pseudo})
      }
  },
  onBeforeAction: function() {
    if (!Meteor.userId())
      Router.go('inscription');
      else {
        this.next();
      }
  }
});

Router.route('/channel/:_id', {
  name: 'channel',
  data: function() {
    return {
      channel: Channels.findOne({'_id': this.params._id})
    }
  },
  onBeforeAction: function() {
    if (!Meteor.userId())
      Router.go('inscription');
      else {
        this.next();
      }
  }
});
