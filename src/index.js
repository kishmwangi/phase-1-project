document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('productList');
    const searchInput = document.getElementById('searchInput');
  
    // Fetch data from API
    async function fetchData() {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    // Display products
    async function displayProducts() {
      const products = await fetchData();
      productList.innerHTML = '';
      products.forEach(product => {
        const productCard = createProductCard(product);
        productList.appendChild(productCard);
      });
    }
// Create product card HTML
function createProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('product');

  const imgWrapper = document.createElement('div');
  imgWrapper.classList.add('img-wrapper');
  const img = document.createElement('img'); 

  // Ensure the image URL is absolute
  const imageUrl = new URL(product.image, 'https://api.escuelajs.co/api/v1/products').href;
  img.setAttribute('src', imageUrl);
  img.setAttribute('alt', product.title); 

  imgWrapper.appendChild(img);
  card.appendChild(imgWrapper);

  const title = document.createElement('h3');
  title.textContent = product.title;
  card.appendChild(title);

  const price = document.createElement('p');
  price.textContent = `Price: $${product.price}`;
  card.appendChild(price);

  const inventory = document.createElement('p');
inventory.textContent = `Inventory: ${product.inventory}`;
card.appendChild(inventory);

  const addToCartBtn = document.createElement('button');
  addToCartBtn.textContent = 'Add to Cart';
  addToCartBtn.classList.add('add-to-cart');
  addToCartBtn.addEventListener('click', () => addToCart(product));
  card.appendChild(addToCartBtn);

  return card;
}
    // Add product to cart
    function addToCart(product) {
      // Implement cart logic here
      console.log('Product added to cart:', product);
      alert('Product added to cart: ' + product.title);
    }
  
    // Search products
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const products = document.querySelectorAll('.product');
  
      products.forEach(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      });
    });
  
    // Initialize the page
    displayProducts();
  });