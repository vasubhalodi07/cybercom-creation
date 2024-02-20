const loadingContainer = document.getElementById("loading");
var modal = document.getElementById("myModal");

var span = document.getElementsByClassName("close")[0];
const modalBody = document.getElementById("modal-body");
span.onclick = function () {
  modal.style.display = "none";
  modalBody.innerHTML = "";
};

function fetchProduct() {
  loadingContainer.style.display = "block";
  return new Promise((resolve, reject) => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((products) => {
        loadingContainer.style.display = "none";
        resolve(products.products);
      })
      .catch((err) => {
        reject(new Error("error in fetching record!"));
      });
  });
}

fetchProduct()
  .then((res) => {
    const container = document.getElementById("product-container");
    container.innerHTML = "";

    res.forEach((res, index) => {
      const createDiv = document.createElement("div");
      createDiv.classList.add("card");
      createDiv.addEventListener("click", () => {
        handleModal(res);
      });
      createDiv.innerHTML = `
        <div class="title">${res.title}</div>
        <div class="image-container">
            <img src="${res.images[0]}" alt="image" width="50" />
        </div>
        `;
      container.appendChild(createDiv);
    });
  })
  .catch((err) => {
    console.err(err);
  });

var quantity = 1;
function handleModal(res) {
  modal.style.display = "block";
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
    <div class='modal-image-container'>
      <img src="${res.thumbnail}" alt="image" />    
    </div>
    <div class='modal-content-container'>
      <div>${res.title}</div>
      <div>${res.category}</div>
      <div>${res.brand}</div>
      <div>Price: ${res.price}</div>
      <div>${res.description}</div>
      <div>Available Stock: ${res.stock}</div>
      ${loadModalRecord()}
      <button class="add-to-cart" onclick='addToCart(${res.id}, ${
    res.stock
  })'>ADD TO CART</button>
    </div>
  `;
  updateQuantityDisplay();
}

function loadModalRecord() {
  return `<div class="modal-quantity">
   <div onclick='addQuantity()'>+</div>
   <input id='quantity-input' onchange='updateQuantityDisplay()' type="number" value=${quantity} />
   <div onclick='removeQuantity()'>-</div>
 </div>`;
}

function addQuantity() {
  quantity += 1;
  changeState();
}

function removeQuantity() {
  if (quantity > 1) {
    quantity -= 1;
    changeState();
  }
}

function changeState() {
  const quantityInput = document.getElementById("quantity-input");
  if (quantity >= 1) {
    quantityInput.value = quantity;
  }
}

function updateQuantityDisplay() {
  const quantityInput = document.getElementById("quantity-input");
  if (quantityInput.value < 1) {
    quantityInput.value = 1;
    quantity = 1;
  } else {
    quantity = parseInt(quantityInput.value);
  }
}

function addToCart(id, stock) {
  const fetchCart = JSON.parse(localStorage.getItem("cart")) || [];
  const findRecord = fetchCart.findIndex((cart) => cart.productId === id);

  if (findRecord !== -1) {
    if (fetchCart[findRecord].quantity + quantity > stock) {
      alert("quantity limit exceeded");
      return;
    }

    fetchCart[findRecord].quantity += quantity;
    localStorage.setItem("cart", JSON.stringify(fetchCart));
    alert("quantity updated");
    return;
  }
  const cartObject = {
    id: new Date().getTime(),
    productId: id,
    quantity: quantity,
  };

  const mergeCart = [...fetchCart, cartObject];
  localStorage.setItem("cart", JSON.stringify(mergeCart));
  alert("product added to cart!");
}
