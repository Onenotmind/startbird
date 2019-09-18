<template>
  <div id="BookInfo" v-bind="$attrs">
    <div class="book_cover">
      <div class="image">
        <img :src="bookInfo.bookCover" class="cover_image"/>
      </div>
      <div class="rate">
        <Rate :disabled="true" :init-index="bookInfo.rateIndex" size="medium" style="width:190px"></Rate>
      </div>
      <div class="share-box">
        <span>Share to:</span>
        <div @click="" class="icon-sprites twitter"></div>
        <div @click="" class="icon-sprites facebook"></div>
        <div @click="" class="icon-sprites reddit"></div>
      </div>
      <div class="basic-info">
        <span>Author: {{ bookInfo.author }}</span>
      </div>
    </div>
    <div class="book_info_area">
      <div class="title">
        {{ bookInfo.title }}
      </div>
      <div
        class="price"
        :style="{'color': bookInfo.price === 'FREE' ? '#333': '#209cee' }">
        {{ bookInfo.price || 'FREE' }}
        <CustomButton type="success" :style="customBtnStyle"> {{ isSubscription ? 'CANCEL SUBCRCIPTION' : 'SUBCRCIPTION' }}</CustomButton>
      </div>
      <div class="intro">
        <div>
          <i class="category"></i>fantacy
        </div>
        <div>
          <i class="coupon"></i>wuxia world
        </div>
        <div>
          <i class="start"></i>Complete
        </div>
      </div>
      <div class="book-opt">
        <CustomButton type="success" :style="customBtnStyle"> {{ readOrPurchaseText }}</CustomButton>
        <CustomButton type="primary" :style="customBtnStyle"> {{ isSubscription ? 'CANCEL SUBCRCIPTION' : 'SUBCRCIPTION' }}</CustomButton>
        <CustomButton v-if="!isAbleRead" type="warning" :style="customBtnStyle"> READ FREE CHAPTER</CustomButton>
      </div>
      <div>
        <BookOpt 
        :description="bookInfo.description"
        :chapterArr="chapterArr"
        @read-chapter="readChapter"/>
      </div>
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
  width : 62%;
  min-height:375px;
  height:auto;
  text-align: left;
}
.title {
  color: #333;
  font: 25px 'Roboto', sans-serif;
  padding-top: 2%;
  height: auto;
  width: 100%;
  font-weight: 800;
  font-family: "Song Myung"
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
.share-box {
  margin-top: 15px;
}
.share-box span {
  width: 70px;
  font-size: 14px;
  line-height: 18px;
  color: #899096;
  vertical-align: top
}
.icon-sprites {
  width: 18px;
  height:18px;
  margin-right: 10px;
  display: inline-block;
  cursor: pointer;
}
.twitter {
  background-image: url('../img/twitter.png');
  background-repeat: no-repeat;
}
.facebook {
  background-image: url('../img/facebook.png');
  background-repeat: no-repeat;
}
.reddit {
  background-image: url('../img/reddit.png');
  background-repeat: no-repeat;
}
.basic-info {
  margin-top: 10px;
}
.basic-info span {
  font-size: 14px;
  line-height: 18px;
  color: #899096;
}
.book-operate {
  margin-top: 15px;
}
.intro {
  margin-top: 10px;
  color: #899096;
  line-height: 19px;
  &>div{
    display: inline-block;
    color: #899096;
    font-size: 14px;
    margin-right: 20px;
    i{
      display: inline-block;
      margin-right: 5px;
      height:14px;
      width: 14px;
    }
  }
}
.category {
  background-image: url('../img/category.png');
  background-repeat: no-repeat;
}
.coupon {
  background-image: url('../img/coupon.png');
  background-repeat: no-repeat;
}
.start {
  background-image: url('../img/start.png');
  background-repeat: no-repeat;
}
.book-opt {
  margin-top: 15px;
}
.price {
  margin-top: 15px;
  font: 21px 'Roboto', sans-serif;
  width: 100%;
  font-weight: 600;
  font-family: "Song Myung"
}

</style>
<script>
import BookOperator from './book-operator.vue'
import BookOpt from './book-opt.vue'
import serverRequest from '@/libs/server-request.js'
export default {
  name: 'BookInfo',
  components: {
    BookOperator,
    BookOpt
  },
  props: {
    bookInfo: {
      type: Object,
      default: () => ({})
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
        'width': '159px',
        'margin-bottom': '15px',
        'font': "13px 'Roboto', sans-serif",
        'line-height': '25px'
      },
      chapterArr: []
    }
  },
  computed: {
    priceText: function () {
      if (this.isVip) return 'VIP FREE'
      if (this.isBuy) return 'PURCHASED'
      return this.bookInfo.price
    },
    isAbleRead: function () {
      return (this.isVip || this.isBuy || this.bookInfo.price === 'FREE')
    },
    readOrPurchaseText: function () {
      if (this.isAbleRead) return 'READ'
      return 'PURCHASE or VIP'
    }
  },
  watch: {
  },
  mounted () {
    this.getAllChapters()
  },
  methods: {
    // get all chapters
    async getAllChapters () {
      const data = await serverRequest.getNovelAllChapter(this.bookInfo.bookId)
      if (data.data && data.data.status) {
        console.warn('data:', data.data.data)
        const res = JSON.parse(data.data.data)
        this.chapterArr = res.data.sort((a, b) => (parseInt(a.chapter_index) > parseInt(b.chapter_index)) ? 1 : -1)
      }
    },
    readChapter (id) {
      this.$emit('read-chapter', id)
    }
  }
}
</script>
