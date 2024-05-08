<template>
  <el-input v-model="input" v-bind="$attrs" disabled>
    <template #append>
      <el-button @click="onShowIconDiaLog">
        <el-icon><Search /></el-icon>
      </el-button>
    </template>
  </el-input>
  <el-dialog v-model="IconDialog" title="选择图标" width="45%">
    <section class="icon-search">
      <el-input v-model="searchInput" placeholder="请输入关键词进行筛选" />
    </section>
    <div class="icon-list">
      <section
        class="icon-item"
        v-for="icon in iconOptions"
        :key="icon"
        @click="handleClick(icon)"
      >
        <el-icon class="icon-each"
          ><component :is="icon" class="icon-each"
        /></el-icon>
        <span :title="icon">{{ icon }}</span>
      </section>
    </div>
  </el-dialog>
</template>

<script>
import { ICONS } from "@constants/icons"

export default {
  inheritAttrs: false,
  props: ["modelValue"],
  emits: ["update:modelValue"],
  data() {
    return {
      iconOptions: [],
      searchInput: "",
      IconDialog: false
    }
  },
  computed: {
    input: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit("update:modelValue", value)
      }
    }
  },
  methods: {
    handleClick(icon) {
      this.input = icon
      this.searchInput = ""
      this.IconDialog = false
    },
    onShowIconDiaLog() {
      this.IconDialog = true
    }
  },
  watch: {
    searchInput(n) {
      clearTimeout(() => this.searchInputTimeout)
      this.searchInputTimeout = setTimeout(() => {
        this.iconOptions = n
          ? this._iconOptions.filter(name => new RegExp(n, "i").test(name))
          : [...this._iconOptions]
      }, 700)
    }
  },
  created() {
    this._iconOptions = this.iconOptions = ICONS
  }
}
</script>

<style lang="scss" scoped>
.icon-search {
  margin-bottom: 4px;
}
.icon-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 20%);
  height: 350px;
  overflow-y: auto;

  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
    height: 4.6rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    padding: 4px 0;
    border: 1px solid #cecece42;
    &:hover {
      background-color: #f2f6fc;
    }

    .icon-each {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
}
</style>
