import nested from "postcss-nested";
import tailwindConfig from "tailwindcss";
import autoprefixer from "autoprefixer";

export default {
    plugins: [
        nested,
        tailwindConfig,
        autoprefixer,
    ],
}
