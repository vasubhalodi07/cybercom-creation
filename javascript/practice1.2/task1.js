/*
1. Create an object to store information about a person (e.g., name, age, address, etc.).
   Write code to access and modify the object's properties.
*/

const person = {
  name: "vasu",
  age: 21,
  email: "vasubhalodi111@gmail.com",
  phoneNumber: 9913260225,
  password: "xyz1234",
  address: [
    "gita nager, jetpur road gondal, gujarat",
    "busstand road shreji book store, gondal, gujarat",
  ],
  city: "gondal",
  state: "gujarat",
  pincode: 360311,
};

// print full object
console.log(person);

// fetch name properties using . and [] syntax
console.log(person.name);
console.log(person["name"]);

// modify the person name property
person.name = "janak";
console.log(person.name);

// access address properties
console.log(person.address);
// fetch address using for loop
for (let i = 0; i < person.address.length; i++) {
  console.log(person.address[i]);
}
// fetch address using forEach method (forEach modified record in original array)
person.address.forEach((element) => {
  console.log(element);
});
// fetch address using map method (map generate a new array)
person.address.map((ele) => {
  console.log(ele);
});
