<template>
  <div>
    <h2>Products</h2>
    <AddProduct
      v-on:submitForm="AddProduct"
      v-bind:product="currentProduct"
      v-bind:isEdit="isEdit"
    />
    <FetchProduct
      v-bind:products="products"
      @delete-product="deleteProduct"
      @update-product="editMode"
    />
  </div>
</template>

<script>
import FetchProduct from "./components/FetchProduct.vue";
import AddProduct from "./components/AddProduct.vue";

export default {
  name: "App",
  components: {
    FetchProduct,
    AddProduct,
  },
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Product 1",
          price: 100,
        },
        {
          id: 2,
          name: "Product 2",
          price: 200,
        },
        {
          id: 3,
          name: "Product 3",
          price: 300,
        },
        {
          id: 4,
          name: "Product 4",
          price: 400,
        },
      ],
      currentProduct: null,
      isEdit: false,
    };
  },
  methods: {
    AddProduct(newProduct) {
      if (this.isEdit) {
        const index = this.products.findIndex(
          (product) => product.id === newProduct.id
        );
        if (index !== -1) {
          this.products.splice(index, 1, newProduct);
        }
        alert("product updated!");
      } else {
        this.products.push({
          id: this.products.length + 1,
          name: newProduct.name,
          price: newProduct.price,
        });
        alert("product created!");
      }
      this.isEdit = false;
      this.currentProduct = null;
    },

    deleteProduct(id) {
      let response = prompt("Are you sure you want to delete?");
      if (response) {
        this.products = this.products.filter((product) => product.id !== id);
      }
    },

    editMode(id) {
      const product = this.products.find((product) => product.id === id);
      if (product) {
        this.currentProduct = { ...product };
        this.isEdit = true;
      }
    },
  },
};
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
}
h2 {
  padding: 10px;
}
</style>
