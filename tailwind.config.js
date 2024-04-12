/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
import flowbite from "flowbite/plugin";

// eslint-disable-next-line no-undef
export default withMT({
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
        "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                default: "#5D4037"
            },
            backgroundColor: {
                primary: "#F4EFEB",
                btnDisable: "#A1887F",
                btnActive: "#5D4037",
                select: "#E57905"
            },
            width: {
                90: "360px",
                15: "60px",
                25: "100px",
                30: "120px",
                142: "572px"
            },
            zIndex: {
                99: "99",
                999: "999",
                9999: "9999",
            },
            height: {
                25: "100px",
                30: "120px",
                142: "572px",
                125: "500px"
            },
            margin: {
                25: "100px"
            },
            maxHeight: {
                65: "260px"
            }
        },
        boxShadow: {
            "base": "rgba(0, 0, 0, 0.16) 0px 1px 4px"
        },
        fontFamily: {
            Poppings: ["Poppins", "sans-serif"],
        },
        screens: {
            'sm': '640px',
            // => @media (min-width: 640px) { ... }

            'md': '768px',
            // => @media (min-width: 768px) { ... }

            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }

            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
        },
    },
    plugins: [flowbite],
});
