<template>
  <div>
    <h4>Example of Computed Properties</h4>
    <div>String Interpolation: {{ fname }} {{ lname }}</div>
    <div>Computed FullName: {{ fullName }}</div>
    <button @click="changeFullName">button - change the computed name</button>

    <br />
    <br />
    <button
      @click="
        items.push({
          id: 4,
          title: 'Pendrive',
          price: 200,
        })
      "
    >
      Add Items
    </button>

    <br />
    <div>
      Without Computed:
      {{ items.reduce((total, curr) => (total = total + curr.price), 0) }}
    </div>
    <div>Computed TotalPrice: {{ totalPrice }}</div>
    <div>Method TotalPrice: {{ getTotal() }}</div>

    <br />
    <input type="text" v-model="country" />
    <br />

    <br />
    <div v-for="items in expensiveItems" v-bind:key="items">
      <div>{{ items.title }} {{ items.price }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComputedComponent",
  data() {
    return {
      fname: "Vasu",
      lname: "Bhalodi",
      items: [
        {
          id: 1,
          title: "TV",
          price: 100,
        },
        {
          id: 2,
          title: "Mobile",
          price: 200,
        },
        {
          id: 3,
          title: "Laptop",
          price: 300,
        },
      ],
      country: "",
    };
  },
  methods: {
    getTotal() {
      return this.items.reduce(
        (total, curr) => (total = total + curr.price),
        0
      );
    },
    changeFullName() {
      this.fullName = "Janak Pariya";
    },
  },
  computed: {
    fullName: {
      get() {
        return `${this.fname} ${this.lname}`;
      },
      set(value) {
        const names = value.split(" ");
        this.fname = names[0];
        this.lname = names[1];
      },
    },

    totalPrice() {
      return this.items.reduce(
        (total, curr) => (total = total + curr.price),
        0
      );
    },

    expensiveItems() {
      return this.items.filter((item) => item.price > 100);
    },
  },
};
</script>

<style></style>
