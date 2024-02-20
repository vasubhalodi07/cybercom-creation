const container = document.getElementById("cart-container");
const empty = document.getElementById("empty-message");

function fetchProductById() {
  const fetchCart = JSON.parse(localStorage.getItem("cart")) || [];

  if (fetchCart.length === 0) {
    empty.style.display = "block";
  }

  container.innerHTML = "";
  fetchCart.forEach(async (element) => {
    await fetch(`https://dummyjson.com/products/${element.productId}`)
      .then((res) => res.json())
      .then((product) => {
        console.log(product);

        container.innerHTML += `
        <div class='cart-card-container'>
            <div class="cart-image-container">
                <img src="${product.images[0]}" alt="image" width="50" />
            </div>
            <div class='cart-title'>
                <div>${product.title}</div>
                <div>${product.category}</div>
                <div>&#8377;${product.price}</div>
                <div>Qty: ${element.quantity}</div>
                <i onclick=removeCart(${element.id}) class="fa fa-trash delete-icon" aria-hidden="true"></i>
            </div>
        </div>
      `;
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

function removeCart(id) {
  const response = confirm("Are you sure you want to remove this item?");
  if (response) {
    const fetchCart = JSON.parse(localStorage.getItem("cart")) || [];
    const fetchIndex = fetchCart.findIndex((cart) => cart.id === id);
    fetchCart.splice(fetchIndex, 1);
    localStorage.setItem("cart", JSON.stringify(fetchCart));
    fetchProductById();
  }
}

fetchProductById();
