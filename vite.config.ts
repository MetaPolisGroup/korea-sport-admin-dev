import { defineConfig, PluginOption, } from 'vite'
import react from '@vitejs/plugin-react'
// plugin này giúp quan sát project bằng biểu đồ
import { visualizer } from "rollup-plugin-visualizer";
// Đường dẫn tương đối plugins
import tsconfigPaths from 'vite-tsconfig-paths';
// plugin này giúp convert svg sang url 
import svgrPlugin from "vite-plugin-svgr";
// plugin add style , optimize build
import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  visualizer(),
  tsconfigPaths(),
  createStyleImportPlugin({
    resolves: [AntdResolve()],
  }),
  svgrPlugin() as PluginOption],
  optimizeDeps: {
    include: ['firebase/app', 'firebase/firestore'],
  },
  server: {
    port: 3000,
  },
})
