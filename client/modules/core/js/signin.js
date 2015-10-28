Template.login.events({
	'submit form': function (event, template) {
		event.preventDefault();
		Meteor.loginWithPassword(event.target.email.value, event.target.password.value, function(error) {
      if (error) {
      	console.log("error", error.reason);
        // return Session.set(ERRORS_KEY, {'none': error.reason});
      }
      Router.go('dashboard');
    });
	}
});