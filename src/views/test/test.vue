<template>
  <div class="test">TEST</div>
</template>

<script>
import { test } from '@/api/testApi'
export default {
  data () {
    return {

    }
  },
  created () {
    test({ pickUpApplyId: '296' }).then(res => {
      console.log(res)
    })
  }
}
</script>
