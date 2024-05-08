<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 400px; overflow-y: auto"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>
<script>
import "@wangeditor/editor/dist/css/style.css" // 引入 css
import { shallowRef } from "vue"
import { Editor, Toolbar } from "@wangeditor/editor-for-vue"
import { BASIC_CONFIG } from "@share/request/basic"

// https://www.wangeditor.com/v5/for-frame.html#%E4%BD%BF%E7%94%A8-1
export default {
  components: { Editor, Toolbar },
  emits: ["onChange"],
  props: {
    defaultValue: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      valueHtml: "",
      toolbarConfig: {},
      editorConfig: {
        placeholder: "请输入内容...",
        MENU_CONF: {
          uploadImage: {
            fieldName: "file",
            headers: {
              Authorization: localStorage.getItem("token")
            },
            maxNumberOfFiles: 10,
            allowedFileTypes: ["image/*"],
            timeout: 10000,
            server: `${BASIC_CONFIG.baseURL}/upload/uploadFileWithWangEditor`
          },
          uploadVideo: {
            fieldName: "file",
            headers: {
              Authorization: localStorage.getItem("token")
            },
            maxFileSize: 5 * 1024 * 1024,
            maxNumberOfFiles: 1,
            allowedFileTypes: ["video/*"],
            timeout: 15 * 1000,
            server: `${BASIC_CONFIG.baseURL}/upload/uploadFileWithWangEditor`
          }
        }
      },
      mode: "default",
      editorRef: shallowRef()
    }
  },
  methods: {
    handleCreated(editor) {
      this.editorRef = editor // 记录 editor 实例，重要！
    }
  },
  watch: {
    valueHtml: {
      immediate: true,
      handler(n) {
        this.$emit("onChange", n)
      }
    }
  },
  onBeforeUnmount() {
    const editor = this.editorRef
    if (editor == null) return
    editor.destroy()
  }
}
</script>
