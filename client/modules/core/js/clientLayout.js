Template.clientLayout.events({
	'click .go-logout': function () {
		Meteor.logout();
		Router.go('login');
	},

	'click .aDash': function(){
		Session.set('selectedNav', 'dashboard');
		
	}
});

