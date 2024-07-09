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
import FilterOptionSkeleton from "~/components/shared/skeleton/FilterOptionSkeleton.vue";
import FilterSection from "~/components/listing/filter/FilterSection.vue";

export default {
  name: "FilterOption",
  components: {
    FilterOptionSkeleton,
    FilterSection,
  },
  props: {
    openSections: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    selectedFilters: {
      handler() {
        this.updateQueryParams();
        this.updateSelectedFilterDisplay();
      },
      deep: true,
    },
  },
  computed: {
    ...mapState("filter", {
      filterOption: (state) => state.filterOption,
      error: (state) => state.error,
      selectedFilters: (state) => state.selectedFilters,
      selectedFilterDisplay: (state) => state.selectedFilterDisplay,
    }),
    ...mapState("product", {
      productLoading: (state) => state.loading,
      page: (state) => state.page,
      perPage: (state) => state.perPage,
      sortBy: (state) => state.sortBy,
    }),
  },
  methods: {
    ...mapActions("filter", [
      "fetchFilterOption",
      "editSelectedFilters",
      "updateSelectedFilterDisplay",
    ]),
    ...mapActions("product", ["changePage"]),

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
      this.updateRouteQuery();
      this.fetchFilterOption();
    },

    updateRouteQuery() {
      console.log(this.sortBy);
      console.log(this.perPage);
      
      this.$router.push({
        query: {
          ...this.$route.query,
          page: this.page,
          sortBy: this.sortBy,
          perPage: this.perPage,
        },
      });
    },

    updateQueryParams() {
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

    toggleSection(index) {
      const sectionIndex = this.openSections.indexOf(index);
      if (sectionIndex === -1) {
        this.$emit("update:openSections", [...this.openSections, index]);
      } else {
        this.$emit(
          "update:openSections",
          this.openSections.filter((i) => i !== index)
        );
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
