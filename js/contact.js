const cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

cart.forEach((item) => {
  total += item.quantity;
});

document.getElementById("cartCount").textContent = total;

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  alert("Thank you! Your message has been sent successfully.");

  this.reset();
});
