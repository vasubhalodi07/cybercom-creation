document.addEventListener("DOMContentLoaded", function () {
  displayProducts();

  function displayProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    if (products.length === 0) {
      const row = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 4;
      td.textContent = "Product not found!";
      row.appendChild(td);
      tableBody.appendChild(row);
      return;
    }

    products.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${product.title}</td>
      <td>${product.category}</td>
      <td>${product.price}</td>
      <td>
        <button class="product-delete" data-id="${product.id}">Delete</button>
        <button class="product-update" data-id="${product.id}">Update</button>
      </td>
    `;
      tableBody.appendChild(row);
    });
  }

  const productAdd = document.getElementById("product-add");
  productAdd.addEventListener("click", function (e) {
    addProduct();
  });

  const productDelete = document.querySelectorAll(".product-delete");
  productDelete.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-id");
      deleteProduct(productId);
    });
  });

  const productUpdate = document.querySelectorAll(".product-update");
  productUpdate.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-id");
      handleUpdate(productId);
    });
  });

  function addProduct() {
    window.location.href = "./form.html";
  }

  function deleteProduct(id) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const filterRecord = products.filter((product) => {
      return product.id !== id;
    });
    localStorage.setItem("products", JSON.stringify(filterRecord));
    displayProducts();
  }

  function handleUpdate(id) {
    window.location.href = `./form.html?id=${id}`;
  }
});
