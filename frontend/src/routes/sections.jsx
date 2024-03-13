import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import userModel from '../pages/user';
import DashboardLayout from '../layouts/dashboard';

export const IndexPage = lazy(() => import('../pages/app'));
export const BlogPage = lazy(() => import('../pages/blog'));
export const LoginPage = lazy(() => import('../pages/login'));
export const ProductsPage = lazy(() => import('../pages/products'));
export const Page404 = lazy(() => import('../pages/page-not-found'));

// const isAuthenticated = () => {
//   return true;
// };

const isAuthenticated = () => true;

const ProtectedRoute = (element) => {
  const { comp: Component } = element;
  if (isAuthenticated()) {
    return <Component />;
  }
  return <Navigate to="/login" />;
};

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <ProtectedRoute comp={IndexPage} />, index: true },
        { path: 'user', element: <ProtectedRoute comp={userModel.Grid} /> },
        {
          path: 'products',
          element: <ProtectedRoute comp={ProductsPage} />,
        },
        { path: 'blog', element: <ProtectedRoute comp={BlogPage} /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
