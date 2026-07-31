const cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

cart.forEach(item => {
    total += item.quantity;
});

document.getElementById("cartCount").textContent = total;