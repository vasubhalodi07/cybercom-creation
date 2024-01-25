/*
    5. Write a function that takes two objects as arguments and returns a new object that
    combines the properties of both objects. For example, a function that takes two objects     
    with name and age properties and returns an object with name, age, and address
    properties
*/

const person = {
  id: 1,
  name: "Vasu",
  age: 21,
  email: "vasubhalodi111@gmail.com",
};

const personAddres = {
  personId: 1,
  address: "Jetpur road gondal, gujarat",
  pincode: 360311,
};

// merge object manually
const mergeManually = (person, personAddres) => {
  return {
    id: person.id,
    name: person.name,
    age: person.age,
    email: person.email,
    personId: personAddres.personId,
    address: personAddres.address,
    pincode: personAddres.pincode,
  };
};
console.log(mergeManually(person, personAddres));

// merge object using spread operator (shallow object)
const mergeSpreadOperator = (person, personAddres) => {
  return { ...person, ...personAddres };
};
console.log(mergeSpreadOperator(person, personAddres));

// merge object using object assign method
const mergeAssignMethod = (person, personAddres) => {
  return Object.assign({}, person, personAddres);
};
console.log(mergeAssignMethod(person, personAddres));
