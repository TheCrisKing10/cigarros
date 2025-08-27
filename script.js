// Definición de los productos
const products = [
    { id: 101, name: "Benson Crystal Violet 20's", price: 76.00, piecesPerPackage: 10,  image: "benson-crystal-violet.webp" },
    { id: 102, name: "Camel Yellow 20's", price: 78.00, piecesPerPackage: 10,  image: "camel-yellow.webp" },
    //{ id: 103, name: "Faros 25's", price: 140.00, piecesPerPackage: 8,  image: "coca-cola 1.25l ret.webp" },
    { id: 104, name: "Link Azul 20's", price: 30.00, piecesPerPackage: 10,  image: "link-azul.webp" },
    { id: 105, name: "Link Negro 20's", price: 29.00, piecesPerPackage: 10,  image: "link-negro.webp" },
    { id: 106, name: "Link Rojo 20's", price: 29.00, piecesPerPackage: 10, image: "link-rojo.webp" },
    { id: 107, name: "Marlboro Rojo 20's", price: 80.00, piecesPerPackage: 10, image: "marlboro-rojo.webp" },
    { id: 108, name: "Marlboro Chester 25's", price: 73.00, piecesPerPackage: 8, image: "marlboro-chesterfield.webp" },
    { id: 109, name: "Marlboro Mentolado 20's", price: 80.00, piecesPerPackage: 10, image: "marlboro-mentolado.webp" },
    { id: 110, name: "Marlboro Clavo 20's", price: 83.00, piecesPerPackage: 10, image: "marlboro-clavo.webp" },
    { id: 111, name: "Marlboro Chicle 20's", price: 75.00, piecesPerPackage: 10, image: "marlboro-chicle.webp" },
    { id: 112, name: "Marlboro Guayaba 20's", price: 75.00, piecesPerPackage: 10, image: "marlboro-guayaba.webp" },
    //{ id: 113, name: "Marlboro Mora 20's", price: 75.00, piecesPerPackage: 10, image: "" },
    { id: 114, name: "Marlboro Sandía 20's", price: 75.00, piecesPerPackage: 10, image: "marlboro-sandia.webp" },
    { id: 115, name: "Marlboro Durazno 20's", price: 80.00, piecesPerPackage: 10, image: "marlboro-durazno.webp" },
    { id: 116, name: "Marlboro Ruby 20's", price: 80.00, piecesPerPackage: 10, image: "marlboro-ruby.webp" },
    //{ id: 117, name: "Montana con filtro 20's", price: 28.00, piecesPerPackage: 4, image: "" },
    //{ id: 118, name: "Montana sin filtro 25's", price: 35.00, piecesPerPackage: 4, image: "" },
    { id: 119, name: "Pall Mall Alaska 20's", price: 75.00, piecesPerPackage: 10, image: "pall mall-alaska.webp" },
    { id: 120, name: "Pall Mall Pepino 20's", price: 75.00, piecesPerPackage: 10, image: "pall mall-pepino.webp" },
    { id: 121, name: "Pall Mall Cereza 20's", price: 75.00, piecesPerPackage: 10, image: "pall mall-cereza.webp" },
    { id: 122, name: "Pall Mall Manzana 20's", price: 75.00, piecesPerPackage: 10, image: "pall mall-manzana.webp" },
    { id: 123, name: "Pall Mall Platano 20's", price: 75.00, piecesPerPackage: 10, image: "pall mall-platano.webp" },
    { id: 124, name: "Pall Mall Iceland 20's", price: 75.00, piecesPerPackage: 10, image: "pall mall-iceland.webp" },
    { id: 125, name: "Shots 14's", price: 34.00, piecesPerPackage: 10, image: "shots-14.webp" },
    { id: 126, name: "Shots 20's", price: 48.00, piecesPerPackage: 10, image: "shots-20.webp" },
    { id: 127, name: "Shots 25's", price: 55.00, piecesPerPackage: 8, image: "shots-25.webp" },
    { id: 128, name: "Encendedor Tokai", price: 120.00, piecesPerPackage: 1, image: "tokai.webp" },
];

let cart = [];

const productsContainer = document.getElementById('products');
const cartItemsContainer = document.getElementById('cart-items');
const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');
const searchInput = document.getElementById('search-input');
const checkoutBtn = document.getElementById('checkout-btn');

// Función para formatear números con separador de miles y dos decimales
function formatPrice(number) {
    return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    renderCart();
});

