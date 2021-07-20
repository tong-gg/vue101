<template>
  <div>
      <Counter init-number="0"></Counter>
      <Counter init-number="100"></Counter>
      <Counter init-number="-10"></Counter>
      <Counter></Counter>
  </div>
</template>

<script>
import Counter from '@/components/Counter.vue'
export default {
    components: {
        Counter
    }
}
</script>

<style lang="scss" scoped>

</style>