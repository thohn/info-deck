(function(globals) {
'use strict';
new globals.Polymer('info-card', {
  publish: {
    card: {
      value: {}
    },
    options: {}
  },
  editCard: function() {
    this.card.isEditing = !this.card.isEditing;
    this.card.renderedText = '<div class="markdown-body">' + globals.marked(this.card.text, this.options) + '</div>';
    var value = globals.Path.get('card.vars').getValueFrom(this);
    this.fire('varsExternallyUpdated', {vars: value});
    this.fire('renderGrid');
  },
  deleteCard: function() {
    this.fire('deleteCard', {card: this.card});
  },
  created: function() {
  	this.options = {
			renderer: new globals.marked.Renderer(),
			gfm: true,
			tables: true,
			breaks: true,
			pedantic: true,
			sanitize: false,
			smartLists: true,
			smartypants: true,
			highlight: function (code) {
				return globals.hljs.highlightAuto(code).value;
			}						
		};
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
      e.target.style.border = '5px solid #23BDED';
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
		
		globals.PolymerExpressions.prototype.assignTo = function(val, variableName) {
			this.vars[variableName] = val;
			return val;
		};
		globals.PolymerExpressions.prototype.zeroIfNegative = function(val) {
			return Math.max(0, val) || 0;
		};
		
		globals.PolymerExpressions.prototype.floor = function (val, precision) {
			precision = precision || 0;
			var factor = Math.pow(10, precision);
			var rounder = Math.floor;

			return rounder(val * factor) / factor;
		};
		globals.PolymerExpressions.prototype.ceil = function (val, precision) {
			precision = precision || 0;
			var factor = Math.pow(10, precision);
			var rounder = Math.ceil;

			return rounder(val * factor) / factor;
		};
  }
});
}(this));
