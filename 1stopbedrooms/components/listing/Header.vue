<template>
  <div class="header">
    <div>
      <div class="header-title">{{ itemsTitle }}</div>
      <div class="header-items">{{ itemsCount }} items</div>
    </div>
    <div>
      <SelectField
        :value="localSortBy"
        :options="sortOptions"
        @change="emitSortByChange"
        label="Sort By"
        fieldId="sort-by-select"
      />
    </div>
  </div>
</template>

<script>
import SelectField from "~/components/listing/SelectField.vue";

export default {
  name: "Header",
  components: {
    SelectField,
  },
  props: {
    itemsCount: Number,
    itemsTitle: String,
    initialSortBy: {
      type: String,
      default: "RELEVANCE",
    },
  },
  data() {
    return {
      localSortBy: this.initialSortBy,
      sortOptions: [
        { value: "RELEVANCE", text: "Recommended" },
        { value: "PRICE_FROM_LOW", text: "Price: Low - High" },
        { value: "PRICE_FROM_HIGHT", text: "Price: High - Low" },
      ],
    };
  },
  methods: {
    emitSortByChange(value) {
      this.localSortBy = value;
      this.$emit("change-sortby-method", this.localSortBy);
    },
  },
  watch: {
    initialSortBy(newVal) {
      this.localSortBy = newVal;
    },
  },
};
</script>

<style scoped>
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
</style>
