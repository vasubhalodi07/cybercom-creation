/*
4. Write a function that takes an object as an argument and returns a new object with
   specific properties. For example, a function that takes an object with name, age, and
   address properties and returns an object with only the name and age properties.
*/

const person = {
  name: "vasu",
  age: 21,
  email: "vasubhalodi111@gmail.com",
  password: "Dfdjwhfweufb",
};

// filter properties manually
const filterProperties = (person) => {
  return {
    name: person.name,
    age: person.age,
    email: person.email,
  };
};
const filteredPersonManually = filterProperties(person);
console.log(filteredPersonManually);

// filter properties using spread operator
const filterPropertiesSpreadOperator = (person) => {
  const { password, ...filteredPerson } = person;
  return filteredPerson;
};
const filteredPersonSpread = filterPropertiesSpreadOperator(person);
console.log(filteredPersonSpread);
