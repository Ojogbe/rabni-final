import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProgramsPage from "./pages/ProgramsPage";
import ImpactPage from "./pages/ImpactPage";
import GalleryPage from "./pages/GalleryPage";
import GetInvolvedPage from "./pages/GetInvolvedPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardLayout from "./components/admin/AdminDashboardLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import BlogManagementPage from "./pages/admin/BlogManagementPage";
import GalleryManagementPage from "./pages/admin/GalleryManagementPage";
import ReportsManagementPage from "./pages/admin/ReportsManagementPage";
import VolunteerApplicationsPage from "./pages/admin/VolunteerApplicationsPage";
import ContactMessagesPage from "./pages/admin/ContactMessagesPage";
import ProtectedRoute from "./components/ProtectedRoute";
import React, { lazy, Suspense } from "react";

const queryClient = new QueryClient();

const ILearnEcosystemPage = lazy(() => import("./pages/programs/iLearnEcosystemPage"));
const CommunityLearningHubsPage = lazy(() => import("./pages/programs/CommunityLearningHubsPage"));
const FloatInitiativePage = lazy(() => import("./pages/programs/FloatInitiativePage"));
const GirlsLeftBehindPage = lazy(() => import("./pages/programs/GirlsLeftBehindPage"));

function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-[9999]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-solid"></div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/programs" element={<ProgramsPage />} />
              <Route path="/impact" element={<ImpactPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/get-involved" element={<GetInvolvedPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/programs/ilearn-ecosystem" element={<ILearnEcosystemPage />} />
              <Route path="/programs/community-learning-hubs" element={<CommunityLearningHubsPage />} />
              <Route path="/programs/float-initiative" element={<FloatInitiativePage />} />
              <Route path="/programs/girls-left-behind" element={<GirlsLeftBehindPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminDashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboardPage />} />
              <Route path="blog" element={<BlogManagementPage />} />
              <Route path="gallery" element={<GalleryManagementPage />} />
              <Route path="reports" element={<ReportsManagementPage />} />
              <Route path="volunteers" element={<VolunteerApplicationsPage />} />
              <Route path="contact" element={<ContactMessagesPage />} />
            </Route>
            {/* Redirect any other admin routes to login */}
            <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
