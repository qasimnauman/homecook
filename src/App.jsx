import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import OrderProvider from "./hooks/orderContext.jsx";
import Layout from "./Layout";
import HomePage from "./Pages/HomePage";
import CheckoutPage from "./Pages/CheckoutPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<CheckoutPage />} />
    </Route>
  )
);

export default function App() {
  return (
    <OrderProvider>
      <RouterProvider router={router} />
    </OrderProvider>
  );
}
