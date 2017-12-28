import * as types from "./types";
export declare const build: (project: types.Project, path: string) => Promise<void>;
export declare const serve: (project: types.Project, port?: number) => Promise<void>;
