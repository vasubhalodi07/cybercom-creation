const loadingContainer = document.getElementById("loading");
const noRecords = document.getElementById("no-records");
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const modalBody = document.getElementById("modal-body");

span.onclick = function () {
  modal.style.display = "none";
  modalBody.innerHTML = "";
};

fetchProduct();
async function fetchProduct() {
  loadingContainer.style.display = "block";
  let url = `https://api.escuelajs.co/api/v1/products`;

  const container = document.getElementById("product-container");
  container.innerHTML = "";

  await fetch(url)
    .then((response) => response.json())
    .then((res) => {
      loadingContainer.style.display = "none";
      let products = res;
      displayProductsForPage(products);
    })
    .catch((err) => {
      loadingContainer.style.display = "none";
      console.error(err);
    });
}

function displayProductsForPage(products) {
  const container = document.getElementById("product-container");
  container.innerHTML = "";

  products.forEach((res, index) => {
    const createDiv = document.createElement("div");
    createDiv.classList.add("card");
    createDiv.addEventListener("click", () => {
      handleModal(res);
    });
    createDiv.innerHTML = `
    <div class="title">${res.title}</div>
    <div class="image-container">
        <img src="https://imgs.search.brave.com/jBmM81B7TVdzHAJtxUZqFKPbB649UftZA7939rc4sK8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8x/MC8xMi8yMi8xNy9i/dXNpbmVzcy0yODQ2/MjIxXzY0MC5qcGc" alt="image" width="50" />
    </div>
    `;
    container.appendChild(createDiv);
  });
}

function handleModal(res) {
  modal.style.display = "block";
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
    <div class='modal-image-container'>
      <img src="https://imgs.search.brave.com/jBmM81B7TVdzHAJtxUZqFKPbB649UftZA7939rc4sK8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8x/MC8xMi8yMi8xNy9i/dXNpbmVzcy0yODQ2/MjIxXzY0MC5qcGc" width="50%" alt="image" />
    </div>
    <div class='modal-content-container'>
      <div>${res.title}</div>
      <div>${res.description}</div>
      <div>Price: ${res.price}</div>
      <div>Category: ${res.category.name}</div>
      <button onclick=deleteProduct(${res.id})>Delete</button>
      <button onclick=updateProduct(${res.id})>Update</button>    
    </div>
  `;
}

function updateProduct(id) {
  window.location.href = `./update/index.html?id=${id}`;
}

function deleteProduct(id) {
  fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((response) => {
      modal.style.display = "none";
      fetchProduct();
    })
    .catch((error) => {
      console.log(error);
    });
}
