Meteor.startup(function(){
	if (Posts.find().count() === 0){
		Posts.insert({title: 'This is just a test', body: 'This is the body'});
		Posts.insert({title: 'This is just a test', body: 'This is the body'});
		Posts.insert({title: 'This is just a test', body: 'This is the body'});
	}
});



Images.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  download: function(){
  	return true;
  }
});