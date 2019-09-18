<template>
  <div id="bookList" v-bind="$attrs">
    <div class="list-header" v-if="headerShow">
      <div class="category-title">
        {{ categoryTitle }}
      </div>
      <div class="sort">
        <a class="browse_sort_link ">RATING</a>
        <a class="browse_sort_link ">NEWEST</a>
      </div>
    </div>
    <div class="book-list" v-if="bookItemArr.length > 0">
      <BookItem
        v-for="(item, idx) in bookItemArr"
        :key="'bookitem' + idx"
        :bookSrc="item.novel_origin_url"
        :bookCover="item.novel_cover_img_url"
        :title="item.novel_name"
        :author="item.novel_author"
        :price="item.novel_price"
        :bookId="item.novel_id"
        :description="item.novel_desciption"
        @switch-to-bookinfo="switchToBookInfo" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.book-list {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.list-header {
  position: relative;
  height: 30px;
}
.category-title {
  text-align: left;
  float: left;
  position: relative;
  height: 100%;
  width: 60%;

  font: bold 20px 'Roboto', sans-serif;
  color: rgb(89,93,92);
}
.sort {
  padding-top: 6px;
  margin-left: 460px;
  text-align: right
}
a.browse_sort_link {
  padding: 5px;
  font: 12px 'Roboto', sans-serif;
  color: rgb(131, 132, 134);
}
a {
  text-decoration: none;
  font: 15px roboto condensed,sans-serif;
  cursor: pointer;
}
a.nav-link:hover {
  color: #6ab5f3
}
</style>
<script>
import BookItem from './book-item.vue'
export default {
  name: 'BookList',
  components: {
    BookItem
  },
  props: {
    bookItemArr: {
      type: Array,
      default: () => ([])
    },
    headerShow: {
      type: Boolean,
      default: false
    },
    categoryTitle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  mounted () {

  },
  methods: {
    switchToBookInfo (val) {
      this.$emit('switch-to-bookinfo', val)
    }
  }
}
</script>
