import typescript from "@rollup/plugin-typescript";
import serve from "rollup-plugin-serve";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";

export default {
    input: "src/index.ts",
    output: {
        file: "public/bundle.js",
        format: "iife",
    },
    plugins: [
        typescript(),
        nodeResolve({
            extensions: [".js"],
        }),
        replace({
            "process.env.NODE_ENV": JSON.stringify("development"),
        }),
        commonjs(),
        serve("public"),
    ],
};
