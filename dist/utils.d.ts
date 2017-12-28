export declare const mkdir: (path: any) => void;
export declare const cp: (source: string, dest: string) => Promise<{}>;
export declare const rmdir: (dir: string) => void;
export declare const stats: (path: string) => Promise<{
    files: number;
    dirs: number;
    bytes: number;
}>;
export declare const glob: (query: string) => Promise<string[]>;
export declare const replaceExtension: (dir: any, ext: any) => string;
