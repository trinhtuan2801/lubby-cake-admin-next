import { CakeRounded, StorageRounded } from '@mui/icons-material';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export const ONE_MINUTE_IN_SECOND = 60;

export const DISABLED_DEPLOY_TIME_IN_SECOND = ONE_MINUTE_IN_SECOND * 1.5;

export const PREVIOUS_DEPLOY_DATE = 'PREVIOUS_DEPLOY_DATE';

export enum COLLECTION {
  Users = 'users',
  Cakes = 'cakes',
  Categories = 'categories',
}

export interface RouteAlias {
  name: string;
  subRoutes?: Record<string, RouteAlias>;
}

export const routeAliases: RouteAlias = {
  name: 'root',
  subRoutes: {
    categories: {
      name: 'Loại bánh',
    },
    cakes: {
      name: 'Danh sách bánh',
    },
  },
};

interface SidebarTab {
  Icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string;
  };
  name: string;
  path: string;
}

export const SidebarTabs: SidebarTab[] = [
  // {
  //   Icon: CategoryRounded,
  //   name: 'Loại bánh',
  //   path: '/categories',
  // },
  {
    Icon: CakeRounded,
    name: 'Danh sách bánh',
    path: '/cakes',
  },
  {
    Icon: StorageRounded,
    name: 'Dữ liệu',
    path: '/data',
  },
];

export enum CssVar {
  HEADER_HEIGHT = '--Header-height',
  SIDEBAR_WIDTH = '--Sidebar-width',
  SIDE_NAVIGATION_SLIDE_IN = '--SideNavigation-slideIn',
  PAGE_WIDTH = '--Page-width',
}

export enum SearchParam {
  CATEGORY = 'cate',
}

export enum Gender {
  MALE = 'M',
  FEMALE = 'F',
}

export const genderKeys = Object.values(Gender);

export enum Age {
  ZERO_TO_FIVE = '0-5',
  SIX_TO_TWELVE = '6-12',
  ABOVE_TWELVE = '12+',
}

export const ageKeys = Object.values(Age);

export const GenderStr: Record<Gender, string> = {
  [Gender.MALE]: 'Nam',
  [Gender.FEMALE]: 'Nữ',
};

export const AgeStr: Record<Age, string> = {
  [Age.ZERO_TO_FIVE]: '0-5',
  [Age.SIX_TO_TWELVE]: '6-12',
  [Age.ABOVE_TWELVE]: '12+',
};
