<template>
    <div class="card" @mouseenter="hoverImage(item.id)" @mouseleave="unhoverImage">
        <img :src="hoveredItemId === item.id && item.images.hoverImage ? item.images.hoverImage.src : item.images.mainImage.src"
            :alt="hoveredItemId === item.id && item.images.hoverImage ? item.images.hoverImage.alt : item.images.mainImage.alt" />
        <div class="details">
            <div class="product-name" :class="{ active: hoveredItemId === item.id }">{{ item.name }}</div>
            <div v-if="hoveredItemId === item.id" class="web-id">web ID: {{ item.webId }}</div>
            <div v-else class="product-brand-name">By {{ item.brand.name }}</div>
            <div class="product-price">
                ${{ item.price.finalPrice }}
                <span>${{ item.price.msrp }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CardItem",
    props: {
        item: Object,
        hoveredItemId: Number
    },
    methods: {
        hoverImage(id) {
            this.$emit('hoverImage', id);
        },
        unhoverImage() {
            this.$emit('unhoverImage');
        }
    }
};
</script>

<style scoped>
.card {
    overflow: hidden;
    text-align: center;
}

.card img {
    width: 100%;
    height: auto;
}

.card .details {
    text-align: left;
}

.product-name {
    font-size: 16px;
    letter-spacing: 1.2px;
    line-height: 20px;
    padding-top: 5px;
}

.product-brand-name {
    font-size: 14px;
    padding: 5px 0px;
}

.product-price {
    font-size: 20px;
    font-weight: 800;
    padding-top: 5px;
}

.product-price span {
    font-size: 15px;
    font-weight: 500;
    color: #464545;
    text-decoration: line-through;
}

.web-id {
    padding: 5px 0px;
    font-size: 14px;
}

.active {
    text-decoration: underline;
}
</style>