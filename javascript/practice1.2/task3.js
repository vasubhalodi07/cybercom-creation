/* 
3. Create an array of objects to store information about multiple people or products.
    Write code to loop through the array and display the information for each object. 
*/

const person = [
  { name: "John", age: 28, email: "john@gmail.com" },
  { name: "Vasu", age: 21, email: "vasu@gmail.com" },
  { name: "Janak", age: 23, email: "janak@gmail.com" },
  { name: "Dhruv", age: 25, email: "dhruv@gmail.com" },
];

const products = [
  {
    name: "Apple iPhone",
    model: "iPhone 13 Pro",
    quantity: 50,
    price: 45000,
  },
  {
    name: "Samsung Galaxy",
    model: "Galaxy S21",
    quantity: 30,
    price: 40000,
  },
  {
    name: "Google Pixel",
    model: "Pixel 6",
    quantity: 20,
    price: 35000,
  },
  {
    name: "Sony PlayStation",
    model: "PS5",
    quantity: 10,
    price: 50000,
  },
  {
    name: "Dell Laptop",
    model: "XPS 13",
    quantity: 15,
    price: 1200,
  },
];

// fetch person object (map method: it return new array)
console.log("using map method");
person.map((item) => {
  console.log(item);
});

// fetch person object (forEach method: modify the original array)
console.log("using forEach method");
person.forEach((element) => {
  console.log(element);
});

// fetch person object (for loop)
console.log("using for loop");
for (let i = 0; i < person.length; i++) {
  console.log(person[i]);
}

// fetch person object (while loop)
console.log("using while loop");
let i = 0;
while (i < person.length) {
  i++;
}

// calculate average age of person object (reduce method)
console.log("calculating average age of person object");
const averageAge = person.reduce((prev, curr, index) => {
  return prev + curr.age / person.length;
}, 0);
console.log(averageAge);

// ------------------------------------------------------------

// fetch products (map)
console.log("fetch product using map method");
products.map((product) => {
  console.log(product);
});

// fetch product (forEach)
console.log("fetch product using forEach method");
products.forEach((product) => {
  console.log(product);
});

// fetch product (for loop)
console.log("fetch product using for loop");
for (let i = 0; i < products.length; i++) {
  console.log(products[i]);
}

// fetch product (while)
console.log("fetch product using while loop");
let j = 0;
while (j < products.length) {
  console.log(products[j]);
  j++;
}

// calculate totalprice of all products
console.log("total price");
const totalPrice = products.reduce((prev, curr, index) => {
  return prev + curr.price * curr.quantity;
}, 0);
console.log(totalPrice);
