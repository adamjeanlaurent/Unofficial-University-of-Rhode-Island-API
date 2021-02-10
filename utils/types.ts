export interface CourseDescription {
    title: string;
    description: string;
};

export interface StudentOrgDescription {
    name?: string;
    president?: string;
    phone?: string;
    email?: string;
    logoURL?: string;
    website?: string;
    description?: string;
    events?: string;
    location?: string;
    graduate?: boolean;
    recognized?: boolean;
    other?: string;
    category?: string
};

export interface CourseDescriptionCache {
    payload: Map<string, CourseDescription[]>;
    timeCached: Map<string, number>;
};

export interface StudentOrgDescriptionCache {
    payload?: StudentOrgDescription[];
    timeCached?: number;
};