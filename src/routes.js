import { Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from './layouts/dashboard';
import BuddiesPage from './pages/BuddiesPage';
import DashboardAppPage from './pages/DashboardAppPage';
import BundlesPage from './pages/BundlesPage';
import PlayerCardsPage from './pages/PlayerCardsPage';
import SpraysPage from './pages/SpraysPage';
import PlayerTitlesPage from './pages/PlayerTitlesPage';
import WeaponsPage from './pages/WeaponsPage';
import ContentTiersPage from './pages/ContentTiersPage';

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
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'buddies', element: <BuddiesPage /> },
        { path: 'bundles', element: <BundlesPage /> },
        { path: 'player-cards', element: <PlayerCardsPage /> },
        { path: 'sprays', element: <SpraysPage /> },
        { path: 'titles', element: <PlayerTitlesPage /> },
        { path: 'weapons', element: <WeaponsPage /> },
        { path: 'content-tiers', element: <ContentTiersPage /> },
      ],
    },
  ]);

  return routes;
}
