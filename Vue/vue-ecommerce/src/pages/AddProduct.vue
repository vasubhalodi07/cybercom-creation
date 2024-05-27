<template>
  <div class="add-product-container">
    <h1 class="title">Add Product</h1>
    <form @submit.prevent="addProduct" class="product-form">
      <FormInput placeholder="Title" v-model.trim="formData.title" />
      <FormInput
        placeholder="Price"
        v-model.trim="formData.price"
        type="number"
      />
      <FormInput
        placeholder="Description"
        v-model.trim="formData.description"
      />

      <div class="categories">
        <FormSelect
          defaultValue="Select Categories"
          v-model="formData.categoryId"
          :categories="this.$store.state.categoriesList.categories"
          :categoriesLoading="this.$store.state.categoriesList.loading"
        />
      </div>

      <FormInput
        placeholder="Enter Image Link"
        v-model.trim="formData.images"
      />
      <button
        type="submit"
        class="submit-button"
        :disabled="this.$store.state.productList.loading"
      >
        {{ this.$store.state.productList.loading ? "Loading..." : "Submit" }}
      </button>
    </form>
  </div>
</template>

<script>
import FormInput from "@/components/FormInput.vue";
import FormSelect from "@/components/FormSelect.vue";

export default {
  name: "AddProduct",
  components: {
    FormInput,
    FormSelect,
  },
  data() {
    return {
      formData: {
        title: "",
        price: "",
        description: "",
        categoryId: null,
        images: "",
      },
    };
  },
  created() {
    this.$store.dispatch("fetchCategories");
  },
  methods: {
    addProduct() {
      const body = {
        title: this.formData.title,
        price: this.formData.price,
        description: this.formData.description,
        categoryId: parseInt(this.formData.categoryId),
        images: [this.formData.images],
      };
      this.$store.dispatch("addProduct", body);
    },
  },
};
</script>

<style scoped>
.add-product-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.product-form {
  display: flex;
  flex-direction: column;
}

.categories {
  margin-bottom: 20px;
}

.submit-button {
  width: fit-content;
  font-size: 13px;
  color: #fff;
  background-color: #4685c9;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
