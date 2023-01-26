import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MenuItems } from '../../types/menu';

const About = lazy(() => import('../../../features/pages/about/about'));
const Work = lazy(() => import('../../../features/pages/work/work'));
const Contact = lazy(() => import('../../../features/pages/contact/contact'));

export function AppLazyRoutes({ items }: { items: MenuItems }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path={''} element={<Work></Work>}></Route>
                <Route path={items[0].path} element={<Work></Work>}></Route>
                <Route path={items[1].path} element={<About></About>}></Route>
                <Route
                    path={items[2].path}
                    element={<Contact></Contact>}
                ></Route>
                <Route
                    path={'*'}
                    element={<Navigate to="" replace></Navigate>}
                ></Route>
            </Routes>
        </Suspense>
    );
}
