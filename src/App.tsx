import { Route, Routes } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { RequireAdmin } from '@/components/admin/RequireAdmin';
import { ScrollManager } from '@/components/layout/ScrollManager';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { PRIVACY_POLICY, TERMS_AND_CONDITIONS } from '@/data/legalContent';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { ContactPage } from '@/pages/ContactPage';
import { FaqPage } from '@/pages/FaqPage';
import { HomePage } from '@/pages/HomePage';
import { LegalPage } from '@/pages/LegalPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { OrderConfirmationPage } from '@/pages/OrderConfirmationPage';
import { ReportPage } from '@/pages/ReportPage';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AdminOrderDetailPage } from '@/pages/admin/AdminOrderDetailPage';
import { AdminOrdersPage } from '@/pages/admin/AdminOrdersPage';
import { AdminPricingPage } from '@/pages/admin/AdminPricingPage';
import { DemoStoreProvider } from '@/store/DemoStoreContext';

function App() {
  return (
    <DemoStoreProvider>
      <ScrollManager />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order/:reference" element={<OrderConfirmationPage />} />
          <Route path="report/:token" element={<ReportPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy" element={<LegalPage document={PRIVACY_POLICY} />} />
          <Route path="terms" element={<LegalPage document={TERMS_AND_CONDITIONS} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="admin/login" element={<AdminLoginPage />} />
        <Route path="admin" element={<RequireAdmin />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="orders/:reference" element={<AdminOrderDetailPage />} />
            <Route path="pricing" element={<AdminPricingPage />} />
          </Route>
        </Route>
      </Routes>
    </DemoStoreProvider>
  );
}

export default App;
