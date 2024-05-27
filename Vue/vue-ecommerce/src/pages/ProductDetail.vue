<template>
  <div class="product-details">
    <div v-if="loading" class="loader-container">
      <div class="loader"></div>
    </div>

    <div v-else class="product-content">
      <div class="product-body">
        <div class="product-image">
          <img :src="imageSrc" @error="onImageError" alt="product-image" />
        </div>
        <div class="product-info">
          <div class="breadcrumb">
            <router-link to="/product">Products</router-link> /
            <span>{{ productDetail.title }}</span>
          </div>
          <h1 class="product-title">{{ productDetail.title }}</h1>
          <div class="product-category">
            {{ productDetail.category && productDetail.category.name }}
          </div>
          <p class="product-description">{{ productDetail.description }}</p>
          <div class="product-price">Price: ${{ productDetail.price }}</div>
          <div class="cart-btn">
            <button @click="addToCart(productDetail.id)">Add to Cart</button>
          </div>

          <div class="admin-actions">
            <i
              class="action-icon delete-icon fas fa-trash-alt"
              @click="showDeleteConfirmation"
            ></i>
            <i
              class="action-icon update-icon fas fa-edit"
              @click="showUpdateForm"
            ></i>
          </div>
        </div>
      </div>
    </div>

    <Modal
      :isVisible="isModalVisible"
      :title="modalTitle"
      :loading="deleteLoading || updateLoading"
      @confirm="handleModalConfirm"
      @close="handleClose"
      :showConfirmButton="isDeleteModal"
    >
      <template v-if="isDeleteModal">
        <p>Are you sure you want to delete this product?</p>
      </template>
      <template v-else>
        <FormInput
          label="Title"
          v-model="updatedTitle"
          placeholder="Enter new title"
        />
        <FormInput
          label="Description"
          v-model="updatedDescription"
          placeholder="Enter new description"
        />
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import FormInput from "@/components/FormInput.vue";

export default {
  name: "ProductDetails",
  components: {
    Modal,
    FormInput,
  },
  data() {
    return {
      isModalVisible: false,
      isDeleteModal: false,
      updatedTitle: "",
      updatedDescription: "",
      modalTitle: "",
    };
  },
  computed: {
    productDetail() {
      return this.$store.getters.productDetail;
    },
    loading() {
      return this.$store.getters.productDetailLoading;
    },
    imageSrc() {
      return this.$store.getters.productImage;
    },
    user() {
      return this.$store.state.user;
    },
    deleteLoading() {
      return this.$store.state.productDetail.deleteLoading;
    },
    updateLoading() {
      return this.$store.state.productDetail.updateLoading;
    },
  },
  methods: {
    fetchProductDetail() {
      const productId = this.$route.params.id;
      this.$store.dispatch("fetchProductById", productId);
    },
    onImageError() {
      const placeholder = "https://dummyimage.com/600x400/000/fff";
      this.$store.commit("setProductImage", placeholder);
    },
    addToCart(product_id) {
      this.$store.dispatch("addToCart", product_id);
    },
    showDeleteConfirmation() {
      this.isDeleteModal = true;
      this.modalTitle = "Delete Product";
      this.isModalVisible = true;
    },
    showUpdateForm() {
      this.isDeleteModal = false;
      this.modalTitle = "Update Product";
      this.updatedTitle = this.productDetail.title;
      this.updatedDescription = this.productDetail.description;
      this.isModalVisible = true;
    },
    handleClose() {
      this.isModalVisible = false;
    },
    handleModalConfirm() {
      if (this.isDeleteModal) {
        this.handleDelete();
      } else {
        this.handleUpdate();
      }
    },
    handleDelete() {
      this.$store.dispatch("deleteProduct", this.productDetail.id)
        .then(() => {
          this.$router.push("/product");
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleUpdate() {
      const updatedData = {
        title: this.updatedTitle,
        description: this.updatedDescription,
      };
      this.$store.dispatch("updateProduct", { id: this.productDetail.id, updatedData })
        .then(() => {
          this.isModalVisible = false;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  mounted() {
    this.fetchProductDetail();
  },
};
</script>

<style scoped>
.product-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.product-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  width: 100%;
}

.breadcrumb {
  font-size: 14px;
  margin-bottom: 10px;
}

.breadcrumb a {
  color: #3b55c9;
  text-decoration: none;
}

.breadcrumb span {
  color: #7f8c8d;
}

.product-body {
  display: flex;
  gap: 20px;
}

.product-image {
  flex: 1.5;
}

.product-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.product-info {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.product-title {
  font-size: 1.4em;
}

.product-description {
  font-size: 0.9em;
}

.product-price {
  font-size: 0.9em;
}

.product-category {
  font-size: 0.9em;
}

.cart-btn button {
  background-color: #4685c9;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cart-btn button:hover {
  background-color: #3b55c9;
  border-radius: 5px;
}

.admin-actions {
  display: flex;
  gap: 10px;
}

.action-icon {
  cursor: pointer;
  font-size: 15px;
}

.delete-icon {
  color: #e74c3c;
}

.update-icon {
  color: #3498db;
}
</style>
