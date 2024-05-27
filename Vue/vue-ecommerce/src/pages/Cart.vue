<template>
  <div class="cart-container">
    <div class="cart-header">Shopping Cart</div>

    <div v-if="loading" class="loader-container">
      <div class="loader"></div>
    </div>

    <div v-else-if="cartItems.length === 0" class="empty-cart">
      Your cart is empty.
    </div>

    <div v-else class="cart-content">
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.cart_id" class="cart-item">
          <img
            :src="item.imageSrc"
            @error="onImageError"
            alt="product-image"
            class="item-image"
          />
          <div class="item-details">
            <p>{{ item.title }}</p>
            <p>Price: ${{ item.price }}</p>
            <p>Quantity: {{ item.quantity }}</p>
            <p>Total: ${{ (item.price * item.quantity).toFixed(2) }}</p>
          </div>
          <div class="remove-icon" @click="removeCart(item.cart_id)">
            <i class="fa-solid fa-trash"></i>
          </div>
        </div>
      </div>

      <div class="cart-summary">
        <div>Summary</div>
        <div class="summary-item">
          <span>Total Items:</span>
          <span>{{ totalItems }}</span>
        </div>
        <div class="summary-item">
          <span>Total Cost:</span>
          <span>${{ totalCost }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "Cart",
  data() {
    return {
      fallbackImage:
        "https://img.freepik.com/free-photo/wooden-product-display-podium-with-blurred-nature-leaves-background-generative-ai_91128-2268.jpg",
    };
  },
  computed: {
    ...mapState({
      loading: (state) => state.cart.loading,
      cartItems: (state) => state.cart.items,
    }),
    ...mapGetters(["cartItems", "cartLoading"]),
    totalItems() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    totalCost() {
      return this.cartItems
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2);
    },
  },
  created() {
    this.$store.dispatch("fetchCart");
  },
  methods: {
    removeCart(cartId) {
      this.$store.dispatch("removeCart", cartId);
    },

    onImageError(event) {
      event.target.src = this.fallbackImage;
    },
  },
};
</script>

<style scoped>
.cart-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.cart-header {
  text-align: center;
  margin-bottom: 20px;
  font-size: 23px;
}

.empty-cart {
  text-align: center;
  font-size: 1.2em;
}

.cart-content {
  display: flex;
  gap: 20px;
}

.cart-items {
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-right: 1px solid #ddd;
  padding-right: 20px;
}

.cart-item {
  display: flex;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
}

.item-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details {
  flex: 1;
  margin-left: 20px;
}

.item-details p:nth-child(1) {
  font-weight: bold;
}

.item-details p {
  margin: 5px 0;
}

.item-total {
  font-size: 1.2em;
}

.remove-icon {
  cursor: pointer;
  color: #ff0000;
  padding: 5px;
}

.cart-summary {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  height: min-content;
}

.cart-summary div:nth-child(1) {
  font-size: 20px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  font-size: 1em;
}

.summary-item span:nth-child(2) {
  font-weight: 600;
}

@media (max-width: 768px) {
  .cart-content {
    flex-direction: column;
  }

  .cart-items {
    border-right: none;
    padding-right: 0;
  }

  .cart-summary {
    border-top: 1px solid #ddd;
    padding-top: 20px;
  }
}

@media (max-width: 480px) {
  .cart-item {
    flex-direction: column;
    text-align: center;
  }

  .item-image {
    width: 100%;
    height: auto;
  }

  .item-details {
    margin: 10px 0 0 0;
  }

  .item-total {
    margin-top: 10px;
  }
}
</style>
