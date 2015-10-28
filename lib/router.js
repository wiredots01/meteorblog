Router.configure({
	layoutTemplate: 'clientLayout'
});

Router.route('/',{
	name: 'home'
});

Router.route('/login', {
	name: 'login'
});

Router.route('/signup', {
	name: 'signup'
});

Router.route('/dashboard', {
	name: 'dashboard',
	onBeforeAction: function (pause) {
    if (!Meteor.user()) {
    	toastr.warning('Error', 'You need to login first.');
	    this.render('login');
	  }
	  this.next();
  }

});

Router.route('/posts', {
	name: 'postLists',
	onBeforeAction: function (pause) {
    if (!Meteor.user()) {
    	toastr.warning('Error', 'You need to login first.');
	    this.render('login');
	  }
	  this.next();
  }
});




Router.route('/posts/new', {
	name: 'createPost',
	onBeforeAction: function (pause) {
    if (!Meteor.user()) {
    	toastr.warning('Error', 'You need to login first.');
	    this.render('login');
	  }
	  this.next();
  }
});

Router.route('/profile', {
	name: 'profile',
	onBeforeAction: function (pause) {
    if (!Meteor.user()) {
    	toastr.warning('Error', 'You need to login first.');
	    this.render('login');
	  }
	  this.next()
  }
});

Router.route('/post/edit/:id', {
	name: 'editPost',
	data: function(){
    var id = this.params.id;
    return Posts.findOne({ _id: id });
  },
  onBeforeAction: function (pause) {
    if (!Meteor.user()) {
    	toastr.warning('Error', 'You need to login first.');
	    this.render('login');
	  }
	  this.next()
  }
});

Router.route('/article/:id', {
	name: 'articleDetails',
	data: function(){
    var id = this.params.id;
    return Posts.findOne({ _id: id });
  }
  
});

