import typescript from "@rollup/plugin-typescript";
import serve from "rollup-plugin-serve";

export default {
    input: "src/index.ts",
    output: {
        file: "public/bundle.js",
        format: "iife",
    },
    plugins: [typescript(), serve("public")],
};
