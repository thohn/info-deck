(function (globals) {
  'use strict';
  new globals.Polymer('wc-form', {
    formTitle: '',
    elements: [],
    editMode:true,
    removeElement: function (event, detail, sender) {
      var self = this;
      var parent = sender.parentNode;
      for (var i in self.elements) {
        if (parent.getAttribute('data-index') === i) {
          self.elements.splice(i,1);
        }
      }
    },
    publish: {
      elements: []
    },
    ready: function () {}
  });
}(this));
