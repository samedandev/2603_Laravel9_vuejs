import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "centered" | "default" | "plain"
declare module "C:/_apps/_2026/03_VueJS_Laravel/laravel-course-backend-main/laravel-course-backend-main/frontend/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}