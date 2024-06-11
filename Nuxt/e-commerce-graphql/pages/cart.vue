<template>
    <div class="pt-5">
        <div class="max-w-5xl mx-auto bg-white rounded-xl">
            <div class="flex flex-col lg:flex-row">
                <div class="lg:w-2/3 bg-gray-50 max-h-screen p-6">
                    <h2 class="text-2xl font-bold text-gray-800 mb-4">Shopping Cart</h2>

                    <div v-if="loading">
                        <Loader />
                    </div>

                    <div v-else-if="carts && carts.length > 0" class="divide-y divide-gray-200">
                        <div v-for="(item, index) in carts" :key="index" class="flex items-center space-x-4 py-4">
                            <img :src="item.product.images[0]" alt="Product Image"
                                class="w-16 h-16 rounded-md object-cover">
                            <div class="flex-1">
                                <h3 class="text-lg font-semibold text-gray-700">{{ item.product.title }}</h3>
                                <div class="flex items-center space-x-2 mt-1">
                                    <span class="text-sm font-medium text-gray-900">${{
                                        item.product.price.toFixed(2) }}</span>
                                    <span class="text-sm text-gray-500">x {{ item.quantity }}</span>
                                </div>
                                <div class="flex items-center space-x-2 mt-1">
                                    <span class="text-sm font-medium text-gray-900">Total: ${{
                                        item.product.price.toFixed(2) * item.quantity }}</span>
                                </div>
                            </div>
                            <button @click="removeFromCart(index)" class="text-red-500 hover:text-red-700">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div v-else class="text-center text-gray-500">
                        Your cart is empty.
                    </div>
                </div>

                <div class="lg:w-1/3 bg-gray-100 p-6 lg:top-0">
                    <h2 class="text-xl font-bold text-gray-800 mb-4">Summary</h2>
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-lg font-medium text-gray-900">Total:</span>
                        <span class="text-lg font-medium text-gray-900">${{ totalPrice.toFixed(2) }}</span>
                    </div>
                    <button
                        class="w-full bg-indigo-600 text-white py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                        :disabled="loading">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    created() {
        this.fetchCarts(this.user.data.id);
    },
    computed: {
        ...mapState({
            user: state => state.user
        }),

        ...mapState("cart", {
            carts: state => state.carts,
            loading: state => state.loading,
            error: state => state.error
        }),

        totalPrice() {
            return this.$store.getters['cart/calculateTotalPrice'];
        },
    },
    methods: {
        ...mapActions("cart", ['fetchCarts', 'removeCart']),

        removeFromCart(index) {
            let result = confirm("do you want to delete this item?");
            if (result) {
                this.removeCart(index);
            }
        },
    },
};
</script>

<style scoped>
@media (max-width: 1024px) {
    .p-6 {
        padding: 1.5rem;
    }

    .text-2xl {
        font-size: 1.5rem;
    }

    .text-lg {
        font-size: 1.125rem;
    }

    .py-4 {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }

    .lg\:sticky {
        position: static;
    }
}
</style>
