<template>
    <div class="lg:pt-8">
        <div class="max-w-5xl mx-auto p-6 bg-white rounded-lg">

            <div v-if="loading">
                <Loader />
            </div>
            <div v-else-if="error != null">
                <ProductNotFound />
            </div>
            <div v-else>
                <div class="flex flex-col lg:flex-row lg:space-x-6">
                    <div class="lg:w-1/2">
                        <img :src="currentImage" @error="onImageError" alt="product"
                            class="w-full h-96 object-cover rounded-lg shadow-md" />
                        <div class="flex mt-4 space-x-2" v-if="product.images">
                            <img v-for="image in product && product.images" :key="image" :src="image"
                                @click="changeImage(image)"
                                class="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-75 border-2 border-transparent focus:outline-none focus:border-indigo-500" />
                        </div>
                    </div>
                    <div class="lg:w-1/2 mt-6 lg:mt-0">
                        <nav class="text-sm mb-3" aria-label="Breadcrumb">
                            <ol class="list-none p-0 inline-flex">
                                <li class="flex items-center">
                                    <NuxtLink to="/product" class="text-indigo-600 hover:text-indigo-800">Products
                                    </NuxtLink>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1" stroke="currentColor" class="size-4 text-gray-500">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m8.25 4.5 7.5 7.5-7.5 7.5" />
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
                        <button @click="addToCart(product.id)"
                            v-if="isLoggedIn && user.data && user.data.role === 'customer'"
                            class="mt-6 bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                            Add to Cart
                        </button>

                        <div class="mt-6 flex gap-1" v-if="isLoggedIn && user.data && user.data.role === 'admin'">
                            <svg @click="toggleModel" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="red" class="size-6 pointer" style="cursor: pointer">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            <svg @click="editMode" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="blue" class="size-6" style="cursor: pointer">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Modal v-if="visible">
            <template v-if="deleteMode">
                <DeleteConfirmation :loading="modelLoading" header="product" @submit="handleDelete"
                    @cancel="handleCancel" />
            </template>
            <template v-else>
                <DynamicForm title="Update Product" :loading="modelLoading" :fields="currentFields"
                    :initialData="currentData" @submit="handleFormSubmit" @cancel="handleCancel" />
            </template>
        </Modal>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    data() {
        return {
            currentImage: null,
            visible: false,
            deleteMode: true,
            currentFields: [],
            currentData: {},
            id: this.$route.params.id
        }
    },
    created() {
        this.fetchProductById(this.id)
            .then(response => {
                console.log(response);

                if (!response || !response.product) {
                    this.$toast({ message: 'No product found!', type: 'error', duration: 3000 });
                }
            })
            .catch(error => {
                this.$toast({ message: 'Error fetching product!', type: 'error', duration: 3000 });
                console.error('Error fetching product:', error);
            });
    },
    computed: {
        ...mapState({
            user: state => state.user,
            isLoggedIn: state => state.isLoggedIn
        }),
        ...mapState('product', {
            product: state => state.productById,
            loading: state => state.loading,
            error: state => state.error,
            modelLoading: state => state.modelLoading
        })
    },
    methods: {
        ...mapActions("product", ['fetchProductById', 'updateProduct', 'deleteProduct']),
        ...mapActions("cart", ['addToCartWithLocalStorage']),

        addToCart(product_id) {
            const body = {
                id: new Date(),
                user_id: this.user.data.id,
                product_id: product_id,
                quantity: 1,
            }
            const response = this.addToCartWithLocalStorage(body);
            var message = "";
            if (response == "add") {
                message = "Product added into cart!";
            } else if (response == "update") {
                message = "Quantity updated in cart!";
            } else {
                message = "Something went wrong!";
            }
            this.$toast({ message: message, type: 'success', duration: 3000 });
        },

        async handleFormSubmit(data) {
            if(data.title == "" || data.price == "") {
                return alert("provide all information!");
            }
            try {
                const response = await this.updateProduct({
                    id: this.id,
                    title: data.title,
                    price: data.price
                })
                this.handleCancel();
                this.fetchProductById(this.id);
                this.$toast({ message: 'Product updated successfully!', type: 'success', duration: 3000 });
                console.log("Product updated successfully:", response);
            } catch (error) {
                console.error("Error updating product:", error);
                this.$toast({ message: 'Error updating product!', type: 'error', duration: 3000 });
            }
        },

        async handleDelete() {
            try {
                const response = await this.deleteProduct(this.id);
                this.handleCancel();
                console.log("Product deleted successfully:", response);
                this.$toast({ message: 'Product deleted successfully!', type: 'success', duration: 3000 });
                this.$router.push("/product");
            } catch (error) {
                console.error("Error deleting product:", error);
                this.$toast({ message: 'Error deleting product!', type: 'error', duration: 3000 });
            }
        },

        toggleModel() {
            this.visible = !this.visible;
        },

        editMode() {
            this.deleteMode = false;
            this.currentFields = this.getProductFields();
            this.currentData = this.product;
            this.visible = true;
        },

        getProductFields() {
            return [
                { name: 'title', label: 'Title', type: 'text', placeholder: 'Enter product title' },
                { name: 'price', label: 'Price', type: 'text', placeholder: 'Enter product price' },
            ];
        },

        handleCancel() {
            this.deleteMode = true;
            this.visible = false;
        },

        onImageError() {
            this.currentImage = 'https://imgur.com/6wkyyIN.jpeg';
        },

        changeImage(image) {
            this.currentImage = image;
        },
    },
    watch: {
        product: {
            handler(newProduct) {
                if (newProduct) {
                    if (newProduct.images && newProduct.images.length) {
                        this.currentImage = newProduct.images[0];
                    }
                }
            },
            immediate: true,
        }
    }
}
</script>

<style scoped></style>
