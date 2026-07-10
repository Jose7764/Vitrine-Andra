import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: ["public/admin/**", "tina/__generated__/**", ".npm-cache/**"]
  },
  ...nextCoreWebVitals,
  ...nextTypescript
];

export default eslintConfig;
