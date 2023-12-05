
export interface ProjectData {
    projectName: string;
    category: string;
    projectStatus: string;
    deployURL: string;
    gitURL: string;
    lastUpdate: string;
    tags: string;
    coverImage: string;
    headerTitle: string;
    editorHtml: string;
    id: string;
}

export interface HeroStylesProps {
    bg: string;
}

export interface ViewProjectProps {
    user: any;
}