<template>
  <div class="comment">
    <div>
      <textarea
        v-model="content"
        maxlength="200"
        placeholder="清晰的描述有助于更快地解决您的问题">
      </textarea>
    </div>
    <span class="comment-btn" @click="submit">提交</span>
    <div class="comment-list">
      <div
        class="comment-item"
        v-for="(comment, index) in commentList"
        :key="`comment${index}`"
       >
        <div class="comment-content border-bottom-line">
          <p v-html="comment.comment"></p>
          <p class="time">{{ comment.name || '匿名用户' }} {{ comment.time || '刚刚'}}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import moment from 'moment'
export default {
  name: 'Comment',
  data () {
    return {
      commentList: [],
      content: ''
    }
  },
  mounted () {
    this.query()
  },
  methods: {
    async query () {
      const { data: { data = [], status = 0 } = {} } = await axios.get('/api')
      if (Number(status) === 0) return
      this.commentList = data
    },
    async submit () {
      const params = {
        name: 'eee',
        comment: this.content,
        time: moment(new Date()).format('MM-DD HH:mm:ss')
      }
      const { data: { status = 0 } = {} } = await axios.post('/api/submit', qs.stringify(params))
      if (Number(status) === 0) return
      this.query()
    }
  }
}
</script>
<style scoped lang="less">
.comment {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  &-btn {
    display: block;
    width: 80px;
    padding: 10px;
    font-size: 16px;
    border-radius: 4px;
    background-color: #4678FF;
    color: #fff;
    font-weight: bold;
    margin-bottom: 10px;
  }
  &-list,
  &-content,
  &-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  &-item {
    font-size: 12px;
    color: #323232;
  }
  &-content {
    .time {
      font-size: 12px;
      color: #969696;
    }
  }
  textarea {
    color: #323232;
    width: 100%;
    height: 100px;
    font-size: 14px;
    border: 1px solid #f0f0f0;
    outline: none;
    resize: none;
    margin-bottom: 10px;
  }
}
</style>
