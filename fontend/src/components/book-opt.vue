<template>
  <div id="bookOpt" class="tab" v-bind="$attrs">
    <ul class="tab-tit">
      <li :class="{'active': cutOpt === 'about'}" >
        <div class="tab-icon-sprites icon-about" @click="cutOpt = 'about'"></div>
        <span @click="cutOpt = 'about'">About</span>
      </li>
      <li :class="{'active': cutOpt === 'chapter'}">
        <div class="tab-icon-sprites icon-books" @click="cutOpt = 'chapter'"></div>
        <span @click="cutOpt = 'chapter'">Table Of Contents</span>
      </li>
    </ul>
    <div class="tab-about" v-if="cutOpt === 'about'">
      <p>{{ description }}</p>
    </div>
    <div class="tab-chapters" v-if="cutOpt === 'chapter'">
      <ul>
        <li v-for="(chapter, idx) in chapterArr">
          <span @click="changeChapter(chapter.chapter_id)">{{idx + 1}} {{ chapter.chapter_name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tab {
  width: 100%;
  border-radius: 4px;
  margin-bottom: 60px;
  .tab-tit {
    position: relative;
    height: 70px;
    width: 100%;
    margin-top: 40px;
    border-bottom: 1px solid #eae8e8;
    li {
      height: 70px;
      line-height: 70px;
      float: left;
      color: #333;
      font-size: 18px;
      font-weight: bold;
      margin-right: 40px;
      cursor: pointer;
      span {
        display: inline-block;
        height: 25px;
        margin-left: 6px;
        line-height: 25px;
        margin-top: 24px;
      }
    }
    .active {
      color: #209cee;
      border-bottom: 2px solid #cfa668;
      i {
        background-position: 0 -51px;
      }
    }

    .sort {
      display: none;
      //display: block;
      position: absolute;
      top: 28px;
      right: 28px;
      width: 18px;
      height: 18px;
      background-position: -400px -450px;
    }
    .sorts {
      background-position: -350px -450px;
    }
  }
}
.tab-icon-sprites {
  width: 22px;
  height: 22px;
  display: inline-block;
  vertical-align: middle;
}
.icon-about {
  background-image: url('../img/about.png');
  background-repeat: no-repeat;
}
.icon-books {
  background-image: url('../img/ibooks.png');
  background-repeat: no-repeat;
}
.tab-about {
  padding-left: 30px;
  padding-right: 30px;
  box-sizing: border-box;
  width: 100%;
  line-height: 25px;
  color: #333;
  font-size: 14px;
}
.tab-chapters {
  width: 100%;
  overflow: hidden;
}
.tab-chapters ul {
  width: 100%;
  overflow: hidden;
  li {
    float: left;
    width: 46%;
    margin-right: 4%;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #eae8e8;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 400;
    font-size: 18px;
    a {
      color: #209cee;
    }
  }
}
</style>
<script>

export default {
  name: 'BookOpt',
  components: {
    
  },
  props: {
    description: {
      type: String,
      default: ''
    },
    chapterArr: {
      type: Array,
      defualt: () => ([])
    }
  },
  data () {
    return {
      cutOpt: 'about'
    }
  },
  computed: {
    
  },
  watch: {
  },
  mounted () {
  },
  destroyed () {

  },
  methods: {
    changeChapter (id) {
      this.$emit('read-chapter', id)
    }
  }
}
</script>
