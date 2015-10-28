Session.setDefault('myPostCursor', 0);
Session.setDefault('myPostPerPage', 6);

Template.postLists.onCreated(function () {
  var self = this;
  self.autorun(function () {
    Meteor.subscribe('myPosts', Session.get('myPostCursor'));
    Meteor.subscribe('myPostsCount');
  });
});


Template.postLists.rendered = function () {
	Session.set('selectedNav', 'postLists');
};

Template.postLists.helpers({
	myPosts: function () {
		return Posts.find({}, {sort: {createdAt: -1}});
	},
	renderImage: function(){
		return Images.findOne({_id: this.featuredImage});
	},

	activeNext: function(){
		var total = Counts.get('allMyPostCount');
		var cursor = Number(Session.get('myPostCursor')) + Number(Session.get('myPostPerPage'));
		return (total <= cursor) ? "hide" : ""
	},

	pagination: function(){
		var pageTotal = Math.ceil(Counts.get('allMyPostCount') / Number(Session.get('myPostPerPage')));
		var arr = [];
		for(var i=1; i<=pageTotal; i++) {
		   arr.push({page: i});
		}
		return arr;
	},

	totalPosts: function(){
		return Counts.get('allMyPostCount');
	},

	activePrev: function(){
		return (Number(Session.get('myPostCursor')) == 0) ? "hide" : ""
	}
	
});


Template.postLists.events({
	'click .previous': function (event, template) {
		if(Number(Session.get('myPostCursor')) > (Number(Session.get('myPostPerPage')) - 1)){
			Session.set('myPostCursor', Number(Session.get('myPostCursor')) - Number(Session.get('myPostPerPage')));
		}
	},
	
	'click .next': function(event, template){
		Session.set('myPostCursor', Number(Session.get('myPostCursor')) + Number(Session.get('myPostPerPage')));
	},

	'click .gotoPage': function(event, template){
		Session.set('myPostCursor', Number(this.page) * Number(Session.get('myPostPerPage')) - Number(Session.get('myPostPerPage')) );
	},

	'click .delete': function(event, template){
		console.log('removing', this._id);
		Meteor.call("deletePost", this._id);
	}
});
