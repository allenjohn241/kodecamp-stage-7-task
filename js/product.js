const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

if (!productId) {
  alert("No product selected.");
  window.location.href = "index.html";
}
const API = "https://api.escuelajs.co/api/v1/products";

let currentProduct;

console.log(window.location.href);
console.log(productId);

function loadProduct() {
  fetch(`${API}/${productId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Product not found.");
      }

      return response.json();
    })

    .then((product) => {
      currentProduct = product;

      document.getElementById("mainImage").src = product.image;
      document.getElementById("title").textContent = product.title;
      document.getElementById("price").textContent = "$" + product.price;
      document.getElementById("description").textContent = product.description;
      document.getElementById("category").textContent =
        "Category: " + product.category;

      const thumbs = document.getElementById("thumbnails");
      thumbs.innerHTML = "";

      const thumbs = document.getElementById("thumbnails");

      thumbs.innerHTML = `

<img src="${product.image}">

`;

      document.getElementById("cartBtn").onclick = () => {
        addToCart(product);
      };

      loadRelated(product.category.id);

      updateCart();
    })

    .catch((error) => {
      console.error(error);

      alert("Unable to load product.");

      window.location.href = "shop.html";
    });
}

loadProduct();

function loadRelated(category) {
  fetch(API)
    .then((response) => response.json())

    .then((products) => {
      const related = products
        .filter((item) => item.category === category && item.id != productId)
        .slice(0, 4);

      const container = document.getElementById("relatedProducts");

      container.innerHTML = "";

      related.forEach((product) => {
        container.innerHTML += `

                <div class="card">

                    <a href="product.html?id=${product.id}">

                        <img src="${product.image}">

                    </a>

                    <div class="card-body">

                        <h3>${product.title}</h3>

                        <div class="price">$${product.price}</div>

                    </div>

                </div>

                `;
      });
    })

    .catch((error) => console.error(error));
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const exists = cart.find((item) => item.id === product.id);

  if (exists) {
    exists.quantity++;
  } else {
    cart.push({
      id: product.id,

      title: product.title,

      price: product.price,

      image: product.images,

      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCart();

  alert("Added to cart!");
}

function updateCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let total = 0;

  cart.forEach((item) => {
    total += item.quantity;
  });

  document.getElementById("cartCount").textContent = total;
}

loadProduct();
