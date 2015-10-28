Meteor.methods({
	'savePost': function(post, image){
		var currentUser = Meteor.userId();
		var data = {
			title: post.title,
			body: post.body,
			createdBy: currentUser,
			featuredImage: image,
			createdAt: Date.now(),
			userName: Meteor.user().username,
			updatedAt: Date.now()
		}
		if(!currentUser){
			throw new Meteor.error("You need to logged in first!");
		}
		Posts.insert(data);
	},

	'updatePost': function(post, image){
		var data = {};
		data.title = post.title;
		data.body = post.body;
		data.updatedAt = Date.now();
		if(image){
			data.featuredImage = image;
		}
		
		Posts.update(post.id, {
      $set: data
    });
	},

	'deletePost': function(id){
		Posts.remove(id);
	}
});