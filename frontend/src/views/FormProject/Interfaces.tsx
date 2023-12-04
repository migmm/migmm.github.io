export interface ProjectData {
    id: number | null;
    projectName: string;
    shortDescription: string;
    projectStatus: string;
    showInLandPage: boolean;
    gitURL: string;
    showReadme: boolean;
    deployURL: string;
    editorHtml: string;
    tags: string;
    lastUpdate: string;
}