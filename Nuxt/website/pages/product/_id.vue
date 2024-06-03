<template>
  <div class="lg:pt-8">
    <div class="max-w-5xl mx-auto p-6 bg-white rounded-lg">

      <div v-if="productLoading">
        <Loader />
      </div>

      <div v-else class="flex flex-col lg:flex-row lg:space-x-6">
        <div class="lg:w-1/2">
          <img :src="currentImage" @error="onImageError" alt="product"
            class="w-full h-96 object-cover rounded-lg shadow-md" />
          <div class="flex mt-4 space-x-2" v-if="product.images.length > 1">
            <img v-for="image in product.images" :key="image" :src="image" @click="changeImage(image)"
              class="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-75 border-2 border-transparent focus:outline-none focus:border-indigo-500" />
          </div>
        </div>
        <div class="lg:w-1/2 mt-6 lg:mt-0">
          <nav class="text-sm mb-3" aria-label="Breadcrumb">
            <ol class="list-none p-0 inline-flex">
              <li class="flex items-center">
                <NuxtLink to="/product" class="text-indigo-600 hover:text-indigo-800">Products</NuxtLink>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                  stroke="currentColor" class="size-4 text-gray-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </li>
              <li class="flex items-center">
                <span class="text-gray-500">{{ product.title }}</span>
              </li>
            </ol>
          </nav>

          <h2 class="text-2xl font-bold text-gray-900">{{ product.title }}</h2>
          <p class="mt-2 text-lg text-gray-900">${{ product.price }}</p>
          <p class="mt-4 text-gray-600">{{ product.description }}</p>
          <button @click="addToCart(product.id)" v-if="$auth.loggedIn && $auth.user && $auth.user.role === 'customer'"
            class="mt-6 bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
            Add to Cart
          </button>

          <div class="mt-6 flex gap-1" v-if="$auth.loggedIn && $auth.user && $auth.user.role === 'admin'">
            <svg @click="toggleModel" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="red" class="size-6 pointer" style="cursor: pointer">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="blue"
              class="size-6" style="cursor: pointer">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <Modal :visible="visible" :loading="modelLoading" :state="true" buttonName="Delete" @close="closeDialog"
      @submit="submitDialog">
      <template #body>
        <div class="sm:flex sm:items-start">
          <div
            class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Delete Product</h3>
            <p class="text-sm text-gray-500">Are you sure you want to delete this product?</p>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentImage: null,
      visible: false,
    };
  },
  created() {
    this.fetchProducts();
  },
  computed: {
    product() {
      return this.$store.getters.getProductByIdState.data;
    },
    productLoading() {
      return this.$store.getters.getProductByIdState.loading;
    },
    modelLoading() {
      return this.$store.getters.getLoading;
    }
  },
  methods: {
    async fetchProducts() {
      let id = this.$route.params.id;
      await this.$store.dispatch("fetchProductById", id);
    },

    toggleModel() {
      this.visible = !this.visible;
    },

    closeDialog() {
      this.visible = false;
    },
    submitDialog() {
      let id = this.$route.params.id;
      this.$store.dispatch("deleteProduct", id).then(() => {
        this.closeDialog();
        this.$router.push("/product");
      }).catch((err) => {
        console.log(err);
      });
    },

    onImageError() {
      this.currentImage = 'https://imgur.com/6wkyyIN.jpeg';
    },
    changeImage(image) {
      this.currentImage = image;
    },
    addToCart(product_id) {
      const body = {
        id: new Date(),
        user_id: this.$auth.user.id,
        product_id: product_id,
        quantity: 1,
      }
      this.$store.dispatch("addToCartWithLocalStorage", body);
    }
  },
  watch: {
    product: {
      handler(newProduct) {
        if (newProduct.images && newProduct.images.length) {
          this.currentImage = newProduct.images[0];
        }
      },
      immediate: true,
    }
  }
};
</script>

<style scoped></style>
