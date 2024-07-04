<template>
  <div class="product-list-skeleton">
    <div class="skeleton-header">
      <div class="skeleton-flex">
        <div class="skeleton-title"></div>
        <div class="skeleton-items-count"></div>
      </div>
      <div class="skeleton-select"></div>
    </div>
    <div class="card-grid">
      <div class="skeleton-card" v-for="n in 32" :key="n">
        <div class="skeleton-image"></div>
        <div class="skeleton-boxes">
          <div class="skeleton-box" v-for="i in 4" :key="i"></div>
        </div>
        <div class="skeleton-details">
          <div class="skeleton-text skeleton-title-full"></div>
          <div class="skeleton-text skeleton-subtitle-full"></div>
          <div class="skeleton-text skeleton-price"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductListSkeleton",
};
</script>

<style scoped>
.product-list-skeleton {
  padding: 20px;
}

.skeleton-flex {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.skeleton-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.skeleton-title {
  width: 50px;
  height: 20px;
  background: #e0e0e0;
  border-radius: 4px;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-items-count {
  width: 100px;
  height: 20px;
  background: #e0e0e0;
  border-radius: 4px;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-select {
  width: 200px;
  height: 40px;
  background: #e0e0e0;
  border-radius: 4px;
  animation: pulse 1.5s infinite ease-in-out;
}

.card-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.skeleton-boxes {
  display: flex;
  justify-content: flex-start;
  gap: 5px;
  margin-bottom: 10px;
}

.skeleton-box {
  width: 30px;
  height: 30px;
  background: #e0e0e0;
  border-radius: 3px;
  animation: pulse 1.5s infinite ease-in-out;
}

@media (min-width: 1200px) {
  .card-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1199px) and (min-width: 900px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 899px) and (min-width: 600px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 599px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}

.skeleton-card {
  overflow: hidden;
  text-align: center;
}

.skeleton-image {
  width: 100%;
  height: 250px;
  background: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 10px;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-details {
  width: 100%;
}

.skeleton-text {
  height: 20px;
  background: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 10px;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-title {
  width: 80%;
}

.skeleton-title-full {
  width: 100%;
}

.skeleton-subtitle-full {
  height: 10px;
}

.skeleton-price {
  height: 10px;
  width: 40%;
}

@keyframes pulse {
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #c0c0c0;
  }
  100% {
    background-color: #e0e0e0;
  }
}
</style>
