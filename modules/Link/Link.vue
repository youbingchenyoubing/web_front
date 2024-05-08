<template></template>

<script>
import { useRoute, useRouter } from "vue-router"

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    router.replace({ path: route.params.route, query: route.query })
  }
}
</script>
