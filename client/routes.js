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
        utilisateur: Meteor.users.find({"username": this.params._pseudo}, {limit : 1}).fetch()
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
      channel: Channels.find({'_id': this.params._id}).fetch()
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
