<template>
  <div class="container">
    <div v-if="loading">
      Loading...
    </div>
    <template v-else>
      <div class="header">
        <div>
          <div class="header-title">Beds</div>
          <div class="header-items">{{ products && products.itemsCount }} items</div>
        </div>
        <div>
          <select v-model="sortBy">
            <option value="RELEVANCE">Recommended</option>
            <option value="PRICE_FROM_LOW">Price: Low - High</option>
            <option value="PRICE_FROM_HIGH">Price: High - Low</option>
          </select>
        </div>
      </div>

      <div v-if="selectedFilters.length" class="selected-filters">
        <div v-for="(filter, index) in selectedFilters" :key="index" class="filter-item">
          {{ filter.label }}
          <button @click="removeFilter(filter)">×</button>
        </div>
        <button class="clear-filter-button" @click="clearFilter()">Clear Filters</button>
      </div>

      <div class="card-grid">
        <div class="card" v-for="item in products && products.items" :key="item.id" @mouseenter="hoverImage(item.id)"
          @mouseleave="unhoverImage">
          <img
            :src="hoveredItemId === item.id && item.images.hoverImage ? item.images.hoverImage.src : item.images.mainImage.src"
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
      </div>

      <div class="per-page-filter">
        <select v-model="perPage">
          <option value="PER_PAGE_36">36</option>
          <option value="PER_PAGE_48">48</option>
          <option value="PER_PAGE_72">72</option>
        </select>
      </div>

      <Pagination :currentPage="page" :totalPages="products.pages" @page-changed="handlePageChange" />
    </template>
  </div>
</template>

<script>
import { GET_PRODUCT_LIST } from '~/graphql/queries/product';

export default {
  data() {
    return {
      products: [],
      loading: false,
      error: null,
      hoveredItemId: null,
      sortBy: 'RELEVANCE',
      perPage: 'PER_PAGE_36',
      page: 1,
    };
  },
  props: {
    selectedFilters: {
      type: Array,
      default: () => []
    }
  },
  async created() {
    this.sortBy = this.$route.query.sortBy || 'RELEVANCE';
    this.perPage = this.$route.query.perPage || 'PER_PAGE_36';
    this.page = parseInt(this.$route.query.page) || 1;
    await this.fetchProducts(this.sortBy, this.perPage, this.page);
  },
  watch: {
    sortBy() {
      this.updateRouteQuery();
    },
    perPage() {
      this.page = 1;
      this.updateRouteQuery();
    },
    page() {
      this.updateRouteQuery();
    },
    '$route.query': {
      handler() {
        this.page = parseInt(this.$route.query.page);
        this.fetchProducts(this.sortBy, this.perPage, this.page);
      },
      immediate: true,
      deep: true,
    }
  },
  methods: {
    updateRouteQuery() {
      this.$router.push({ query: { ...this.$route.query, sortBy: this.sortBy, perPage: this.perPage, page: this.page } });
    },

    async fetchProducts(sortBy, perPage, page) {
      this.loading = true;
      try {
        const { data } = await this.$apollo.query({
          query: GET_PRODUCT_LIST,
          variables: {
            sortBy,
            perPage,
            page: parseInt(page),
            facet: this.buildFilterQueryParams()
          },
        });
        this.products = data.listing.listingCategory;
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },

    buildFilterQueryParams() {
      const filters = [];
      const query = this.$route.query;
      Object.keys(query).forEach(key => {
        if (key !== 'sortBy' && key !== 'perPage' && key !== 'page') {
          filters.push({
            attributeCode: key,
            value: query[key].split(',')
          });
        }
      });
      return filters;
    },

    hoverImage(id) {
      this.hoveredItemId = id;
    },

    unhoverImage() {
      this.hoveredItemId = null;
    },

    handlePageChange(page) {
      this.page = page;
      this.scrollToTop();
    },

    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },

    removeFilter(filter) {
      this.$emit('remove-filter', filter);
    },

    clearFilter() {
      this.$emit('clear-filter');
    },
  },
};
</script>

<style scoped>
.container {
  padding: 0px;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: top;
  padding-bottom: 20px;
}

.header-title {
  font-size: 22px;
  font-weight: bold;
}

.header-items {
  font-size: 15px;
  color: #464545;
}

.selected-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-bottom: 25px;
}

.filter-item {
  background: #f1f1f1;
  padding: 10px 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
}

.filter-item button {
  background: none;
  border: none;
  font-size: 17px;
  margin-left: 10px;
  cursor: pointer;
}

.filter-item button:hover {
  color: red;
}

.clear-filter-button {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #0f249a;
  }
  
.clear-filter-button:hover {
    text-decoration: underline;
}

.card-grid {
  display: grid;
  gap: 50px 20px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

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

.per-page-filter {
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
}

select {
  padding: 10px;
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
</style>
