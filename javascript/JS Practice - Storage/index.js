displayProducts();

function displayProducts() {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  const products = JSON.parse(localStorage.getItem("products")) || null;
  products.sort((a, b) => {
    return a.title - b.title;
  });

  if (products.length === 0) {
    const row = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 4;
    td.innerHTML = "product not found!";
    row.appendChild(td);
    tableBody.appendChild(row);
    return;
  }

  products.forEach((product) => {
    const row = document.createElement("tr");
    const titleCell = document.createElement("td");
    titleCell.textContent = product.title;
    row.appendChild(titleCell);

    const categoryCell = document.createElement("td");
    categoryCell.textContent = product.category;
    row.appendChild(categoryCell);

    const priceCell = document.createElement("td");
    priceCell.textContent = product.price;
    row.appendChild(priceCell);

    const actionsCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      deleteProduct(products, product);
    };
    const updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.addEventListener("click", () => {
      handleUpdate(product);
    });
    actionsCell.appendChild(updateButton);
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);
    tableBody.appendChild(row);
  });
}

function handleAdd() {
  window.location.href = "./form.html";
}

function deleteProduct(products, productToDelete) {
  const updatedProducts = products.filter((product) => {
    return product !== productToDelete;
  });
  localStorage.setItem("products", JSON.stringify(updatedProducts));
  displayProducts();
}

function handleUpdate(productToUpdate) {
  window.location.href = `./form.html?title=${productToUpdate.title}`;
}
