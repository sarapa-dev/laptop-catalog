import { Navigate, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";
import { UserType } from "./types/user";

import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/auth/SignUpPage";
import LoginPage from "./pages/auth/LoginPage";
import LaptopsPage from "./pages/laptops/LaptopsPage";
import LaptopDetailPage from "./pages/laptops/LaptopDetailPage";
import CategoriesPage from "./pages/categories/CategoriesPage";
import SingleCategoryPage from "./pages/categories/SingleCategoryPage";
import ComparePage from "./pages/ComparePage";
import AddLaptopPage from "./pages/admin/AddLaptopPage";

const App = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get<UserType>("/user/me");
        return res.data;
      } catch (error) {
        return null;
      }
    },
    retry: false,
  });

  if (isLoading) return null;

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/laptops" element={<LaptopsPage />} />
        <Route path="/laptops/:id" element={<LaptopDetailPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:category" element={<SingleCategoryPage />} />
        <Route path="compare" element={<ComparePage />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route
          path="/add-laptop"
          element={authUser?.status === "ADMIN" ? <AddLaptopPage /> : <Navigate to={"/laptops"} />}
        />
      </Routes>
      <Toaster />
    </Layout>
  );
};
export default App;
