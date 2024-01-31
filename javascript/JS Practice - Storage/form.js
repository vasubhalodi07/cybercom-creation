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

$(document).ready(function () {
  $("#productForm").validate({
    rules: {
      txtTitle: { required: true },
      numPrice: { required: true },
      txtDescription: { required: true },
      selectCategory: { required: true },
    },
    messages: {
      txtTitle: { required: "name is required" },
      numPrice: { required: "price is required" },
      txtDescription: { required: "description is required" },
      selectCategory: { required: "category is required" },
    },

    errorPlacement: function (error, element) {
      error.css({ color: "red", marginTop: "5px", fontSize: "12px" });
      error.insertAfter(element);
    },

    submitHandler: (form) => {
      const formData = $(form).serializeArray();
      handleAddUpdate(formData);
    },
  });
});

function handleAddUpdate(formData) {
  const product = {
    id: id ? id : new Date(),
    title: formData.find((field) => field.name === "txtTitle").value,
    price: formData.find((field) => field.name === "numPrice").value,
    description: formData.find((field) => field.name === "txtDescription")
      .value,
    category: formData.find((field) => field.name === "selectCategory").value,
  };

  if (id) {
    const filterRecord = products.filter((product) => {
      return product.id !== id;
    });
    const updateProducts = [...filterRecord, product];
    localStorage.setItem("products", JSON.stringify(updateProducts));

    alert("product has been updated");
    window.location.href = "./index.html";
  } else {
    const newObject = [...products, product];
    localStorage.setItem("products", JSON.stringify(newObject));
    productForm.reset();

    alert("new product created...");
    window.location.href = "./index.html";
  }
}
