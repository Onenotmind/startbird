<template>
  <div id="bookItem" v-bind="$attrs" @click="switchToBookInfo">
    <a>
      <div class="book_cover">
        <img :src="bookCover" class="book_cover_image">
      </div>
    </a>
  <div class="rate">
    <Rate :disabled="true" :init-index="rateIndex"></Rate>
  </div>
  <div class="title">
    {{ title }}
  </div>
  <div class="author">
    {{ author }}
  </div>
  </div>
</template>

<style lang="scss" scoped>
#bookItem {
  display: inline-block;
  text-align: center;
  width: 100px;
  height: auto;
}
a {
  text-decoration: none;
  cursor: pointer;
}
.book_cover {
  position: relative;
  top: 24px;
  width: 100%;
  padding-bottom: 30%;
  height: auto;
}
img.book_cover_image {
  width: 98px;
  height: 155px;
  margin-top: 9px;
  box-shadow: 2px 2px 2px #bebebe;
}
.title{
  color: #6d7171;
  position: relative;
  padding-bottom: 1%;
  overflow: hidden;
  font: 14px roboto,sans-serif;
  text-align: center;
  width: 100%;
}
.author {
  color: #6d7171;
  position: relative;
  margin-bottom: 10px;
  overflow: hidden;
  font: 11px roboto,sans-serif;
  text-align: center;
  width: 100%;
}
</style>
<script>

export default {
  name: 'BookItem',
  props: {
    bookCover: {
      type: String,
      default: 'https://dailylit.com/media/images/covers/85.jpg'
    },
    bookSrc: {
      type: String,
      default: 'https://baidu.com'
    },
    price: {
      type: String,
      default: ''
    },
    bookId: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: 'Anna Karenina'
    },
    rateIndex: {
      type: Number,
      default: 3
    },
    author: {
      type: String,
      default: 'Leo Tolstoy'
    },
    description: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    switchToBookInfo() {
      this.$emit('switch-to-bookinfo', {
        bookCover: this.bookCover,
        bookSrc: this.bookSrc,
        title: this.title,
        rateIndex: this.rateIndex,
        author: this.author,
        price: this.price,
        bookId: this.bookId,
        description: this.description
      })
    }
  }
}
</script>
