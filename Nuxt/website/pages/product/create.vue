<template>
    <div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
        <h1 class="text-2xl font-semibold text-gray-900 mb-4">Add New Product</h1>
        <form @submit.prevent="handleSubmit">
            <div class="grid grid-cols-1 gap-6 mb-4">
                <div>
                    <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" id="title" v-model="formData.title" placeholder="Enter product title"
                        class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
                <div>
                    <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
                    <input type="number" id="price" v-model="formData.price" placeholder="Enter product price"
                        class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
                <div>
                    <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" v-model="formData.description" placeholder="Enter product description"
                        class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                </div>
                <div>
                    <label for="categoryId" class="block text-sm font-medium text-gray-700">Category</label>
                    <select id="categoryId" v-model="formData.categoryId"
                        class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option v-if="loading">Loading...</option>
                        <template v-else>
                            <option v-for="category in categories" :key="category.id" :value="category.id">
                                {{ category.name }}
                            </option>
                        </template>
                        <option value="" disabled selected>Select Category</option>
                    </select>
                </div>
                <div>
                    <label for="images" class="block text-sm font-medium text-gray-700">Images (comma separated
                        URLs)</label>
                    <input type="text" id="images" v-model="imagesInput" placeholder="Enter image URLs"
                        class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
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
            imagesInput: ''
        };
    },
    created() {
        this.fetchCategories();
    },
    computed: {
        categories() {
            return this.$store.getters.getCategoriesState.data;
        },
        loading() {
            return this.$store.getters.getCategoriesState.loading;
        },
    },
    methods: {
        fetchCategories() {
            this.$store.dispatch("fetchCategories");
        },
        handleSubmit() {
            this.formData.images = this.imagesInput.split(',').map(url => url.trim());
            let data = {
                title: this.formData.title,
                price: this.formData.price,
                description: this.formData.description,
                categoryId: this.formData.categoryId,
                images: this.formData.images
            }
            this.$store.dispatch("createProduct", data);
        }
    }
};
</script>

<style scoped></style>
