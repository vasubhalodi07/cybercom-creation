<template>
    <div class="bg-white">
        <div class="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8 product-page">
            <div class="flex justify-between mb-5">
                <div>
                    <input type="type" placeholder="Search..." v-model="searchQuery"
                        class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
                <div>
                    <select id="category" v-model="categoryId"
                        class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option value="">Select Category</option>
                        <option v-if="categoryLoading">Loading...</option>
                        <template v-else>
                            <option v-for="(category, index) in categories" :key="index" :value="category.id">{{
                                category.name
                                }}</option>
                        </template>
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
                <ProductCard v-for="product in paginatedProducts" :key="product.id" :product="product" />
            </div>

            <div class="flex justify-center mt-5">
                <button @click="previousPage" :disabled="currentPage === 1"
                    class="px-4 py-2 mr-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
                    Previous
                </button>
                <div class="flex">
                    <button v-for="pageNumber in pagination" :key="pageNumber" @click="goToPage(pageNumber)"
                        :class="{ 'bg-gray-200': pageNumber === currentPage, 'hover:bg-gray-300': pageNumber !== currentPage }"
                        class="px-4 py-2 mr-2 text-gray-700 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
                        {{ pageNumber }}
                    </button>
                </div>
                <button @click="nextPage" :disabled="currentPage === totalPages"
                    class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
                    Next
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            error: null,
            searchQuery: '',
            categoryId: '',
            currentPage: 1,
            productsPerPage: 12
        };
    },
    computed: {
        ...mapState('product', {
            products: state => state.products,
            productLoading: state => state.loading,
            productError: state => state.error
        }),
        ...mapState('category', {
            categories: state => state.categories,
            categoryLoading: state => state.loading,
            categoryError: state => state.error
        }),
        totalPages() {
            return Math.ceil(this.products.length / this.productsPerPage);
        },
        paginatedProducts() {
            const startIndex = (this.currentPage - 1) * this.productsPerPage;
            const endIndex = startIndex + this.productsPerPage;
            return this.products.slice(startIndex, endIndex);
        },
        pagination() {
            const pagesToShow = 5;
            const paginationArray = [];
            let startPage = 1;
            let endPage = this.totalPages;
            if (this.totalPages > pagesToShow) {
                if (this.currentPage <= Math.ceil(pagesToShow / 2)) {
                    endPage = pagesToShow;
                } else if (this.currentPage >= this.totalPages - Math.floor(pagesToShow / 2)) {
                    startPage = this.totalPages - pagesToShow + 1;
                } else {
                    startPage = this.currentPage - Math.floor(pagesToShow / 2);
                    endPage = this.currentPage + Math.floor(pagesToShow / 2);
                }
            }
            for (let i = startPage; i <= endPage; i++) {
                paginationArray.push(i);
            }
            if (this.totalPages > pagesToShow) {
                if (startPage > 1) {
                    paginationArray.unshift('...');
                }
                if (endPage < this.totalPages) {
                    paginationArray.push('...');
                }
            }
            return paginationArray;
        }
    },
    methods: {
        ...mapActions('product', ['fetchProducts']),
        ...mapActions('category', ['fetchCategories']),
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        goToPage(pageNumber) {
            if (pageNumber !== '...') {
                this.currentPage = pageNumber;
            }
        },
        fetchProductsAndCategories() {
            this.fetchProducts({ title: this.searchQuery, categoryId: this.categoryId });
            this.fetchCategories();
        }
    },
    watch: {
        searchQuery() {
            this.fetchProducts({ title: this.searchQuery, categoryId: this.categoryId });
        },
        categoryId() {
            this.fetchProducts({ title: this.searchQuery, categoryId: this.categoryId });
        },
        currentPage() {
            window.scrollTo(0, 0);
        }
    },
    created() {
        this.fetchProductsAndCategories();
    }
};
</script>

<style scoped></style>
