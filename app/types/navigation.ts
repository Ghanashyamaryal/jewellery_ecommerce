export interface NavLink {
  name: string;
  href: string;
  image?: string;
  /** Stone colour dot shown before the label */
  swatch?: string;
  badge?: string;
}

export interface NavColumn {
  title: string;
  links: NavLink[];
}

export interface NavFeature {
  eyebrow: string;
  title: string;
  href: string;
  image: string;
  price?: number;
}

export interface NavMenu {
  name: string;
  href: string;
  image?: string;
  columns: NavColumn[];
  features: NavFeature[];
  viewAll: NavLink;
  badge?: string;
}

export interface NavigationData {
  menus: NavMenu[];
  links: NavLink[];
}