// Renderiza la lista de productos
function renderProducts(filteredProducts) {
    productsContainer.innerHTML = '';
    filteredProducts.forEach(product => {
        const cartItem = cart.find(item => item.id === product.id);
        const quantity = cartItem ? cartItem.quantity : 0;
        const pricePerPiece = product.price * product.piecesPerPackage;
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="imagenes/${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${formatPrice(product.price)}</p>
                ${product.piecesPerPackage > 1 ? `<p class="price-per-piece">$${formatPrice(pricePerPiece)} / paquete</p>` : ''}
                <div class="quantity-control-product" data-id="${product.id}">
                    <button class="quantity-btn decrease" data-id="${product.id}">-</button>
                    <span class="quantity" data-id="${product.id}">${quantity}</span>
                    <button class="quantity-btn increase" data-id="${product.id}">+</button>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Renderiza los items del carrito
function renderCart() {
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    // Ordena el carrito por ID de forma ascendente
    const sortedCart = cart.sort((a, b) => a.id - b.id);

    if (sortedCart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #666;">Tu carrito está vacío.</p>';
        subtotalElement.textContent = '$0,00';
        totalElement.textContent = '$0,00';
        return;
    }

    sortedCart.forEach(item => {
        const pricePerPiece = item.price / item.piecesPerPackage;
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="imagenes/${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <span class="cart-item-name">${item.name}</span>
                <p class="cart-item-price">$${formatPrice(item.price * item.quantity)}</p>
                ${item.piecesPerPackage > 1 ? `<p class="cart-item-per-piece">$${formatPrice(pricePerPiece)} / pieza</p>` : ''}
            </div>
            <div class="quantity-control">
                <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn increase" data-id="${item.id}">+</button>
            </div>
            <button class="remove-item-btn" data-id="${item.id}">X</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        subtotal += item.price * item.quantity;
    });

    // Actualiza los totales en tiempo real
    subtotalElement.textContent = `$${formatPrice(subtotal)}`;
    totalElement.textContent = `$${formatPrice(subtotal)}`;
}

// Lógica del carrito de compras
function handleCart(event) {
    const target = event.target;
    const id = parseInt(target.dataset.id);

    if (!id) return;

    const product = products.find(p => p.id === id);
    let cartItem = cart.find(item => item.id === id);

    if (target.classList.contains('increase')) {
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
    } else if (target.classList.contains('decrease')) {
        if (cartItem && cartItem.quantity > 1) {
            cartItem.quantity--;
        } else if (cartItem && cartItem.quantity === 1) {
            cart = cart.filter(item => item.id !== id);
        }
    } else if (target.classList.contains('remove-item-btn')) {
        cart = cart.filter(item => item.id !== id);
    }
    
    // Actualiza la visualización de ambos, productos y carrito
    renderProducts(products); 
    renderCart();
}

// Lógica del buscador
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    renderProducts(filtered);
}

// Lógica de generación y descarga del ticket
function generateTicket() {
    if (cart.length === 0) {
        alert("El carrito está vacío. Agrega productos para generar un ticket.");
        return;
    }

    const ticketContainer = document.createElement('div');
    ticketContainer.classList.add('ticket-style');
    ticketContainer.style.width = '350px'; /* 300px el predeterminado */
    ticketContainer.style.padding = '1rem';
    ticketContainer.style.fontFamily = 'monospace';
    ticketContainer.style.backgroundColor = '#fff';
    ticketContainer.style.color = '#000';
    ticketContainer.style.border = '2px dashed #000';
    ticketContainer.style.margin = '20px auto';
    ticketContainer.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';

    // Ordena el carrito por ID de forma ascendente para el ticket
    const sortedCartForTicket = cart.sort((a, b) => a.id - b.id);
    
    let ticketContent = `
        <h2 style="text-align: center; margin-bottom: 1rem; text-transform: uppercase; font-size: 1.2rem;">Cigarros "Jazmín"</h2>
        <p style="text-align: center; font-size: 0.8rem; margin-bottom: 1rem;">Ticket de Compra</p>
        <div style="border-top: 1px dashed #000; padding-top: 1rem;">
            ${sortedCartForTicket.map(item => `
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                    <img src="imagenes/${item.image}" alt="${item.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">
                    <div style="flex-grow: 1;">
                        <p style="font-weight: bold; margin: 0;">${item.name}</p>
                        <p style="margin: 0; font-size: 0.9rem;">Cantidad: ${item.quantity} x $${formatPrice(item.price)}</p>
                    </div>
                    <p style="font-weight: bold; margin: 0;">$${formatPrice(item.price * item.quantity)}</p>
                </div>
            `).join('')}
        </div>
        <div style="border-top: 1px dashed #000; margin-top: 1rem; padding-top: 1rem;">
            <p style="display: flex; justify-content: space-between; font-weight: bold;"><span>Subtotal:</span><span>${subtotalElement.textContent}</span></p>
            <p style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.2rem;"><span>Total:</span><span>${totalElement.textContent}</span></p>
        </div>
        <p style="text-align: center; margin-top: 1rem; font-size: 0.8rem;">¡Gracias por tu compra!</p>
    `;
    ticketContainer.innerHTML = ticketContent;
    document.body.appendChild(ticketContainer);

    html2canvas(ticketContainer, { scale: 2 }).then(canvas => {
        const image = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.href = image;
        link.download = 'ticket_de_compra.png';
        link.click();
        document.body.removeChild(ticketContainer);
    });
}

// Event Listeners
productsContainer.addEventListener('click', handleCart);
cartItemsContainer.addEventListener('click', handleCart);
searchInput.addEventListener('input', filterProducts);
checkoutBtn.addEventListener('click', generateTicket);