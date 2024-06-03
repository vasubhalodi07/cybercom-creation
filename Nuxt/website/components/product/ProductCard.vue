<template>
    <div class="group" @click="navigate(product.id)">
        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img :src="currentImage" @error="onImageError" alt="product"
                class="h-full w-full object-cover object-center group-hover:opacity-75" />
        </div>
        <h3 class="mt-2 text-sm text-gray-700">{{ product.title }}</h3>
        <p class="text-lg font-medium text-gray-900">${{ product.price }}</p>
    </div>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            currentImage: this.product.images[0]
        };
    },
    methods: {
        onImageError() {
            this.currentImage = 'https://imgur.com/6wkyyIN.jpeg';
        },
        navigate(id) {
            this.$router.push(`/product/${id}`);
        }
    }
};
</script>

<style scoped></style>
