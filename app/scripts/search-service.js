(function(globals){
'use strict';

function setCards(that) {
  return function(e) {
  	var listObject = JSON.parse(e.target.result);
  	that.listName = listObject.listName;
    that.cards = (listObject.cards).slice(0);
  };
}

new globals.Polymer('search-service', {
created: function() {
  this.listName = 'New List';
  this.cards = [];
},
setFiles: function(e, detail, sender) {
  //var formData = new globals.FormData();
  var i=0;
  var f = null;
  for (f = sender.files[i]; i < sender.files.length; ++i) {
      var reader = new globals.FileReader();
      var that = this;
      reader.onload = setCards(that);

      reader.readAsText(f);
  }
},
cardsChanged: function() {
  this.fire('renderGrid');
  if(this.cards[0]) {
  	this.fire('varsExternallyUpdated', {vars: this.cards[0].vars});
  }
}
});
}(this));
