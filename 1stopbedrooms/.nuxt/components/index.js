export { default as CoreTopbar } from '../../components/core/Topbar.vue'
export { default as ListingFilterOption } from '../../components/listing/FilterOption.vue'
export { default as ListingProductList } from '../../components/listing/ProductList.vue'
export { default as ListingFilterItem } from '../../components/listing/filter/FilterItem.vue'
export { default as ListingFilterSection } from '../../components/listing/filter/FilterSection.vue'
export { default as ListingProductHeader } from '../../components/listing/product/Header.vue'
export { default as ListingProductPagination } from '../../components/listing/product/Pagination.vue'
export { default as ListingProductSelectedFilters } from '../../components/listing/product/SelectedFilters.vue'
export { default as SharedInputSelectField } from '../../components/shared/input/SelectField.vue'
export { default as SharedSkeletonFilterOptionSkeleton } from '../../components/shared/skeleton/FilterOptionSkeleton.vue'
export { default as SharedSkeletonProductListSkeleton } from '../../components/shared/skeleton/ProductListSkeleton.vue'
export { default as ListingProductCardDetails } from '../../components/listing/product/card/CardDetails.vue'
export { default as ListingProductCardGrid } from '../../components/listing/product/card/CardGrid.vue'
export { default as ListingProductCardImage } from '../../components/listing/product/card/CardImage.vue'
export { default as ListingProductCardItem } from '../../components/listing/product/card/CardItem.vue'
export { default as ListingProductCardPrice } from '../../components/listing/product/card/CardPrice.vue'
export { default as ListingProductCardRating } from '../../components/listing/product/card/CardRating.vue'
export { default as ListingProductDynamicTypeLAYOUTIMAGE } from '../../components/listing/product/dynamic-type/LAYOUTIMAGE.vue'
export { default as ListingProductDynamicTypeLAYOUTTEXT } from '../../components/listing/product/dynamic-type/LAYOUT_TEXT.vue'
export { default as ListingProductDynamicTypeSWATCHTHUMBNAIL } from '../../components/listing/product/dynamic-type/SWATCH_THUMBNAIL.vue'
export { default as ListingProductDynamicTypeTHUMBNAIL } from '../../components/listing/product/dynamic-type/THUMBNAIL.vue'
export { default as ListingProductDynamicTYPETEXT } from '../../components/listing/product/dynamic-type/TYPE_TEXT.vue'
export { default as ListingProductTagDiscountTag } from '../../components/listing/product/tag/DiscountTag.vue'
export { default as ListingProductTagImageTag } from '../../components/listing/product/tag/ImageTag.vue'
export { default as ListingProductTagSalesTag } from '../../components/listing/product/tag/SalesTag.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
