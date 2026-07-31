const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (!productId) {
    alert("No product selected.");
    window.location.href = "shop.html";
}

const API = "https://fakestoreapi.com/products";

let currentProduct;

// Load Product
function loadProduct() {

    fetch(`${API}/${productId}`)

        .then(response => {

            if (!response.ok) {
                throw new Error("Product not found.");
            }

            return response.json();

        })

        .then(product => {

            currentProduct = product;

            document.getElementById("mainImage").src = product.image;
            document.getElementById("title").textContent = product.title;
            document.getElementById("price").textContent = `$${product.price}`;
            document.getElementById("description").textContent = product.description;
            document.getElementById("category").textContent = `Category: ${product.category}`;

            // Optional Rating
            const rating = document.getElementById("rating");
            if (rating) {
                rating.textContent =
                    `⭐ ${product.rating.rate} (${product.rating.count} Reviews)`;
            }

            // Thumbnail
            const thumbs = document.getElementById("thumbnails");

            thumbs.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
            `;

            // Add to Cart Button
            document.getElementById("cartBtn").onclick = function () {
                addToCart(product);
            };

            loadRelated(product.category);

            updateCart();

        })

        .catch(error => {

            console.error(error);

            alert("Unable to load product.");

            window.location.href = "shop.html";

        });

}

// Load Related Products
function loadRelated(category) {

    fetch(API)

        .then(response => response.json())

        .then(products => {

            const related = products
                .filter(item =>
                    item.category === category &&
                    item.id != productId
                )
                .slice(0, 4);

            const container = document.getElementById("relatedProducts");

            container.innerHTML = "";

            related.forEach(product => {

                container.innerHTML += `

                <div class="card">

                    <a href="product.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.title}">
                    </a>

                    <div class="card-body">

                        <h3>${product.title}</h3>

                        <div class="price">$${product.price}</div>

                    </div>

                </div>

                `;

            });

        })

        .catch(error => console.error(error));

}

// Add Product to Cart
function addToCart(product) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === product.id);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1

        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();

    alert("Added to cart!");

}

// Update Cart Count
function updateCart() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item => {

        total += item.quantity;

    });

    document.getElementById("cartCount").textContent = total;

}

// Start
loadProduct();