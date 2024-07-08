<template>
  <div :class="['tag', tagClass]">
    {{ tagText }}
  </div>
</template>

<script>
export default {
  name: "ImageTag",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    tagClass() {
      switch (this.item.tags.primaryDealTag) {
        case "daily_deal":
          return "daily-deal";
        case "clearance":
          return "clearance";
        default:
          return "";
      }
    },
    tagText() {
      switch (this.item.tags.primaryDealTag) {
        case "daily_deal":
          return "Daily Deal";
        case "clearance":
          return "Clearance";
        default:
          return "";
      }
    },
  },
};
</script>

<style scoped>
.tag {
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 5px 10px;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 15px;
}

.daily-deal {
  background-color: blue;
}

.clearance {
  background-color: orange;
}
</style>
