(function(document) {
  'use strict';
  

  
  document.addEventListener('polymer-ready', function() {
    var list = document.querySelector('card-list');
    var addButton = document.querySelector('#addCardButton');
    var helpButton = document.querySelector('#toggleHelpButton');
    var saveButton = document.querySelector('#saveButton');
    var helpDialog = document.querySelector('#helpDialog');
    
    helpButton.addEventListener('click', function() {
      helpDialog.shadowRoot.querySelector('paper-dialog').toggle();		
    });
    document.addEventListener('cardupdate', function(data) {
      console.log('Caught a filter update. It is set to: ' + data.detail.text);
      list.handleFilterUpdate(data.detail.text);
    });
    
    addButton.addEventListener('click', function() {
      list.addCard();
    });
    
    saveButton.addEventListener('click', function() {
      list.saveCards();
    });
    
    window.addEventListener('resize', function() {
      list.renderGrid();
    });
    
    list.renderGrid();
  });
  
  
  
// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
