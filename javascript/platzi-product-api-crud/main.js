let currentPageOffset = 0;

const loadingContainer = document.getElementById("loading");
const noRecords = document.getElementById("no-records");
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const modalBody = document.getElementById("modal-body");
const paginationContainer = document.getElementById("pagination-container");

span.onclick = function () {
  modal.style.display = "none";
  modalBody.innerHTML = "";
};

fetchProducts(0);
function fetchProducts(offset) {
  loadingContainer.style.display = "block";
  const container = document.getElementById("product-container");
  container.innerHTML = "";

  fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=10`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }
      return response.json();
    })
    .then((res) => {
      loadingContainer.style.display = "none";
      console.log(res);
      let products = res;
      displayProductsForPage(products);
      renderPagination(100, offset);
      currentPageOffset = offset;
    })
    .catch((err) => {
      loadingContainer.style.display = "none";
      console.error(err);
    });
}

function fetchCurrentPageProducts() {
  fetchProducts(currentPageOffset);
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
          <img src="https://imgs.search.brave.com/jBmM81B7TVdzHAJtxUZqFKPbB649UftZA7939rc4sK8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8x/MC8xMi8yMi8xNy9i/dXNpbmVzcy0yODQ2/MjIxXzY0MC5qcGc" alt="image" width="50" />
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
      fetchCurrentPageProducts();
    })
    .catch((error) => {
      console.log(error);
    });
}

function renderPagination(total, offset) {
  const itemsPerPage = 10;
  const pageCount = Math.ceil(total / itemsPerPage);
  const paginationContainer = document.getElementById("pagination-container");
  paginationContainer.innerHTML = "";

  if (pageCount > 1) {
    const prevButton = createPaginationButton("Previous");
    prevButton.addEventListener("click", () => {
      const newOffset = Math.max(0, offset - itemsPerPage);
      fetchProducts(newOffset);
    });
    prevButton.disabled = offset === 0;

    const nextButton = createPaginationButton("Next");
    nextButton.addEventListener("click", () => {
      const newOffset = Math.min(total - itemsPerPage, offset + itemsPerPage);
      fetchProducts(newOffset);
    });
    nextButton.disabled = offset >= total - itemsPerPage;

    paginationContainer.appendChild(prevButton);

    const currentPage = Math.floor(offset / itemsPerPage) + 1;
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(pageCount, startPage + 3);
    for (let i = startPage; i <= endPage; i++) {
      const pageButton = createPaginationButton(i.toString());
      if (i === currentPage) {
        pageButton.classList.add("active");
        pageButton.disabled = true;
      } else {
        pageButton.addEventListener("click", () => {
          const newOffset = (i - 1) * itemsPerPage;
          fetchProducts(newOffset);
        });
      }
      paginationContainer.appendChild(pageButton);
    }

    paginationContainer.appendChild(nextButton);
  }
}

function createPaginationButton(text) {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add("pagination-button");
  return button;
}
