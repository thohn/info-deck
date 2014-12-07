Polymer('search-service', {
created: function() {
  this.cards = [];
},
setFiles: function(e, detail, sender) {
  var formData = new FormData();

  for (var i = 0, f; f = sender.files[i]; ++i) {
      var reader = new FileReader();
      var that = this;
      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          that.cards = (JSON.parse(e.target.result)).slice(0);
          that.fire('varsExternallyUpdated', {vars: that.cards[0].vars});
        };
      })(f);

      reader.readAsText(f);
  }
},
cardsChanged: function() {
  this.fire('renderGrid');
}
});
