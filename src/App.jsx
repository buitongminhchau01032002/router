import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import './style.css';
const UserContext = createContext({});

function HomePage() {
    return (
        <div>
            <h1>Home</h1>
            <Link to="/products">Go to products</Link>
        </div>
    );
}

function ProductsPage() {
    return (
        <div>
            <h1>Product</h1>
            <Link to="/products/1">Product 1</Link>
            <Link to="/products/2">Product 2</Link>
            <Link to="/">Back to home</Link>
        </div>
    );
}

function ProductDeatailPage() {
    const { name } = useParams();
    return <h1>Product Detail: {name}</h1>;
}

function LoginPage() {
    const { user, setUser } = useContext(UserContext);
    return (
        <div>
            <h1>Login page</h1>
            {!user && <button onClick={() => setUser({ name: 'Chau' })}>Login</button>}
        </div>
    );
}

function Header() {
    const { user, setUser } = useContext(UserContext);

    return (
        <div>
            <div>
                {user ? (
                    <div>
                        <span>{user.name}</span>
                        <button onClick={() => setUser(null)}>Đăng xuất</button>
                    </div>
                ) : (
                    <p>Chưa đăng nhập</p>
                )}
            </div>

            {/* NAV ITEM */}
            <div className="menu" style={{ background: 'red', position: 'relative' }}>
                <button>Item</button>
                <div
                    className="submenu"
                    style={{ position: 'absolute', top: '100%', background: 'blue' }}
                >
                    <ul>
                        <li>Sub item 1</li>
                        <li>Sub item 2</li>
                        <li>Sub item 3</li>
                        <li>Sub item 4</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function AboutPage() {
    return <h1>About</h1>;
}

const routes = [
    { path: '/', component: HomePage },
    { path: '/products', component: ProductsPage },
    { path: '/products/:name', component: ProductDeatailPage },
    { path: '/login', component: LoginPage },
    { path: '/about', component: AboutPage },
];

function App() {
    const [user, setUser] = useState(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
                <Header />
                <Routes>
                    {routes.map((route) => {
                        const Comp = route.component;
                        return <Route path={route.path} element={<Comp />} />;
                    })}
                </Routes>
                <div>footer</div>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
