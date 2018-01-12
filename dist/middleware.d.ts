import * as express from "express";
import * as types from "./types";
export declare const reload: any;
export declare const nocache: (req: any, res: any, next: any) => void;
export declare const addslash: (req: any, res: any, next: any) => void;
export declare const logging: express.RequestHandler;
export declare const errors: (project: types.Project) => (err: Error, req: any, res: any, next: any) => void;
