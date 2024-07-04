<template>
  <div class="filter-option-skeleton">
    <div class="skeleton-header"></div>
    <div class="skeleton-item" v-for="n in 5" :key="n">
      <div class="skeleton-checkbox"></div>
      <div class="skeleton-text"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterOptionSkeleton",
};
</script>

<style scoped>
.filter-option-skeleton {
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding: 10px;
}

.skeleton-header {
  height: 18px;
  margin-bottom: 10px;
  background: #e0e0e0;
  border-radius: 10px;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 2px 10px;
}

.skeleton-checkbox {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  background: #e0e0e0;
  border-radius: 3px;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-text {
  flex: 1;
  height: 12px;
  background: #e0e0e0;
  border-radius: 4px;
  animation: pulse 1.5s infinite ease-in-out;
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
