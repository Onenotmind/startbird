<template>
  <div id="BookInfo" v-bind="$attrs">
    <div class="book_cover">
      <div class="image">
        <img :src="bookCover" class="cover_image"/>
      </div>
      <div class="rate">
        <Rate :disabled="true" :init-index="rateIndex" size="medium" style="width:190px"></Rate>
      </div>
    </div>
    <div class="book_info_area">
      <div class="title">
        {{ title }}
      </div>
      <div class="author">
        {{ author }}
      </div>
      <div class="description">
        <p>{{ description }}</p>
      </div>
    </div>
    <div class="book_purchase_subscription_area">
      <BookOperator />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#BookInfo {
  width: 100%;
  height: auto;
}
.book_cover {
  position: relative;
  float: left;
  width: 25%;
  min-height: 375px;
  text-align: left;
  margin-left: 10px;
}
.image {
  display: block;
}
.cover_image {
  width: 190px;
  height: 280px;
  margin-top: 5%;
  box-shadow: 2px 2px 2px rgb(99,99,99);
}
.book_info_area {
  position: relative;
  display: inline-block;
  width : 42%;
  min-height:375px;
  height:auto;
}
.title {
  color: rgb(109,113,113);
  font: 25px 'Roboto', sans-serif;
  padding-top: 2%;
  height: auto;
  width: 100%;
}
.author {
  color: rgb(109,113,113);
  font: 16px 'Roboto', sans-serif;
  margin-top:2%;
  height:35px;
  width: 100%;
}
.description {
  color: rgb(153,156,157);
  font: 12px 'Roboto', sans-serif;
  margin-bottom:2px;
  width: 100%;
}
.book_purchase_subscription_area {
  position: relative;
  float: right;
  margin-right: 0px;
  width: 30%;
  min-height:375px;
  overflow: hidden;
  padding-top:13px;
}
</style>
<script>
import BookOperator from './book-operator.vue'
export default {
  name: 'BookInfo',
  components: {
    BookOperator
  },
  props: {
    bookCover: {
      type: String,
      default: 'https://dailylit.com/media/images/covers/85.jpg'
    },
    rateIndex: {
      type: Number,
      default: 3
    },
    title: {
      type: String,
      default: 'Zuleika Dobson: or, an Oxford Love Story'
    },
    author: {
      type: String,
      default: 'Sir Max Beerbohm'
    },
    description: {
      type: String,
      default: 'Death cancels all engagements," in this morbidly funny satire of undergraduate life at Oxford. When a beautiful magician swears she can love no man susceptible to her charms she sets off a dangerous taste for suicide among the college boys'
    }
  },
  data () {
    return {
      
    }
  },
  computed: {
    
  },
  watch: {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
