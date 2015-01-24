(function (globals) {
  'use strict';
  new globals.Polymer('wc-edit-field', {
    text: '',
    editMode: false,
    editModeChanged: function () {
      var self = this;
      self.updateEvents();
    },
    textChanged: function () {
      var self = this;
      self.updateEvents();
    },
    showInputClick: function () {
      var self = this;
      self.enableEdit();
      self.$.editInput.style.display = 'block';
      self.$.editInput.focus();
      var len = self.$.editInput.value.length;
      if (len > 0) {
        self.$.editInput.size = (len);
      }
    },
    updateEvents: function () {
      var self = this;
      if (!self.editMode) {
        self.$.editMode.style.display = 'none';
        self.$.viewMode.style.display = 'block';
        return;
      }

      self.$.editMode.style.display = 'block';
      self.$.viewMode.style.display = 'none';

      if (self.text === '') {
        self.$.noInput.style.display = 'block';
      } else {
        self.$.noInput.style.display = 'none';
      }
      
      self.shadowRoot.querySelector('#showInput').onmouseover = function () {
        self.$.editIcon.style.display = 'block';
      };
      self.shadowRoot.querySelector('#showInput').onmouseout = function () {
        self.$.editIcon.style.display = 'none';
      };
    },
    ready: function () {
      var self = this;
      self.updateEvents();
    },
    disableEdit: function () {
      var self = this;
      self.$.editInput.style.display = 'none';
      self.$.showInput.style.display = 'block';
    },
    enableEdit: function () {
      var self = this;
      self.$.editInput.style.display = 'block';
      self.$.showInput.style.display = 'none';

      self.$.editInput.onkeyup = function (key) {
        if (key.keyCode === 13) {
          self.disableEdit();
          return;
        }
        var len = self.$.editInput.value.length;
        if (len > 0) {
          self.$.editInput.size = (len);
        }
      };
      self.$.editInput.onblur = function () {
        self.text = self.$.editInput.value;
        self.disableEdit();
      };
    }
  });
}(this));
