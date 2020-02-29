export function suggestions(error: Error): string {
  if (error.stack.includes("webpackMissingModule")) {
    const r = /Cannot find module '(.*)'/.exec(error.message);
    if (r.length > 1) {
      const moduleName = r[1];
      return `😒 It seems like you don't have a module installed called "${moduleName}". First, try to make sure all modules are installed by running "yarn". If that doesn't work, someone might have forgotten to add the module to the project, but is actually using it somewhere. You can add it by running: "yarn add ${moduleName}".`;
    }
  }

  return "";
}
