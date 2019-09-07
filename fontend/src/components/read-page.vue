<template>
  <div id="readPage" v-bind="$attrs">
    <div class="read_header">
      <span class="title">
        <a class="change" :href="bookSrc">
        {{ title }}
        </a>
      </span>
      <span class="catagory">
        <a class="change catagory-text" :href="bookContentSrc">
        Content
        </a>
      </span>
      <span class="page-turn">
        <a class="change" :href="previousChapterSrc">
          Previous
        </a>
      </span>
      <span class="page-turn">
        <a class="change" :href="nextChapterSrc">
          Next
        </a>
      </span>
    </div>
    <div class="read_content">
      <div v-for="(item, index) in contentArr" :key="'content' + index">
        <h2 class="content_title" align="center" v-if="item.type === 'title'">
          {{ item.content}}
        </h2>
        <p class="content_text" align="justify" v-if="item.type === 'content'">
          {{ item.content}}
        </p>
      </div>
    </div>
    <div class="read_footer">
      <span class="page-turn">
        <a class="change" :href="previousChapterSrc">
          Previous
        </a>
      </span>
      <span class="page-turn">
        <a class="change" :href="nextChapterSrc">
          Next
        </a>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#readPage {
  padding-bottom: 60px;
}
.read_header {
  border-bottom:1px solid #6d7171;
  text-align:center
}
span {
  color:#6d7171;
  font:italic 24px crimson text,serif
}
.title {
  margin: 20px;
}
a.change{
  color:#6d7171;text-decoration:none
}
a.change:hover{
  color:#58aff6;
  cursor:pointer
}
.page-turn {
  font: italic 15px crimson text,serif;
}
.read_content {
  width:75%;
  margin-left:auto;
  margin-right:auto;
  font:18px crimson text,serif
}
.catagory-text {
  font-size:20px;
}
p.content_text {
  text-indent:5%;
  margin-top:0px;
  margin-bottom:0px;
  text-align:justify;
  font:18px 'Crimson Text', serif;
  margin-left:10%;
  margin-right:10%
}
h2.content_title {
  font-size:large;
  font-family:Roboto, sans-serif;
  font-style:normal;
  text-align:center;
  padding-top:3em;
  padding-bottom:2em
}
.read_footer {
  text-align:center;
  border-top:1px solid #6d7171;
  margin-top:10px;
  padding-top:5px
}
</style>
<script>

export default {
  name: 'ReadPage',
  components: {
    
  },
  props: {
    title: {
      type: String,
      default: 'Zuleika Dobson: or, an Oxford Love Story'
    },
    bookSrc: {
      type: String,
      default: ''
    },
    bookContentSrc: {
      type: String,
      default: ''
    },
    previousChapterSrc: {
      type: String,
      default: ''
    },
    nextChapterSrc: {
      type: String,
      default: ''
    },
    contentArr: {
      type: Array,
      default: () => ([{
        type: 'title',
        content: 'II'
      }, {
        type: 'content',
        content: 'hello'
      }])
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
