<template>
  <div id="BookOperator" v-bind="$attrs">
    <div class="price">{{ priceText }}</div>
    <CustomButton type="success" :style="customBtnStyle"> {{ readOrPurchaseText }}</CustomButton>
    <br v-if="!inMyBooks">
    <CustomButton v-if="!inMyBooks" type="primary" :style="customBtnStyle"> Add to My Books</CustomButton>
    <br>
    <CustomButton type="success" :style="customBtnStyle"> {{ isSubscription ? 'CANCEL SUBCRCIPTION' : 'SUBCRCIPTION' }}</CustomButton>
    <br v-if="isAbleRead">
    <CustomButton v-if="!isAbleRead" type="warning" :style="customBtnStyle"> READ FREE CHAPTER</CustomButton>
  </div>
</template>

<style lang="scss" scoped>
#BookOperator {
  display: inline-block;
  text-align: center;
  width:250px;
  background-color: rgb(237,239,239);
  box-shadow: 2px 2px 2px rgb(193,193,193);
  z-index: 1;
  overflow: hidden;
  padding-top: 20px;
  padding-bottom: 20px;
}
.price {
  color: rgb(109,113,113);
  font-size: bold 24px 'Roboto', sans-serif;
  padding-bottom: 10px;
  font-weight: 700
}
</style>
<script>

export default {
  name: 'BookOperator',
  components: {
    
  },
  props: {
    price: {
      type: String,
      default: '$1.9'
    },
    isVip: {
      type: Boolean,
      default: false
    },
    isBuy: {
      type: Boolean,
      default: false
    },
    inMyBooks: {
      type: Boolean,
      default: false
    },
    isSubscription: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      customBtnStyle: {
        'width': '199px',
        'margin-bottom': '15px',
        'font': "13px 'Roboto', sans-serif",
        'line-height': '25px'
      }
    }
  },
  computed: {
    priceText: function () {
      if (this.isVip) return 'VIP FREE'
      if (this.isBuy) return 'PURCHASED'
      return this.price
    },
    isAbleRead: function () {
      return (this.isVip || this.isBuy || this.price === 'FREE')
    },
    readOrPurchaseText: function () {
      if (this.isAbleRead) return 'READ'
      return 'PURCHASE or VIP'
    }
  },
  watch: {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
