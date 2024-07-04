<template>
  <div class="filter-options">
    <div v-if="loading">
      <FilterOptionSkeleton v-for="n in 5" :key="n" />
    </div>
    <div v-else>
      <FilterSection
        v-for="(option, index) in filterOption"
        :key="index"
        :option="option"
        :index="index"
        :open-sections="openSections"
        @toggle-section="toggleSection"
        @toggle-filter="toggleFilter"
        :product-loading="productLoading"
        :selected-filters="selectedFilters"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import FilterSection from "~/components/filter/FilterSection.vue";
import FilterOptionSkeleton from "~/components/filter/FilterOptionSkeleton.vue";

export default {
  components: {
    FilterSection,
    FilterOptionSkeleton,
  },
  data() {
    return {
      openSections: [],
    };
  },
  async created() {
    await this.fetchFilterOption();
    this.initializeFiltersFromQuery();
    this.updateSelectedFilterDisplay();
    this.filterOption.forEach((option, index) => {
      this.openSections.push(index);
    });
  },
  watch: {
    selectedFilters: {
      handler() {
        this.updateQueryParams(true);
        this.updateSelectedFilterDisplay();
      },
      deep: true,
    },
  },
  computed: {
    ...mapState("filter", {
      filterOption: (state) => state.filterOption,
      loading: (state) => state.loading,
      error: (state) => state.error,
      selectedFilters: (state) => state.selectedFilters,
      selectedFilterDisplay: (state) => state.selectedFilterDisplay,
    }),
    ...mapState("product", {
      productLoading: (state) => state.loading,
      page: (state) => state.page,
    }),
  },
  methods: {
    ...mapActions("filter", [
      "fetchFilterOption",
      "editSelectedFilters",
      "editSelectedFilterDisplay",
    ]),
    ...mapActions("product", ["changePage"]),

    initializeFiltersFromQuery() {
      const query = this.$route.query;
      const filters = [];
      Object.keys(query).forEach((key) => {
        if (key !== "page") {
          filters.push({
            attributeCode: key,
            value: query[key].split(","),
          });
        }
      });
      this.editSelectedFilters(filters);
    },

    toggleFilter({ value, attributeCode, checked }) {
      let filters = JSON.parse(JSON.stringify(this.selectedFilters));
      const filterIndex = filters.findIndex(
        (filter) => filter.attributeCode === attributeCode
      );
      if (checked) {
        if (filterIndex === -1) {
          filters.push({ attributeCode: attributeCode, value: [value] });
        } else {
          if (!filters[filterIndex].value.includes(value)) {
            filters[filterIndex].value.push(value);
          }
        }
      } else {
        if (filterIndex !== -1) {
          const valueIndex = filters[filterIndex].value.indexOf(value);
          if (valueIndex !== -1) {
            filters[filterIndex].value.splice(valueIndex, 1);
          }
          if (filters[filterIndex].value.length === 0) {
            filters.splice(filterIndex, 1);
          }
        }
      }
      this.editSelectedFilters(filters);
      this.changePage(1);
      this.updateRouteQuery();
    },

    updateRouteQuery() {
      this.$router.push({ query: { ...this.$route.query, page: this.page } });
    },

    updateQueryParams(resetPage = false) {
      const preservedParams = ["sortBy", "perPage"];
      const query = {};
      preservedParams.forEach((param) => {
        if (this.$route.query[param]) {
          query[param] = this.$route.query[param];
        }
      });
      this.selectedFilters.forEach((filter) => {
        if (filter.value.length > 0) {
          query[filter.attributeCode] = filter.value.join(",");
        }
      });
      query.page = this.$route.query.page || 1;
      this.$router.push({ query });
    },

    updateSelectedFilterDisplay() {
      const selectedFilterDisplay = [];
      this.selectedFilters.forEach((filter) => {
        const option = this.filterOption.find(
          (opt) => opt.attrCode === filter.attributeCode
        );
        if (option) {
          filter.value.forEach((value) => {
            const facet = option.facets.find(
              (facet) => facet.attrValue === value
            );
            if (facet) {
              selectedFilterDisplay.push({
                attributeCode: filter.attributeCode,
                value: value,
                label: facet.attrLabel,
              });
            }
          });
        }
      });
      this.editSelectedFilterDisplay(selectedFilterDisplay);
    },

    toggleSection(index) {
      const sectionIndex = this.openSections.indexOf(index);
      if (sectionIndex === -1) {
        this.openSections.push(index);
      } else {
        this.openSections.splice(sectionIndex, 1);
      }
    },
  },
};
</script>

<style scoped>
.filter-options {
  max-width: 500px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
