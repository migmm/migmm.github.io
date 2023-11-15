export interface DataItem {
    courseTitle: any;
    id: number;
    courseImage: string;
    urlCheck: string;
}

export interface HeroStylesProps {
    bg: string;
}

export interface CertificateData {
    courseTitle: any;
    id: number;
    courseImage: string;
    urlCheck: string;
    issueDate: string;
    type: 'certification' | 'badge';
}

