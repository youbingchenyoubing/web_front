import { useGlobalUserStore } from "@store/UserGlobalStore"

/**
 * @type {import("vue").Directive}
 */
export const AuthDirective = {
  name: "auth",
  mounted(el, binding) {
    const permissions = useGlobalUserStore().permissions
    const value = binding.value
    if (!value) {
      throw "v-auth: value 参数必传"
    }
    if (!permissions || !el) return
    if (permissions.includes("*:*:*")) return
    if (permissions.includes(value)) return

    const parent = el.parentElement
    parent && parent.removeChild(el)
  }
}
