<template>
  <div>
    <EssentialInformation />
    <RolesInformation />
  </div>
</template>

<script>
import EssentialInformation from "./modules/EssentialInformation.vue"
import RolesInformation from "./modules/RolesInformation.vue"
export default {
  components: { EssentialInformation, RolesInformation }
}
</script>
