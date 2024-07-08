<template>
  <div class="details">
    <div>
      <component
        :is="
          getComponentName(item.dynamicAttribute && item.dynamicAttribute.type)
        "
        :dynamicAttribute="item.dynamicAttribute"
        @hoverProduct="hoverProduct"
      />
    </div>
    <div class="product-name" :class="{ underline: isHovered }">
      {{ displayItem.name }}
    </div>
    <div class="web-id" v-if="isHovered">web ID: {{ displayItem.webId }}</div>
    <div class="product-brand-name" v-else>By {{ displayItem.brand.name }}</div>

    <CardPrice :price="displayItem.price" />

    <SalesTag v-show="displayItem?.price?.getSale" />

    <CardRating
      v-if="displayItem.reviews.rating > 0"
      :rating="displayItem.reviews.rating"
      :number="displayItem.reviews.number"
    />
    
    <!-- <DiscountTag :text="displayItem.labels[0]" v-show="shouldShowDiscountTag" /> -->
    <!-- <ProductDetailsDelivery :deliveryType="product?.delivery?.method" /> -->
  </div>
</template>

<script>
import CardPrice from "~/components/listing/product/card/CardPrice.vue";
import CardRating from "~/components/listing/product/card/CardRating.vue";

import TYPE_TEXT from "~/components/listing/product/dynamic-type/TYPE_TEXT.vue";
import THUMBNAIL from "~/components/listing/product/dynamic-type/THUMBNAIL.vue";
import SWATCH_THUMBNAIL from "~/components/listing/product/dynamic-type/SWATCH_THUMBNAIL.vue";
import LAYOUT_TEXT from "~/components/listing/product/dynamic-type/LAYOUT_TEXT.vue";
import LAYOUTIMAGE from "~/components/listing/product/dynamic-type/LAYOUTIMAGE.vue";

import SalesTag from "../tag/SalesTag.vue";
import DiscountTag from "../tag/DiscountTag.vue";

export default {
  name: "CardDetails",
  components: {
    CardPrice,
    CardRating,
    TYPE_TEXT,
    THUMBNAIL,
    SWATCH_THUMBNAIL,
    LAYOUT_TEXT,
    LAYOUTIMAGE,
    SalesTag,
    DiscountTag,
  },
  props: {
    item: {
      required: true,
      type: Object,
    },
    displayItem: {
      required: true,
      type: Object,
    },
    isHovered: {
      required: true,
      type: Boolean,
    },
  },
  computed: {
    shouldShowDiscountTag() {
      return (
        this.product.labels.length && this.product.labels[0] !== "clearance"
      );
    },
  },
  methods: {
    getComponentName(type) {
      const componentMap = {
        TEXT: "TYPE_TEXT",
        THUMBNAIL: "THUMBNAIL",
        SWATCH_THUMBNAIL: "SWATCH_THUMBNAIL",
        LAYOUT_TEXT: "LAYOUT_TEXT",
        LAYOUTIMAGE: "LAYOUTIMAGE",
      };
      return componentMap[type] || null;
    },
    hoverProduct(webId) {
      this.$emit("hoverProduct", webId);
    },
  },
};
</script>

<style scoped>
.details {
  text-align: left;
}

.product-name {
  font-size: 16px;
  letter-spacing: 1.2px;
  line-height: 20px;
  padding-top: 5px;
}

.product-name.underline {
  text-decoration: underline;
}

.product-brand-name {
  font-size: 14px;
  padding: 5px 0px;
}

.web-id {
  padding: 5px 0px;
  font-size: 14px;
}
</style>
