/* 
2. Create an object to store information about a product (e.g., name, price, quantity, etc.).
   Write code to calculate the total cost of a specified quantity of the product.
*/

const product = {
  product: "Apple iPhone",
  model: "iPhone 13 Pro",
  quantity: 50,
  price: 45000,
  display: {
    size: "6.1 inches",
    resolution: "2532 x 1170 pixels",
  },
  processor: {
    chipset: "A15 Bionic",
    cpu: "Hexa-core",
    gpu: "Apple GPU (4-core graphics)",
  },
  storage_options: [128, 256, 512],
  battery: {
    capacity: "3095 mAh",
    charging: {
      wired: "up to 50% in around 30 minutes with a 20W adapter or higher",
      wireless:
        "MagSafe wireless charging up to 15W, Qi wireless charging up to 7.5W",
    },
  },
  operating_system: "iOS 15",
  colors: ["Graphite", "Gold", "Silver", "Sierra Blue"],
};

// calculate the total price (quantity * price)
const totalCost = product.quantity * product.price;
console.log("Total Cost: ", totalCost);

// access processor properties
console.log(product.processor);
if (product.processor && product.processor.chipset) {
  console.log("Chipset: ", product.processor.chipset);
} else {
  console.log("something wrong");
}

// fetch colors properties
for (let i = 0; i < product.colors.length; i++) {
  console.log(product.colors[i]);
}
