Polymer('info-card', {
  publish: {
    card: {
      value: {}
    }
  },
  editCard: function(event, detail, sender) {
    this.card.isEditing = !this.card.isEditing;
    var value = Path.get('card.vars').getValueFrom(this);
    this.fire('varsExternallyUpdated', {vars: value});
    this.fire('renderGrid');
  },
  deleteCard: function(event, detail, sender) {
    this.fire("deleteCard", {card: this.card});
  },
  ready: function() {
    function handleDragStart(e) {
      this.style.opacity = '0.4';  // this / e.target is the source node.
      
      dragSrcEl = this;

      e.dataTransfer.effectAllowed = 'move';
      var cardData = JSON.stringify(this.card);
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
      this.style.border = "2px dashed #000000";
    }

    function handleDragLeave(e) {
      this.style.border = "none";
    }
    function handleDrop(e) {
      if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting.
      }

      // Don't do anything if dropping the same column we're dragging.
      if (dragSrcEl != this) {
        //dragSrcEl.card = this.card;
        //var otherCard = JSON.parse(e.dataTransfer.getData("text"));
        this.fire('movedCard', {newCard: dragSrcEl.card, currentCard: this.card});
        /*this.card = otherCard;
        var value = Path.get('card.vars').getValueFrom(this);
        this.fire('varsExternallyUpdated', {vars: value});*/
      }

      return false;
    }

    function handleDragEnd(e) {
      this.fire("finishedADrop");
    }
    this.addEventListener('dragstart', handleDragStart, false);
    this.addEventListener('dragenter', handleDragEnter, false);
    this.addEventListener('dragover', handleDragOver, false);
    this.addEventListener('dragleave', handleDragLeave, false);
    this.addEventListener('drop', handleDrop, false);
    this.addEventListener('dragend', handleDragEnd, false);
  }
});
