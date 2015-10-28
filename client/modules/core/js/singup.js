Template.signup.helpers({
	foo: function () {
		// ...
	}
});

Template.signup.events({
	'submit form': function (event, template) {
		event.preventDefault();
		Accounts.createUser({
			username: event.target.username.value,
			password: event.target.password.value,
			email: event.target.email.value,
		}, function (error) {
			if(error){
				toastr.success('', error.reason);
			}else{
				toastr.success('', 'You are now part of meteor!');
				Router.go('dashboard');
				
			}
			
		});
	}
});