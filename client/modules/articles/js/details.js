Template.articleDetails.onCreated(function () {
  var self = this;
  self.autorun(function () {
    Meteor.subscribe("allPosts");
  });
});

// Tracker.autorun(function () {
//   Meteor.subscribe("publicPosts", Session.get('postCursor'));
// });

Template.articleDetails.helpers({
	
	renderImage: function(){
		return Images.findOne({_id: this.featuredImage});
	}


});
