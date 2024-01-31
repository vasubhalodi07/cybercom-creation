const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const products = JSON.parse(localStorage.getItem("products")) || [];
const getRecordById = products.filter((product) => {
  return product.id === id;
});

const title = document.getElementById("txtTitle");
const price = document.getElementById("numPrice");
const description = document.getElementById("txtDescription");
const category = document.getElementById("selectCategory");

const titleChange = document.getElementById("title");
if (!id) {
  titleChange.innerHTML = "Add Product Form";
} else {
  titleChange.innerHTML = "Update Product Form";
  title.value = getRecordById[0].title;
  price.value = getRecordById[0].price;
  description.value = getRecordById[0].description;
  category.value = getRecordById[0].category;
}

const productForm = document.getElementById("productForm");
productForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("txtTitle").value.trim();
  const price = document.getElementById("numPrice").value.trim();
  const description = document.getElementById("txtDescription").value.trim();
  const category = document.getElementById("selectCategory").value;

  if (title === "" || price === "" || description === "" || category === "") {
    alert("Please fill in all fields");
    return;
  }

  const product = {
    id: id ? id : new Date(),
    title: title,
    price: price,
    description: description,
    category: category,
  };

  if (id) {
    const filterRecord = products.filter((product) => {
      return product.id !== id;
    });
    const filter = [...filterRecord, product];
    localStorage.setItem("products", JSON.stringify(filter));
    alert("product has been updated");
    window.location.href = "./index.html";
  } else {
    const newObject = [...products, product];
    localStorage.setItem("products", JSON.stringify(newObject));
    productForm.reset();
    alert("new product created...");
    window.location.href = "./index.html";
  }
});
