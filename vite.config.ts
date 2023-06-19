import {defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import eslint from "vite-plugin-eslint";
import fs from 'fs/promises';

export default defineConfig(({mode}) => {
   process.env = {...process.env, ...loadEnv(mode, process.cwd())};
   return {
    base: '/main/',
    build: {
      outDir: "build",
    },
    esbuild: {
      loader: "tsx",
      include: /src\/.*\.[tj]sx?$/,
      exclude: [],
    },
    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          {
            name: "load-js-files-as-jsx",
            setup(build) {
              build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
                loader: "jsx",
                contents: await fs.readFile(args.path, "utf8"),
              }));
            },
          },
        ],
      },
    },
    plugins: [
      react(), 
      viteTsconfigPaths(), 
      svgrPlugin(), 
      eslint()
    ],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/setupTests.ts'
    },
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/v2': {
          target: process.env.VITE_BACKEND_API,
          
        },
      },
    },
  };
});
