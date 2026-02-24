import Home from '@/app/page';
import VanillaTypescriptPage from '@/app/vanilla-typescript/page';
import ReactQueryTypescriptPage from '@/app/react-query-typescript/page';

type TRoute = {
  path: string;
  component: React.ComponentType;
  label: string;
  key: string;
  exact?: boolean;
};

export const ROUTES: TRoute[] = [
  {
    path: '/',
    component: Home,
    label: 'Vanilla JavaScript',
    key: 'home',
    exact: true,
  },
  {
    path: '/vanilla-typescript',
    component: VanillaTypescriptPage,
    label: 'Vanilla TypeScript',
    key: 'vanilla-typescript',
    exact: true,
  },
  {
    path: '/react-query-typescript',
    component: ReactQueryTypescriptPage,
    label: 'React Query TypeScript',
    key: 'react-query-typescript',
    exact: true,
  },
];
