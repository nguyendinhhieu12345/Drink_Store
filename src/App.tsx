import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout/defaultLayout";
import { setupInterceptor } from "./utils/interceptor";
import { publicRoutes } from "./router/Router";
import { AppDispatch, RootState, store } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import React, { FC, useEffect } from "react";
import RequireAuth from "./router/RequireAuth";
import { AnimatePresence } from "framer-motion";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import { User } from "./type";
import "@goongmaps/goong-js/dist/goong-js.css";
import { updateTransaction } from "./api/PageApi/checkoutApi";
interface LayoutProps {
    children?: React.ReactNode;
}

function App() {
    const dispatch = useDispatch<AppDispatch>();
    // const location = useLocation();
    setupInterceptor(store, dispatch);
    const routerCheck = publicRoutes;
    const useCurrentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );

    const location = useLocation();
    const navigate = useNavigate();

    const updateTransactionInf = async () => {
        const data = await updateTransaction(localStorage.getItem('transactionId') as string)
        if (data?.success) {
            localStorage.removeItem('transactionId');
        }
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const orderId: string = localStorage.getItem("orderId") as string

        if (queryParams.get('vnp_ResponseCode')) {
            const vnPayResponse = queryParams.get('vnp_ResponseCode');
            if (vnPayResponse === '00') {
                updateTransactionInf()
                navigate(`/order/${orderId}`);
            } else {
                // updateTransactionInf()
                navigate(`/order/${orderId}`);
            }
        }
        else if (queryParams.get('status')) {
            updateTransactionInf()
            navigate(`/order/${orderId}`)
        }
    }, [location.search, navigate]);

    return (
        // <Router>
        <div className="App">
            <AnimatePresence>
                <Routes>
                    {routerCheck.map((route, index) => {
                        const Page = route.component;
                        let Layout: FC<LayoutProps> = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else {
                            Layout = DefaultLayout;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <>
                                        <RequireAuth
                                            requiredRole={route.role}
                                            user={useCurrentUser}
                                        >
                                            <Layout>
                                                <React.Suspense fallback={<LoadingPage />}>
                                                    <Page />
                                                </React.Suspense>
                                            </Layout>
                                        </RequireAuth>
                                    </>
                                }
                            />
                        );
                    })}
                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />
                </Routes>
            </AnimatePresence>
        </div>
        // </Router>
    );
}

export default App;
