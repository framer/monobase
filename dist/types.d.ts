export declare type ProjectConfiguration = {
    pages: string;
    components: string;
    static: string;
    componentScript: string;
};
export declare type Project = {
    path: string;
    context: any;
    config: ProjectConfiguration;
    build: "debug" | "production";
};
