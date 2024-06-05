<template>
    <div class="bg-white">
        <div class="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 product-page">
            <div class="flex justify-between mb-8">
                <div>
                    <input type="type" placeholder="Search..." v-model="searchQuery"
                        class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
                <div>
                    <select id="category" v-model="categoryId"
                        class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option v-if="categoryLoading"></option>
                        <option value="">Select Category</option>
                        <option v-for="(category, index) in categories" :key="index" :value="category.id">{{
                            category.name
                            }}</option>
                    </select>
                </div>
            </div>

            <div v-if="productLoading">
                <Loader />
            </div>
            <div v-else-if="products && !products.length">
                product not found!
            </div>
            <div v-else
                class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                <ProductCard v-for="product in products" :key="product.id" :product="product" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import { GET_CATEGORIES } from "~/graphql/queries/category";

export default {
    data() {
        return {
            error: null,
            searchQuery: '',
            categoryId: ''
        };
    },
    computed: {
        ...mapState('product', {
            products: state => state.products,
            productLoading: state => state.productLoading,
            productError: state => state.productError
        }),
    },
    methods: {
        ...mapActions('product', ['fetchProducts'])
    },
    watch: {
        searchQuery() {
            this.fetchProducts({ title: this.searchQuery, categoryId: this.categoryId });
        },
        categoryId() {
            this.fetchProducts({ title: this.searchQuery, categoryId: this.categoryId });
        }
    },
    created() {
        this.fetchProducts({ title: this.searchQuery, categoryId: this.categoryId });
    }
};
</script>

<style scoped></style>