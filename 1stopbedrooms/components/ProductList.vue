<template>
  <div class="container">
    <div v-if="loading">
      Loading...
    </div>
    <template v-else>
      <div class="header">
        <div>
          <div>Beds</div>
          <div>{{ products && products.itemsCount }} items</div>
        </div>
        <div>
          <select v-model="sortBy">
            <option value="RELEVANCE">Recommended</option>
            <option value="PRICE_FROM_LOW">Price: Low - High</option>
            <option value="PRICE_FROM_HIGH">Price: High - Low</option>
          </select>
        </div>
        <div>
          <select v-model="perPage">
            <option value="PER_PAGE_36">36</option>
            <option value="PER_PAGE_48">48</option>
            <option value="PER_PAGE_72">72</option>
          </select>
        </div>
      </div>
      <div class="card-grid">
        <div class="card" v-for="item in products && products.items" :key="item.id" @mouseenter="hoverImage(item.id)"
          @mouseleave="unhoverImage">
          <img
            :src="hoveredItemId === item.id && item.images.hoverImage ? item.images.hoverImage.src : item.images.mainImage.src"
            :alt="hoveredItemId === item.id && item.images.hoverImage ? item.images.hoverImage.alt : item.images.mainImage.alt" />
          <div class="details">
            <div>{{ item.name }}</div>
            <div>By {{ item.brand.name }}</div>
            <div>web ID: <b>{{ item.webId }}</b></div>
            <div>
              Price: ${{ item.price.finalPrice }}
              <span>${{ item.price.msrp }}</span>
            </div>
          </div>
        </div>
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
  },
};
</script>

<style scoped>
.container {
  flex-direction: column;
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
