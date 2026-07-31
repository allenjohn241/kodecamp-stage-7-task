const cart = JSON.parse(localStorage.getItem("cart")) || [];

const orderItems = document.getElementById("orderItems");

const totalElement = document.getElementById("grandTotal");

const cartCount = document.getElementById("cartCount");

let total = 0;

// Display order summary
function renderOrder() {
  orderItems.innerHTML = "";

  total = 0;

  let count = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    count += item.quantity;

    orderItems.innerHTML += `

        <div class="order-item">

            <span>${item.title} x ${item.quantity}</span>

            <span>$${(item.price * item.quantity).toFixed(2)}</span>

        </div>

        `;
  });

  totalElement.textContent = "$" + total.toFixed(2);

  cartCount.textContent = count;
}

renderOrder();

// Same as billing
const sameAddress = document.getElementById("sameAddress");

const shippingAddress = document.getElementById("shippingAddress");

sameAddress.addEventListener("change", () => {
  if (sameAddress.checked) {
    shippingAddress.value = document.querySelector("textarea").value;

    shippingAddress.disabled = true;
  } else {
    shippingAddress.disabled = false;

    shippingAddress.value = "";
  }
});

// Submit order
document
  .getElementById("checkoutForm")

  .addEventListener("submit", function (e) {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");

      return;
    }

    alert("🎉 Order placed successfully!");

    localStorage.removeItem("cart");

    window.location.href = "index.html";
  });
