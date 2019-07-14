export const SIDEBAR_LOADED = "SIDEBAR_LOADED";
export const SIDEBAR_EXPANDED = "SIDEBAR_EXPANDED";
export const SIDEBAR_COLLAPSED = "SIDEBAR_COLLAPSED";

export interface SidebarItem {
    id: string;
    title: string;
    items?: SidebarItem[];
    link?: string;
}

export interface SidebarState {
    items: SidebarItem[];
    expanded: string[];
}

export interface SidebarItemsLoaded {
    type: typeof SIDEBAR_LOADED;
    items: SidebarItem[];
}

export interface SidebarExpanded {
    type: typeof SIDEBAR_EXPANDED;
    id: string;
}

export interface SidebarCollapsed {
    type: typeof SIDEBAR_COLLAPSED;
    id: string;
}

export type SidebarActions =
    | SidebarItemsLoaded
    | SidebarExpanded
    | SidebarCollapsed;
