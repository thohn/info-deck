(function (globals) {
  'use strict';
  new globals.Polymer('wc-choice', {
    isMultiple:false,
    removeElement: function (event, detail, sender) {
      var self = this;
      var parent = sender.parentNode;
      for (var i in self.options) {
        if (parent.getAttribute('data-index') === i) {
          self.options.splice(i, 1);
        }
      }
    },
    addOption: function () {
      var self = this;
      if (self.editMode) {
        self.options.push({ title: '' });
      }
    }
  });
}(this));
