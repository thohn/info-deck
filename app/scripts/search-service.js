(function(globals){
'use strict';

function setCards(that) {
  return function(e) {
    that.cards = (JSON.parse(e.target.result)).slice(0);
    that.fire('varsExternallyUpdated', {vars: that.cards[0].vars});
  };
}

new globals.Polymer('search-service', {
created: function() {
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
}
});
}(this));
