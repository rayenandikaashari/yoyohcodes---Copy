// Product data
const products = [
    { id: 1, name: 'Minyakita', price: 36000, category: 'Minyak', image: '/images/minyak.png',
    description:'Minyakita adalah minyak goreng kemasan bersubsidi yang jernih, sehat, terjangkau, dan cocok digunakan untuk menggoreng maupun menumis kebutuhan masakan sehari-hari.'},
    { id: 2, name: 'Beras', price: 15000, category: 'Beras', image: '/images/Beras.png',
    description: 'Beras 5 kg adalah bahan pangan pokok yang bergizi, pulen, wangi, dan mudah dimasak untuk memenuhi kebutuhan konsumsi rumah tangga sehari-hari.'},
    { id: 3, name: 'Gas LPG 3kg', price: 20000, category: 'Gas', image: '/images/gas.png', 
    description: 'Gas LPG 3 kg adalah bahan bakar memasak bersubsidi yang ringan, praktis, hemat, dan mudah digunakan untuk kebutuhan rumah tangga sehari-hari.' },
    { id: 4, name: 'Indomie', price: 3500, category: 'Mie', image: '/images/Indomie.png' },
    { id: 5, name: 'Mie Sedaap', price: 3000, category: 'Mie', image: '/images/mieSedaap.png'},
    { id: 6, name: 'Supermie', price: 3000, category: 'Mie', image: '/images/supermi.png' },
    { id: 7, name: 'Pop Mie', price: 6000, category: 'Mie', image: '/images/popmie.png' },
    { id: 8, name: 'Sunlight', price: 5000, category: 'Sabun', image: '/images/Sunlight.png' }
];

// Function to save product data to localStorage when a product is clicked
function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    
    if (product) {
        localStorage.setItem('currentProduct', JSON.stringify(product));
        window.location.href = 'detail.html';
    }
}

// Function to load products
function loadProducts(category = 'all') {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">Rp${product.price.toLocaleString()}</div>
            <button class="add-button" onclick="viewProduct(${product.id})">+</button>
        `;
        productGrid.appendChild(productElement);
    });
}

// Function to search products
function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    
    if (query === '') {
        loadProducts();
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query)
    );
    
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">Rp${product.price.toLocaleString()}</div>
            <button class="add-button" onclick="viewProduct(${product.id})">+</button>
        `;
        productGrid.appendChild(productElement);
    });
}

// Function to filter products by category
function filterByCategory(category) {
    loadProducts(category);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
});