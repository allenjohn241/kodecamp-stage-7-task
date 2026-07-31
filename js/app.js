const productContainer = document.getElementById("products");
const search = document.getElementById("search");

let allProducts = [];

function displayProducts() {
  fetchProducts()
    .then((products) => {
      allProducts = products;

      renderProducts(allProducts);

      updateCart();
    })

    .catch((error) => {
      console.error(error);

      productContainer.innerHTML = "<h2>Unable to load products.</h2>";
    });
}

displayProducts();

function renderProducts(products) {
  productContainer.innerHTML = "";

  products.slice(0, 12).forEach((product) => {
    productContainer.innerHTML += `

        <div class="card">

            <a href="product.html?id=${product.id}">
                <img src="${product.image}" alt="${product.title}">
            </a>

            <div class="card-body">

                <h3>${product.title}</h3>

                <div class="price">$${product.price}</div>

                <button onclick="addToCartFromList(${product.id})">
                  Add to Cart
                </button>

            </div>

        </div>

        `;
  });
}

function addToCartFromList(id) {
  const product = allProducts.find((p) => p.id === id);

  addToCart(product);
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const item = cart.find((p) => p.id === product.id);

  if (item) {
    item.quantity++;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCart();
}

function updateCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let count = 0;

  cart.forEach((item) => {
    count += item.quantity;
  });

  document.getElementById("cartCount").textContent = count;
}

search.addEventListener("keyup", () => {
  const value = search.value.toLowerCase();

  const filtered = allProducts.filter((product) =>
    product.title.toLowerCase().includes(value),
  );

  renderProducts(filtered);
});

displayProducts();

updateCart();

function addToCartFromList(id) {
  const product = allProducts.find((p) => p.id === id);

  addToCart(product);
}
