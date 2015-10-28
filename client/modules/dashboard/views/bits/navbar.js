Template.dashNav.helpers({
	navs: function(){
		return [{name: 'dashboard', label: 'Dashboard'},{name: 'postLists', label: 'Articles'}];
	},
	selectedClass: function () {
		var navName = this.name;
    var selectedNav = Session.get('selectedNav');
    if(navName === selectedNav){
      return "active";
    }else{
      return "";
    }
	}
});

// Template.dashNav.events({
// 	'click .port': function (event, template) {
// 		Session.set('selectedNav', event.currentTarget.id);
// 	}
// });