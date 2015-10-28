Template.editPost.rendered = function () {
	Session.set('selectedNav', 'postLists');
};

Template.editPost.onCreated(function () {
  var self = this;
  self.autorun(function () {
    Meteor.subscribe('myPosts', Session.get('myPostCursor'));
  });
});




Template.editPost.helpers({
	renderImage: function(){
		var photoId = Session.get('photoId');
		if (!photoId) {
			return Images.findOne({_id: this.featuredImage});
		}
	},
	uploads: function () {
		var photoId = Session.get('photoId');
		return Images.find({_id: photoId});
	}
	

});

Template.editPost.events({
	'change .fileInput': function (event, template) {
		FS.Utility.eachFile(event, function(file) {
			var fileObj = new FS.File(file);
      Images.insert(file, function (err, fileObj) {
      	Session.set('photoId', fileObj._id);
      });
    });
	},

	'submit form': function(event, template){
		event.preventDefault();
		var photoId = Session.get('photoId');
		var post = {
			id: event.target.postId.value,
			title: event.target.title.value,
			body: event.target.body.value
		}

		Meteor.call('updatePost', post, photoId, function(error, result){
			toastr.success('Updated!', 'Post data has been updated!');
			Router.go('postLists')
		});
	}
});
