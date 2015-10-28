Meteor.subscribe("imageList");
toastr.options = {"showDuration": "300"};


Template.createPost.rendered = function () {
	Session.setDefault('photoId', null);
	Session.set('selectedNav', 'postLists');
};

Template.createPost.events({
	'change .fileInput': function (event, template) {
		FS.Utility.eachFile(event, function(file) {
			var fileObj = new FS.File(file);
      Images.insert(file, function (err, fileObj) {
      	Session.set('photoId', fileObj._id);
      });
    });
	},

	'submit form': function(event, template){
		console.log("photoId", photoId);
		var photoId = Session.get('photoId');
		event.preventDefault();
		var post = {
			title: event.target.title.value,
			body: event.target.body.value
		}

		Meteor.call('savePost', post, photoId, function(error, result){
			toastr.success('Data Saved!', 'New article has been created.');
			Router.go('postLists')
		});
	}
});

Template.createPost.helpers({
	uploads: function () {
		var photoId = Session.get('photoId');
		return Images.find({_id: photoId});
	}
});


