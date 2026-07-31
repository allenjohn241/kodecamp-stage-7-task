const API_URL = "https://fakestoreapi.com/products";

function fetchProducts() {
    return fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            return response.json();
        })
        .catch(error => {
            console.error(error);
        });
}