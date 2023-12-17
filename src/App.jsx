import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
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
            {user ? (
                <div>
                    <span>{user.name}</span>
                    <button onClick={() => setUser(null)}>Đăng xuất</button>
                </div>
            ) : (
                <p>Chưa đăng nhập</p>
            )}
        </div>
    );
}

function App() {
    const [user, setUser] = useState(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/products/:name" element={<ProductDeatailPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
                <div>footer</div>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
