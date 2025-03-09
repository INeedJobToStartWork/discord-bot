import { defaultConfig } from "commitsmile";

export default defaultConfig({}).deepMerge({
  prompts: {
    description: false,
    scopes: { custom: true, workspaces: true, options: ["🌍 Enviroment"] },
  },
});
