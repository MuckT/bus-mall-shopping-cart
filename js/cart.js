/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// DONE: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  let cartTable = document.querySelector('#cart tbody');
  while (cartTable.lastChild) {
    cartTable.removeChild(cartTable.lastChild);
  }
}

// DONE: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  // DONE: Find the table body
  let cartTable = document.querySelector('#cart tbody');
  // DONE: Iterate over the items in the cart
  cart.items.forEach(item => {
    // DONE: Create a TR
    // DONE: Create a TD for the delete link, quantity,  and the item
    let newTr = document.createElement('tr');
    let newButton = document.createElement('button');
    let newTd = document.createElement('td');
    let newTdTwo = document.createElement('td');

    // Add Values
    newTd.textContent = item.quantity;
    newTdTwo.textContent = item.product;
    newButton.textContent = 'X';

    // DONE: Add the TR to the TBODY and each of the TD's to the TR
    // Append To Row
    newTr.append(newButton);
    newTr.append(newTd);
    newTr.append(newTdTwo);

    // Append to Table
    cartTable.append(newTr);
  });
}

function removeItemFromCart(event) {
  // DONE: When a delete link is clicked, use cart.removeItem to remove the correct item
  if(event.target.nodeName === 'BUTTON') {
    let targetRow = event.target.parentNode;
    let targetDelete = targetRow.querySelector('td:last-of-type').innerText;
    cart.removeItem(targetDelete);

    // DONE: Save the cart back to local storage
    cart.saveToLocalStorage();

    // DONE: Re-draw the cart table
    renderCart();
  }
}

// This will initialize the page and draw the cart on screen
renderCart();
