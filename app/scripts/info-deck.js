(function(globals) {
  'use strict';
  
  new globals.Polymer('info-deck', {
		publish: {
		  lists: [{'listName': 'New List', 'cards': []}],
			addList: function() {
				var newList = {'listName': 'New List', 'cards': []};
				this.lists.push(newList);
			},
			deleteList: function(event, detail, target) {
				var index = target.attributes['data-index'].value;
				this.lists.splice(index, 1);
			}
		},
		ready: function() {
			var that = this;
			this.addEventListener('togglePanel', function() {
				this.$.drawerPanel.togglePanel();
			});
			this.$.addList.addEventListener('click', function() {
				that.addList();
			});
		}
  });
}(this));
