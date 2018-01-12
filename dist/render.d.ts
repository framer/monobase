import * as types from "./types";
export declare const page: (project: types.Project, page: string, cache?: boolean) => string;
export declare const script: (project: types.Project) => Promise<{}>;
