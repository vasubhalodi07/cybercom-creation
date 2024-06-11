<template>
    <div class="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <h1 class="text-2xl font-semibold text-gray-900 mb-4">Add New Product</h1>
        <form @submit.prevent="handleSubmit">
            <div class="grid grid-cols-1 gap-6 mb-4">
                <div>
                    <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" id="title" v-model="formData.title" placeholder="Enter product title"
                        :class="{ 'border-red-500': errors.title }"
                        class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</p>
                </div>
                <div>
                    <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
                    <input type="number" id="price" v-model="formData.price" placeholder="Enter product price"
                        :class="{ 'border-red-500': errors.price }"
                        class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <p v-if="errors.price" class="text-red-500 text-sm mt-1">{{ errors.price }}</p>
                </div>
                <div>
                    <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" v-model="formData.description" placeholder="Enter product description"
                        :class="{ 'border-red-500': errors.description }"
                        class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                    <p v-if="errors.description" class="text-red-500 text-sm mt-1">{{ errors.description }}</p>
                </div>
                <div>
                    <label for="categoryId" class="block text-sm font-medium text-gray-700">Category</label>
                    <select id="categoryId" v-model="formData.categoryId"
                        :class="{ 'border-red-500': errors.categoryId }"
                        class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option v-if="loading">Loading...</option>
                        <template v-else>
                            <option v-for="category in categories" :key="category.id" :value="category.id">
                                {{ category.name }}
                            </option>
                        </template>
                        <option value="" disabled selected>Select Category</option>
                    </select>
                    <p v-if="errors.categoryId" class="text-red-500 text-sm mt-1">{{ errors.categoryId }}</p>
                </div>
                <div>
                    <label for="images" class="block text-sm font-medium text-gray-700">Images (comma separated
                        URLs)</label>
                    <input type="text" id="images" v-model="imagesInput" placeholder="Enter image URLs"
                        :class="{ 'border-red-500': errors.images }"
                        class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <p v-if="errors.images" class="text-red-500 text-sm mt-1">{{ errors.images }}</p>
                </div>
            </div>
            <div>
                <button type="submit"
                    class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    data() {
        return {
            formData: {
                title: '',
                price: 0,
                description: '',
                categoryId: null,
                images: []
            },
            imagesInput: '',
            errors: {}
        };
    },
    created() {
        this.fetchCategories();
    },
    computed: {
        ...mapState('category', {
            categories: state => state.categories,
            loading: state => state.loading,
        })
    },
    methods: {
        ...mapActions('category', ['fetchCategories']),
        ...mapActions('product', ['createProduct']),

        async handleSubmit() {
            this.errors = {};
            if (!this.formData.title) {
                this.errors.title = 'Title is required';
            }
            if (!this.formData.price) {
                this.errors.price = 'Price is required';
            }
            if (!this.formData.description) {
                this.errors.description = 'Description is required';
            }
            if (!this.formData.categoryId) {
                this.errors.categoryId = 'Category is required';
            }
            if (!this.imagesInput) {
                this.errors.images = 'Images are required';
            }
            if (Object.keys(this.errors).length > 0) {
                return;
            }

            try {
                this.formData.images = this.imagesInput.split(',').map(url => url.trim());
                let data = {
                    title: this.formData.title,
                    price: this.formData.price,
                    description: this.formData.description,
                    categoryId: this.formData.categoryId,
                    images: this.formData.images
                }
                await this.createProduct(data);
                this.formData = {
                    title: '',
                    price: 0,
                    description: '',
                    categoryId: null,
                    images: [],
                };
                this.imagesInput = "";
                this.$toast({ message: 'Product added successfully!', type: 'success', duration: 3000 });
            } catch (err) {
                console.log(err);
                this.$toast({ message: 'Error adding product!', type: 'error', duration: 3000 });
            }
        }
    }
};
</script>

<style scoped></style>