const container = document.getElementById("cartItems");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  container.innerHTML = "";

  let subtotal = 0;

  if (cart.length === 0) {
    container.innerHTML = "<h2>Your cart is empty.</h2>";

    document.getElementById("subtotal").textContent = "$0";
    document.getElementById("total").textContent = "$0";
    document.getElementById("cartCount").textContent = "0";

    return;
  }

  cart.forEach((item, index) => {
    subtotal += item.price * item.quantity;

    container.innerHTML += `

<div class="cart-item">

<img src="${item.image}">

<div class="item-info">

<h2>${item.title}</h2>

<h3>$${item.price}</h3>

<div class="quantity">

<button onclick="decrease(${index})">-</button>

<span>${item.quantity}</span>

<button onclick="increase(${index})">+</button>

</div>

<button class="remove"

onclick="removeItem(${index})">

Remove

</button>

</div>

</div>

`;
  });

  document.getElementById("subtotal").textContent = "$" + subtotal.toFixed(2);

  document.getElementById("total").textContent = "$" + subtotal.toFixed(2);

  updateCount();
}

function increase(index) {
  cart[index].quantity++;

  save();
}

function decrease(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }

  save();
}

function removeItem(index) {
  cart.splice(index, 1);

  save();
}

function save() {
  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
}

function updateCount() {
  let count = 0;

  cart.forEach((item) => {
    count += item.quantity;
  });

  document.getElementById("cartCount").textContent = count;
}

renderCart();
