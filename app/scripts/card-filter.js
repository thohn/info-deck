(function(globals){
'use strict';
new globals.Polymer('card-filter', {
  publish: {
    filterText: ''
  },
  filterTextChanged:  function(oldValue, newValue) {
    if(oldValue !== newValue) {
      this.fire('cardupdate', {text: newValue});
    }
  }
});
}(this));
