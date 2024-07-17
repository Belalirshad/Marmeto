// Event listener for tab clicks
document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab");
    const productContainer = document.getElementById("product-container");
  
    // Function to fetch and display products
    const fetchProducts = async (category) => {
      try {
        const response = await fetch(
          "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
        );
        const data = await response.json();
        // console.log(data);
  
        // Check if the products array exists in the response data
        if (!data.categories) {
          throw new Error("Products data is missing");
        }
  
        // Clear previous products
        productContainer.innerHTML = "";
  
        // Filter products based on category
        const filteredProducts = data.categories.filter((product) => {
          return product.category_name === category;
        });
  
        // Append products to container
        filteredProducts.forEach((product) => {
          // console.log(product);
          const data = product.category_products;
  
          data.forEach((product) => {
            const discount =
              ((Number(product.compare_at_price) - Number(product.price)) /
                Number(product.compare_at_price)) *
              100;
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                      <div class="product-container">
                      ${
                        product.badge_text
                          ? `<div class="badge">${product.badge_text}</div>`
                          : ""
                      }
                      <img src="${product.image}" alt="${product.title}">
                      </div>
                      <div class="parent">
                      <h3>${product.title.substring(0, 10)}</h3>
                      <li>${product.vendor}</li>
                      </div>
                      <p>Rs ${
                        product.price
                      }.00 <span style="text-decoration: line-through; color:#8F8F8F">${
              product.compare_at_price
            }</span>
            <span style="color:#FF3737"> ${discount.toFixed(0)}% off</span></p>
                      <button class="add-to-cart">Add to Cart</button>
                  `;
            productContainer.appendChild(productCard);
          });
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    // Initial fetch for Men category
    fetchProducts("Men");
  
    // Tab click event
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs
        tabs.forEach((t) => t.classList.remove("active"));
        // Add active class to clicked tab
        tab.classList.add("active");
        // Fetch and display products for the selected category
        fetchProducts(tab.dataset.category);
      });
    });
  });
  