const urlParams = new URLSearchParams(window.location.search);
const uniqueTitle = urlParams.get("title");

const products = JSON.parse(localStorage.getItem("products")) || [];
const filterRecord = products.filter((product) => {
  return product.title === uniqueTitle;
});

const title = document.getElementById("txtTitle");
const price = document.getElementById("numPrice");
const description = document.getElementById("txtDescription");
const category = document.getElementById("selectCategory");

if (uniqueTitle) {
  title.value = filterRecord[0].title;
  price.value = filterRecord[0].price;
  description.value = filterRecord[0].description;
  category.value = filterRecord[0].category;
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

  const products = JSON.parse(localStorage.getItem("products")) || [];
  if (uniqueTitle) {
    const product = {
      title: title,
      price: price,
      description: description,
      category: category,
    };

    const filterRecord = products.filter((product) => {
      return product.title !== uniqueTitle;
    });
    const filter = [...filterRecord, product];
    console.log(filter);
    localStorage.setItem("products", JSON.stringify(filter));
    alert("product has been updated");
    window.location.href = "./index.html";
  } else {
    const product = {
      title: title,
      price: price,
      description: description,
      category: category,
    };
    const newObject = [...products, product];
    localStorage.setItem("products", JSON.stringify(newObject));
    productForm.reset();
    alert("new product created...");
    window.location.href = "./index.html";
  }
});
