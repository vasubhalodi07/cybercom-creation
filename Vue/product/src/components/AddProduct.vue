<template>
  <div class="add-product">
    <div>{{ isEdit ? "Edit Product" : "Add Product" }}</div>
    <form v-on:submit.prevent="submit()">
      <InputComponent
        type="text"
        placeholder="Product Name"
        v-model="productForm.name"
      />
      <InputComponent
        type="number"
        placeholder="Product Price"
        v-model="productForm.price"
      />
      <ButtonComponent :title="isEdit ? 'Update' : 'Submit'" />
    </form>
  </div>
</template>

<script>
import InputComponent from "./Input.vue";
import ButtonComponent from "./Button.vue";

export default {
  name: "AddProduct",
  components: {
    InputComponent,
    ButtonComponent,
  },
  data() {
    return {
      productForm: {
        name: "",
        price: null,
      },
    };
  },
  props: {
    product: {
      type: Object,
      default: () => null,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    submit() {
      this.$emit("submitForm", this.productForm);
      this.resetForm();
    },
    resetForm() {
      this.productForm = { id: null, name: "", price: null };
    },
  },
  watch: {
    product(newProduct) {
      if (newProduct) {
        this.productForm = { ...newProduct };
      } else {
        this.productForm = { id: null, name: "", price: null };
      }
    },
  },
};
</script>

<style scoped>
.add-product {
  padding: 10px;
}

form {
  display: flex;
  gap: 10px;
}
</style>
