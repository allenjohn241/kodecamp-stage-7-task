const productContainer = document.getElementById("products");
const search = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");

const params = new URLSearchParams(window.location.search);
const selectedCategory = params.get("category");

let allProducts = [];

// Load all products
function loadProducts() {
  fetchProducts()
    .then((products) => {
      allProducts = products;

      loadCategories();

      if (selectedCategory) {
        categoryFilter.value = selectedCategory;

        const filtered = allProducts.filter(
          (product) =>
            product.category.toLowerCase() ===
            selectedCategory.toLowerCase(),
        );

        renderProducts(filtered);
      } else {
        renderProducts(allProducts);
      }

      updateCart();
    })

    .catch((error) => {
      console.error(error);

      productContainer.innerHTML = "<h2>Unable to load products.</h2>";
    });
}

loadProducts();

// Display products
function renderProducts(products) {
  productContainer.innerHTML = "";

  if (products.length === 0) {
    productContainer.innerHTML = "<h2>No products found.</h2>";

    return;
  }

  products.forEach((product) => {
    productContainer.innerHTML += `

        <div class="card">

            <a href="product.html?id=${product.id}">
                <img src="${product.image}" alt="${product.title}">
            </a>

            <div class="card-body">

                <h3>${product.title}</h3>

                <div class="price">$${product.price}</div>

                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>

        </div>

        `;
  });
}

// Populate category dropdown
function loadCategories() {
  const categories = [
    ...new Set(allProducts.map((product) => product.category)),
  ];

  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  categories.forEach((category) => {
    categoryFilter.innerHTML += `

            <option value="${category}">
                ${category}
            </option>

        `;
  });
}

// Category filter
categoryFilter.addEventListener("change", () => {
  const selected = categoryFilter.value;

  if (selected === "all") {
    renderProducts(allProducts);

    return;
  }

  const filtered = allProducts.filter(
    (product) => product.category === selected,
  );

  renderProducts(filtered);
});

// Search
search.addEventListener("keyup", () => {
  const keyword = search.value.toLowerCase();

  const filtered = allProducts.filter((product) =>
    product.title.toLowerCase().includes(keyword),
  );

  renderProducts(filtered);
});

// Add to cart
function addToCart(id) {
  const product = allProducts.find((item) => item.id === id);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity++;
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

  alert("Product added to cart!");
}

// Update cart badge
function updateCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let totalItems = 0;

  cart.forEach((item) => {
    totalItems += item.quantity;
  });

  document.getElementById("cartCount").textContent = totalItems;
}

loadProducts();
