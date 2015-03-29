(function(globals){
'use strict';
new globals.Polymer('card-list', {
  publish: {
    currentFilterText: '',
    handleFilterUpdate: function(updatedText) {
      this.currentFilterText = updatedText.toLowerCase();
      var cards = this.cardList.cards;
      for(var i = 0; i<cards.length; i++) {
        this.filterSearch(cards[i]);
      }
      this.renderGrid();
    },
    addCard: function() {
      var currentVars = {};
      var card = this.cardList.cards[0];
      if(card) {
        currentVars = card.vars;
      }
      this.cardList.cards.unshift({
        'text' : [],
        'title' : 'New Card',
        'containsFilter' : true,
        'vars' : currentVars,
        'isEditing' : true
      });
    },
    saveCards: function() {
      var data = JSON.stringify({'listName': this.listName,
        'cards':this.cards});
      console.log(data);
      if(data !== '[]'){
        var blob = new Blob([data], {type: 'text/plain;charset=utf-8'});
        globals.saveAs(blob, 'cards.json');
      }
    },
    uploadCards: function() {
        if (!this.$.service.$.file.files.length) {
          globals.alert('Please include a file');
          return;
        }
        this.$.service.$.ajax.go();
    },
    renderGrid: function() {
      this.async(function() {
        var allCards = this.shadowRoot.querySelectorAll('info-card');
        var cards = ([].slice.call(allCards)).filter(function (el) {
          return el.hidden === false;
        });
        var containerWidth = this.offsetWidth;
        var centeredLeft = 10;
        var gap = 10, newLeft = centeredLeft, newTop = 74;
				var cols;
				var tops;
				var card;
        if(cards[0]) {
          var cardWidth = cards[0].offsetWidth;
          var numberOfCards = cards.length;
          cols = Math.floor(containerWidth / (cards[0].offsetWidth + gap));
          if(numberOfCards >= cols) {
            centeredLeft = (containerWidth/2) - (((cardWidth*cols) + (gap*(cols-1)))/2);
          } else {
            centeredLeft = (containerWidth/2) - (((cardWidth*numberOfCards) + (gap*(numberOfCards-1)))/2);
          }
          tops = [];
          var topSize = cols;
          while(topSize--) {tops.push(newTop);}
          card = cards[0];
          newLeft = centeredLeft;
          cards[0].style.top = newTop+'px';
          cards[0].style.left = newLeft+'px';
        } else {
          cols = 0;
        }
        for(var i = 1; i < cards.length; i++) {
          var col = i % cols;
          if(col === 0) {
            card = cards[i-cols];
            tops[col] += card.offsetHeight + gap;
            newLeft = centeredLeft;
            newTop = tops[col];
            cards[i].style.top = newTop+'px';
            cards[i].style.left = newLeft+'px';
          } else {
            if(cards[i-cols]) {
              card = cards[i-cols];
              tops[col] += card.offsetHeight + gap;
              newTop = tops[col];
              cards[i].style.top = newTop+'px';
            }
            card = cards[i-1];
            newLeft += card.offsetWidth + gap;
            cards[i].style.top = newTop+'px';
            cards[i].style.left = newLeft+'px';
          }
        }
      });
    }
  },
  filterSearch: function(card) {
    if((this.checkValue(card.text)) || (this.checkValue(card.title)) || (this.currentFilterText === '')) {
      return this.changeContainsFilter(card, true);
    } else {
      return this.changeContainsFilter(card, false);
    }
  },
  checkValue: function(value) {
    return (this.contains(value, this.currentFilterText) > -1);
  },
  contains: function(str1, str2) {
    var val = JSON.stringify(str1);
    return val.toLowerCase().indexOf(str2);
  }, 
  changeContainsFilter: function(card, value) {
        card.containsFilter = value;
        return value;
  },
  ready: function () {
    var that = this;
    this.addEventListener('deleteCard', function(event) {
      this.cardList.cards = that.cardList.cards.filter(function (item) {
        return item.title !== event.detail.card.title;
      });
    });
    this.$.toggleHelpButton.addEventListener('click', function() {
      globals.helpDialog.shadowRoot.querySelector('paper-dialog').toggle();		
    });
    this.addEventListener('cardupdate', function(data) {
      this.handleFilterUpdate(data.detail.text);
    });
    
    window.addEventListener('resize', function() {
      that.renderGrid();
    });
    
    this.$.addCardButton.addEventListener('click', function() {
      that.addCard();
    });
    this.$.saveButton.addEventListener('click', function() {
      that.saveCards();
    });
    this.$.toggleCardListPanel.addEventListener('click', function() {
    	this.fire('togglePanel');
    });
    
    this.renderGrid();
  },
  created: function() {
    this.addEventListener('varsExternallyUpdated', function(event) {
      var newValue = event.detail.vars;
      var cards = this.shadowRoot.querySelectorAll('info-card');
      for(var i = 0; i<cards.length; i++) {
        cards[i].vars = newValue;
      }
    });
    this.addEventListener('renderGrid', this.renderGrid, false);
    this.addEventListener('finishedADrop', function() {
      var cards = this.shadowRoot.querySelectorAll('info-card');
      for(var i = 0; i<cards.length; i++) {
        cards[i].style.opacity = 1;
        cards[i].style.border = 'none';
      }
    });
    this.addEventListener('movedCard', function(event) {
      var movedCard = event.detail.newCard;
      var newPositionCard = event.detail.currentCard;
      var movedPostion = this.cardList.cards.indexOf(newPositionCard);
      var oldPostion = this.cardList.cards.indexOf(movedCard);
      var tempCards = this.cardList.cards;
      tempCards.splice(oldPostion, 1);
      tempCards.splice(movedPostion, 0, movedCard);
      this.cardList.cards = tempCards;
    });   
  }
});
}(this));
