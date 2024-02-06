const cartList = document.getElementById("cart-list");
const priceSection = document.getElementById("price-section");

const carts = JSON.parse(localStorage.getItem("carts")) || [];
const products = JSON.parse(localStorage.getItem("products")) || [];

loadCartList();
function loadCartList() {
  cartList.innerHTML = "";

  if (!carts.length) {
    cartList.innerHTML = "Cart Empty!";
    return;
  }

  carts.forEach((item) => {
    const findRecord = products.find((product) => product.id === item.id);
    const calculateTotalPrice =
      item.id === findRecord.id ? item.quantity * findRecord.price : 1;

    const productsDiv = document.createElement("div");
    productsDiv.className = "cart";
    productsDiv.innerHTML = `
        <table>
            <tr>
                <td>${findRecord.name}</td>
                <td>${item.id === findRecord.id ? item.quantity : 1} pcs</td>
                <td>$${calculateTotalPrice.toFixed(2)}</td>
            </tr>
        </table>
    `;
    cartList.appendChild(productsDiv);
  });
}

loadPriceSection();
function loadPriceSection() {
  priceSection.innerHTML = "";

  if (!carts.length) {
    return;
  }

  let totalPrice = 0;
  carts.forEach((item) => {
    const findRecord = products.find((product) => product.id === item.id);
    totalPrice += findRecord.price * item.quantity;
  });

  const GST = totalPrice + totalPrice * (18 / 100);
  const productsDiv = document.createElement("div");
  productsDiv.className = "cart mt";
  productsDiv.innerHTML = `
            <div>Total (18% GST):</div>
            <div class='price'>$${GST.toFixed(2)}</divc>
    `;
  cartList.appendChild(productsDiv);
}
