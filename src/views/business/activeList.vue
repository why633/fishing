<template>
  <div class="activeList">
    <top-title :isBackPre="false" @backClick="colseWebview">我的赛事/活动</top-title>
  </div>
</template>

<script>
import HandleToken from '@/utils/handleToken'
import { appSource } from '@/utils/appSource'
const handleToken = new HandleToken()
export default {
  data () {
    return {
    }
  },
  mounted () {
    if (appSource() === 'ios') {
      window['getToken'] = (result) => {
        alert(`${new Date()}:${result}`)
        this.setToken(result)
      }
    }
    if (appSource() === 'andriod') {
      alert(window.android.getToken())
      this.setToken(window.android.getToken())
    }
  },
  created () {
  },
  methods: {
    colseWebview () {
      console.log('closeWebview')
      if (appSource() === 'ios') {
        App.popBack('popBack') // eslint-disable-line
      }
      if (appSource() === 'andriod') {
        console.log('andriod')
        window.android.closePage()
      }
    },
    setToken (token) {
      handleToken.setToken(token)
    }
  }
}
</script>
