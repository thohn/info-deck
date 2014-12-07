(function(document) {
  'use strict';

  var appCache = window.applicationCache;
  appCache.addEventListener('error', function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  });
  
  appCache.addEventListener('obsolete', function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  });

  appCache.addEventListener('checking', function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  });
  
  var list = document.querySelector('card-list');
  var addButton = document.querySelector('#addCardButton');
  var helpButton = document.querySelector('#toggleHelpButton');
  var saveButton = document.querySelector('#saveButton');
  var helpDialog = document.querySelector('#helpDialog');
  
  document.addEventListener('polymer-ready', function() {
    console.log('Polymer is ready to rock!');
    list.renderGrid();
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
  
  helpButton.addEventListener('click', function() {
    helpDialog.toggle();
  });
  
  window.addEventListener('resize', function() {
    list.renderGrid();
  });
// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
