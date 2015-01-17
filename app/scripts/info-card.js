(function(globals) {
'use strict';
new globals.Polymer('info-card', {
  publish: {
    card: {
      value: {}
    }
  },
  editCard: function() {
    this.card.isEditing = !this.card.isEditing;
    var value = globals.Path.get('card.vars').getValueFrom(this);
    this.fire('varsExternallyUpdated', {vars: value});
    this.fire('renderGrid');
  },
  deleteCard: function() {
    this.fire('deleteCard', {card: this.card});
  },
  ready: function() {
    function handleDragStart(e) {
      e.target.style.opacity = '0.4';  // this / e.target is the source node.
      
      globals.dragSrcEl = e.target;

      e.dataTransfer.effectAllowed = 'move';
      var cardData = JSON.stringify(e.target.card);
      e.dataTransfer.setData('text', cardData);
    }

    function handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
      }

      e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

      return false;
    }

    function handleDragEnter(e) {
      // this / e.target is the current hover target.
      e.target.style.border = '2px dashed #000000';
    }

    function handleDragLeave(e) {
      e.target.style.border = 'none';
    }
    function handleDrop(e) {
      if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting.
      }

      // Don't do anything if dropping the same column we're dragging.
      if (globals.dragSrcEl !== e.target) {
        e.target.fire('movedCard', {newCard: globals.dragSrcEl.card, currentCard: e.target.card});
      }

      return false;
    }

    function handleDragEnd(e) {
      e.target.fire('finishedADrop');
    }
    this.addEventListener('dragstart', handleDragStart, false);
    this.addEventListener('dragenter', handleDragEnter, false);
    this.addEventListener('dragover', handleDragOver, false);
    this.addEventListener('dragleave', handleDragLeave, false);
    this.addEventListener('drop', handleDrop, false);
    this.addEventListener('dragend', handleDragEnd, false);
  }
});
}(this));
