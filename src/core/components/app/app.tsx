import { Layout } from '../layout/layout';
import { MenuItems } from '../../types/menu';
import { AppLazyRoutes } from '../routes/routes';
export function App() {
    const items: MenuItems = [
        { path: '/work', label: 'Work' },
        { path: '/about', label: 'About' },
        { path: '/contact', label: 'Contact' }
    ];
    // console.log(process.env)
    return (
        <>
            <Layout items={items}>
                <AppLazyRoutes items={items}></AppLazyRoutes>
            </Layout>
        </>
    );
}
