import http from './http';

export interface Settings {
    site_name: string;
    site_logo: string | null;
    site_logo_dark: string | null;
    site_favicon: string | null;
    hero_title: string;
    hero_subtitle: string | null;
    hero_enabled: boolean | number;
    
    call_to_action_enabled: boolean | number;
    
    why_choose_us_title: string;
    why_choose_us_description: string;
    
    about_us_title: string;
    about_us_description: string;
    mission_title: string;
    mission_description: string;
    vision_title: string;
    vision_description: string;
    
    footer_description: string;
    copyright_text: string;
    
    social_links: {
        facebook: string | null;
        twitter: string | null;
        instagram: string | null;
        linkedin: string | null;
    };
    
    seo: {
        home: SeoData;
        about: SeoData;
        contact: SeoData;
        portfolio: SeoData;
    };
    
    contact_info: {
        email: string;
        phone: string;
        address: string;
        map_url: string;
    };
    why_choose_us_items: {
        id: number;
        title: string;
        description: string;
        icon: string | null;
    }[];
    why_choose_us_enabled: boolean | number;
    
    why_like_real_estate_title: string;
    why_like_real_estate_description: string;
    why_like_real_estate_enabled: boolean | number;
    why_like_real_estate_items: {
        id: number;
        title: string;
        description: string;
        icon: string | null;
    }[];

    portfolio_title: string;
    portfolio_description: string;
    portfolio_enabled: boolean | number;
}

export interface SeoData {
    title: string;
    description: string;
    keywords: string;
    image: string | null;
}

const getSettingsFn = async (): Promise<Settings | null> => {
    try {
        const response = await http.get<Settings>('/settings');
        return response.data;
    } catch (error) {
        console.error('Error fetching settings:', error);
        return null;
    }
};

export const getSettings = getSettingsFn;

export async function submitLead(data: { name: string; email: string; phone?: string; message?: string }) {
    try {
        const response = await http.post('/leads', data);
        return response.data;
    } catch (error: any) {
        // Error handling is already standardized by interceptor, so we just throw it or re-throw specific parts
        throw error; 
    }
}

export async function subscribe(email: string) {
    try {
        const response = await http.post('/subscribers', { email });
        return response.data;
    } catch (error: any) {
        throw error;
    }
}

export interface Category {
    id: number;
    title: string;
    created_at: string;
    updated_at: string;
}

export interface Project {
    id: number;
    category_id: number;
    title: string;
    location: string;
    external_link: string | null;
    image: string;
    created_at: string;
    updated_at: string;
    category?: Category;
}

export interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export async function getProjects(page: number = 1): Promise<PaginatedResponse<Project>> {
    try {
        const response = await http.get<PaginatedResponse<Project>>(`/projects?page=${page}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}
