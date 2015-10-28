Meteor.publish('publicPosts', function(postCursor, searchQuery) {
	if(searchQuery !== ''){
		return Posts.find({ $or : [{ title : {'$regex':searchQuery}}, { body : {'$regex':searchQuery} }]},  {limit: 6, skip: postCursor, sort: { createdAt: -1 }});
	}else{
  	return Posts.find({}, {limit: 6, skip: postCursor, sort: { createdAt: -1 }});
	}
});

Meteor.publish('publicPostsCount', function(searchQuery) {
	if(searchQuery !== ''){
  	var postVar = Posts.find({ $or : [{ title : {'$regex':searchQuery}}, { body : {'$regex':searchQuery} }]} );
  	Counts.publish(this, 'allPostCount',  postVar);
  }else{
  	Counts.publish(this, 'allPostCount', Posts.find());
  }
});


Meteor.publish('imageList', function(){
	return Images.find();
});

Meteor.publish('allPosts', function(){
	return Posts.find();
});


Meteor.publish('myPosts', function(postCursor){
	if (this.userId){
		return Posts.find({createdBy: this.userId}, {limit: 6, skip: postCursor, sort: { createdAt: -1 }} );
	}else{
		return [];
	}
});

Meteor.publish('myPostsCount', function(postCursor) {
	if (this.userId){
		Counts.publish(this, 'allMyPostCount', Posts.find({'createdBy': this.userId}));
	}
});


