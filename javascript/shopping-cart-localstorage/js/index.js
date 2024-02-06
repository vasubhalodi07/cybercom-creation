const LOCALSTORAGE = {
  productItem: "productItem",
  cartItem: "cartItem",
};

const quantityState = [
  { id: 1, quantity: 0 },
  { id: 2, quantity: 0 },
  { id: 3, quantity: 0 },
];
const fetchCarts =
  JSON.parse(localStorage.getItem(LOCALSTORAGE.cartItem)) || [];
const fetchProducts =
  JSON.parse(localStorage.getItem(LOCALSTORAGE.productItem)) || [];

if (fetchCarts && fetchCarts.length) {
  quantityState.forEach((item) => {
    const cartItem = fetchCarts.find((cart) => cart.id === item.id);
    if (cartItem) {
      item.quantity = cartItem.quantity;
    }
  });
}

var total = 0;
const products = document.getElementById("products");
const checkout = document.getElementById("checkout");

loadProducts();
function loadProducts() {
  total = 0;
  products.innerHTML = "";

  if (!fetchProducts.length) {
    console.log("product not found!");
    return;
  }

  fetchProducts.forEach((product) => {
    const value = quantityState.find((item) => item.id === product.id);
    total += product.price * value.quantity;

    const productsDiv = document.createElement("div");
    productsDiv.className = "products";
    productsDiv.innerHTML = `
        <div class="product-details">
            <div>
            <img
                src="${product.image}"
                alt="product-image"
            />
            </div>
            <div class="product-content">
                <div>${product.name}</div>
                <div>$${product.price}</div>
            </div>
        </div>
        <div class="quantity">
            <div class="quantity-event" onclick='decQuantity(${product.id})'>-</div>
            <div>${value.quantity}</div>
            <div class="quantity-event" onclick='incQuantity(${product.id})'>+</div>
        </div>
    `;

    products.appendChild(productsDiv);
  });
}

function incQuantity(id) {
  quantityState.find((item) => item.id === id).quantity += 1;
  loadProducts();
  loadCheckout();
}

function decQuantity(id) {
  quantityState.find((item) => item.id === id).quantity > 0
    ? (quantityState.find((item) => item.id === id).quantity -= 1)
    : quantityState.find((item) => item.id === id).quantity;
  loadProducts();
  loadCheckout();
}

loadCheckout();
function loadCheckout() {
  checkout.innerHTML = "";
  const productsDiv = document.createElement("div");
  productsDiv.className = "checkout";
  productsDiv.innerHTML = `
        <div class="checkout-details">
            <div>Total</div>
            <div>$${total.toFixed(2)}</div>
        </div>
        <div class="checkout-button">
            <button onclick='addToCart()'>checkout</button>
        </div>
    `;
  products.appendChild(productsDiv);
}

function addToCart() {
  const filterRecord = quantityState.filter((record) => record.quantity > 0);
  if (filterRecord.length) {
    localStorage.setItem(LOCALSTORAGE.cartItem, JSON.stringify(filterRecord));
    window.location.href = "./cart.html";
  } else {
    alert("product quantitty must be more than zero");
  }
}
