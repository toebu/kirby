/* eslint-env node */
import path from "path";

import { defineConfig, splitVendorChunkPlugin } from "vite";
import vue from "@vitejs/plugin-vue2";
import { viteStaticCopy } from "vite-plugin-static-copy";
import externalGlobals from "rollup-plugin-external-globals";
import externalize from "vite-plugin-externalize-dependencies";
import kirby from "./scripts/vite-kirby.mjs";

/**
 * Gather the plugins based on the context
 */
function definePlugins(command) {
	const plugins = [vue(), splitVendorChunkPlugin(), kirby()];

	if (command === "build") {
		plugins.push(
			viteStaticCopy({
				targets: [
					{
						src: "node_modules/vue/dist/vue.min.js",
						dest: "js"
					}
				]
			})
		);
	}

	if (!process.env.VITEST) {
		plugins.push(
			// Externalize Vue so it's not loaded from node_modules
			// but accessed via window.Vue
			{
				...externalGlobals({ vue: "Vue" }),
				enforce: "post"
			},
			externalize({ externals: ["kirby"] })
		);
	}

	return plugins;
}

/**
 * Create vite configuration
 */
export default defineConfig(({ command }) => {
	let customServer;
	try {
		customServer = require("./vite.config.custom.js");
	} catch (err) {
		customServer = {};
	}

	const proxy = {
		target: process.env.VUE_APP_DEV_SERVER ?? "http://sandbox.test",
		changeOrigin: true,
		secure: false
	};

	const config = {
		plugins: definePlugins(command),
		define: {
			// Fix vuelidate error
			"process.env.BUILD": JSON.stringify("production")
		},
		base: "./",
		build: {
			minify: "terser",
			cssCodeSplit: false,
			rollupOptions: {
				input: {
					kirby: "./src/kirby/index.js",
					index: "./src/index.js"
				},
				output: {
					entryFileNames: "js/[name].min.js",
					chunkFileNames: "js/[name].min.js",
					assetFileNames: "[ext]/[name].min.[ext]"
				},
				external: ["kirby"]
			}
		},
		optimizeDeps: {
			entries: "src/**/*.{js,vue}",
			exclude: ["vitest", "vue"],
			holdUntilCrawlEnd: false
		},
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "src")
			}
		},
		server: {
			proxy: {
				"/api": proxy,
				"/env": proxy,
				"/media": proxy
			},
			open: proxy.target + "/panel",
			port: 3000,
			...customServer
		},
		test: {
			environment: "node",
			include: ["**/*.test.js"],
			setupFiles: ["vitest.setup.js"]
		}
	};

	// Add alias for `kirby` package for testing
	if (process.env.VITEST) {
		config.resolve.alias.kirby = path.resolve(__dirname, "src/kirby/index.js");
	}

	return config;
});
