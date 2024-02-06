window.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.key === "F5") {
    alert("cart has been removed from LocalStorage");
    localStorage.removeItem("carts");
  }
});

const product = JSON.parse(localStorage.getItem("products")) || [];
if (product.length) {
  console.log("product is there in localstorage");
} else {
  const products = [
    {
      id: 1,
      name: "Strandmond",
      price: 295.63,
      image:
        "https://www.ikea.com/in/en/images/products/strandmon-wing-chair-grey__0973258_pe811962_s5.jpg?f=s",
    },
    {
      id: 2,
      name: "Mellby",
      price: 749.62,
      image:
        "https://rukminim2.flixcart.com/image/416/416/ktx9si80/sofa-set/n/5/u/0-81-28-cream-synthetic-3-1-1-193-0-78-74-30-20-0-ud-1555-mellby-original-imag75w6zyqte5gk.jpeg?q=70&crop=false",
    },
    {
      id: 3,
      name: "Micke",
      price: 144.21,
      image:
        "https://www.ikea.com/in/en/images/products/micke-desk-white__0736020_pe740347_s5.jpg?f=s",
    },
  ];

  localStorage.setItem("products", JSON.stringify(products));
}
