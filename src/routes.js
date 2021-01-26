import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import RegisterView from 'src/views/auth/RegisterView';
import LayoutView from 'src/views/layout'
import ContentView from 'src/views/content'
import SheduleView from 'src/views/shedule';
// import UsersView from 'src/views/users/UserView';
import UsersView from 'src/views/users/ListUser';
import BoxLayerView from 'src/views/boxlayer';
import MediaLView from 'src/views/content/media'
import TemplateView from 'src/views/layout/template'
import PointView from 'src/views/point/PointView'
import UserAdmin from 'src/views/user'
const routes = [
    {
        path: 'app',
        element: <DashboardLayout />,
        children: [
            { path: 'dashboard', element: <DashboardView /> },
            {
                path: 'content',
                element: <ContentView />,
                children: [
                    { path: '/:media', element: <MediaLView /> },
                ]
            },
            {
                path: 'layout',
                element: <LayoutView />,
                children: [
                    { path: '/:template', element: <TemplateView /> }
                ]
            },

            { path: 'user', element: <UserAdmin /> },
            { path: 'points', element: <PointView /> },
            { path: 'shedule', element: <SheduleView /> },
            { path: 'boxlayer', element: <BoxLayerView /> },
            { path: 'users', element: <UsersView /> },
            { path: '*', element: <Navigate to="/404" /> }
        ]
    },
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: 'login', element: <LoginView /> },
            { path: 'register', element: <RegisterView /> },
            { path: '404', element: <NotFoundView /> },
            { path: '/', element: <Navigate to="/app/dashboard" /> },
            { path: '*', element: <Navigate to="/404" /> }
        ]
    },
    // {
    //     path: 'point',
    //     element: <PointLayout />,
    //     children: [
    //         { path: 'account', element: <AccountView /> },
    //         { path: 'customers', element: <CustomerListView /> },
    //         { path: 'content', element: <ContentView /> },
    //         { path: 'products', element: <ProductListView /> },
    //         { path: 'settings', element: <SettingsView /> },
    //         { path: '*', element: <Navigate to="/404" /> }
    //     ]
    // }
];

export default routes;
