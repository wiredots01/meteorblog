
// Tracker.autorun(function () {
//   Meteor.subscribe("publicPosts", Session.get('postCursor'));
// });

Session.setDefault('postCursor', 0);
Session.setDefault('searchQuery', '');
Session.setDefault('postPerPage', 6);

Template.home.onCreated(function () {
  var self = this;
  self.autorun(function () {
  	

    Meteor.subscribe("publicPosts", Session.get('postCursor'), Session.get('searchQuery'));
    Meteor.subscribe("publicPostsCount", Session.get('searchQuery') );
  });
});

Template.home.helpers({
	latestPosts: function(){
		return Posts.find({}, {sort: {createdAt: -1}});
	},

	renderImage: function(){
		return Images.findOne({_id: this.featuredImage});
	},

	activeNext: function(){
		var total = Counts.get('allPostCount');
		var cursor = Number(Session.get('postCursor')) + Number(Session.get('postPerPage'));
		return (total <= cursor) ? "hide" : ""
	},

	pagination: function(){
		var pageTotal = Math.ceil(Counts.get('allPostCount') / Number(Session.get('postPerPage')));
		var arr = [];
		for(var i=1; i<=pageTotal; i++) {
		   arr.push({page: i});
		}
		return arr;
	},

	totalPosts: function(){
		return Counts.get('allPostCount');
	},

	activePrev: function(){
		return (Number(Session.get('postCursor')) == 0) ? "hide" : ""
	}


});

Template.home.events({
	'click .previous': function (event, template) {
		if(Number(Session.get('postCursor')) > (Number(Session.get('postPerPage')) - 1)){
			Session.set('postCursor', Number(Session.get('postCursor')) - Number(Session.get('postPerPage')));
		}
	},
	
	'click .next': function(event, template){
		Session.set('postCursor', Number(Session.get('postCursor')) + Number(Session.get('postPerPage')));
	},

	'click .gotoPage': function(event, template){
		Session.set('postCursor', Number(this.page) * Number(Session.get('postPerPage')) - Number(Session.get('postPerPage')) );
	},

	'keyup .searchBox': function(event, template) {
		var searchVar = event.currentTarget.value;
		Session.set('searchQuery', searchVar);
		console.log(Session.get('searchQuery'));
	},

	'submit .searchForm': function(event){
		event.preventDefault();
	}

});