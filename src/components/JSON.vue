<template>
  <code class="json">{{ content }}</code>
</template>

<script>
import { formatJSON } from "@share/helper"

export default {
  props: {
    code: String
  },
  computed: {
    content() {
      return this.code ? formatJSON(this.code.trim()) : ""
    }
  }
}
</script>

<style lang="scss" scoped>
.json {
  width: 100%;
  white-space: pre-wrap;
  background-color: #f5f5f5;
}
</style>
