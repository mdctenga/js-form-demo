var items = [];

window.onload = function() {
  var request = new XMLHttpRequest();
  request.onload = function() {
    items = this.response;
    appendItemList(items);
  };
  request.responseType = 'json';
  request.open('GET', 'http://localhost:3000/items', true);
  request.send();
};

function appendItemList(items) {
  if (!(items instanceof Array)) {
    items = [items];
  }
  items.forEach(function (item) {
    if (item.hasOwnProperty('description')){
      var paragraph = document.createElement('p');
      paragraph.innerHTML = item.description;
      document.body.appendChild(paragraph);
    }
  });
}

//========================================

var form = document.createElement('form');
form.method = "POST";
form.action = "http://localhost:3000/items";

form.onsubmit = function (event) {
  event.preventDefault(); // Stop what you're doing
  var itemValue = document.querySelector('input').value;
  submitItem({ description: itemValue });
};

function submitItem (item) {
  var request = new XMLHttpRequest();
  request.onload = function() {
    items = this.response;
    appendItemList(items);
  };
  request.responseType = 'json';
  request.open('POST', 'http://localhost:3000/items', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(item));
}

var fields = ['description'];

fields.forEach(function(name) {
  new InputField(name);
});

function InputField (name) {
  var input      = document.createElement('input');
      input.name = name;
  form.appendChild(input);
}

var button = document.createElement('button');

button.innerHTML = "Submit";
button.type = "submit";
document.body.appendChild(form);
form.appendChild(button);
