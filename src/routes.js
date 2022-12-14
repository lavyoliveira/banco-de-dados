import { Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from './layouts/dashboard';
import BuddiesPage from './pages/BuddiesPage';
import DashboardAppPage from './pages/DashboardAppPage';
import BundlesPage from './pages/BundlesPage';
import PlayerCardsPage from './pages/PlayerCardsPage';
import SpraysPage from './pages/SpraysPage';
import PlayerTitlesPage from './pages/PlayerTitlesPage';
import WeaponsPage from './pages/WeaponsPage';
import SinglePageLayout from './layouts/dashboard/SinglePageLayout';
import SkinsPage from './pages/SkinsPage';
import ReportsPage from './pages/ReportsPage';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
      ],
    },
    {
      element: <SinglePageLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'buddies', element: <BuddiesPage /> },
        { path: 'bundles', element: <BundlesPage /> },
        { path: 'player-cards', element: <PlayerCardsPage /> },
        { path: 'sprays', element: <SpraysPage /> },
        { path: 'titles', element: <PlayerTitlesPage /> },
        { path: 'weapons', element: <WeaponsPage /> },
        { path: 'skins', element: <SkinsPage /> },
        { path: 'reports', element: <ReportsPage /> },
      ],
    },
  ]);

  return routes;
}
