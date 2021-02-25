/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart(JSON.parse(localStorage.getItem('cart')) || []);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {
  //DONE: Add an <option> tag inside the form's select for each product
  let selectElement = document.getElementById('items');
  for (let i in Product.allProducts) {
    let option = document.createElement('option');
    option.textContent = Product.allProducts[i].name;
    option.setAttribute('value', Product.allProducts[i].name);
    selectElement.appendChild(option);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  // DONE: Prevent the page from reloading
  event.preventDefault();
  if (this.quantity.value < 1) {
    alert('Cannot Submit Negative Values\nPlease Click the \'X\' In Cart To Remove Items');
  } else {
    addSelectedItemToCart();
    cart.saveToLocalStorage();
    updateCounter();
    updateCartPreview();
  }
}

// DONE: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // DONE: suss out the item picked from the select list
  let item = document.getElementById('items').value;
  // DONE: get the quantity
  let quantity = +document.getElementById('quantity').value;
  // DONE: using those, add one item to the Cart
  cart.addItem(item, quantity);
}

// DONE: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  let count = 0;
  cart.items.forEach(item => {
    count += item.quantity;
  });
  document.querySelector('#itemCount').textContent = `:  ${count}`;
}

// DONE: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  let cartPreview = document.querySelector('#cartContents');
  while (cartPreview.lastChild) {
    cartPreview.removeChild(cartPreview.lastChild);
  }
  // Create Table TODO Refactor
  // DONE?: Get the item and quantity from the form - What Does this mean?
  // DONE: Add a new element to the cartContents div with that information
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let newTr = document.createElement('tr');
  let newTd = document.createElement('td');
  let newTdTwo = document.createElement('td');
  newTd.innerText = 'Items';
  newTdTwo.innerText = 'Quantity';
  newTr.append(newTd);
  newTr.append(newTdTwo);
  thead.append(newTr);
  table.append(thead);
  var newTableBody = document.createElement('tbody');
  cart.items.forEach(item => {
    let newTr = document.createElement('tr');
    let newTd = document.createElement('td');
    let newTdTwo = document.createElement('td');
    newTd.innerText = `${item.product}`;
    newTdTwo.innerText = `${item.quantity}`;
    newTr.append(newTd);
    newTr.append(newTdTwo);
    newTableBody.append(newTr);
  });
  table.append(newTableBody);
  cartPreview.append(table);
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
updateCounter();
updateCartPreview();
