import { Navigate, Outlet } from 'react-router-dom';
import { useDemoStore } from '@/store/DemoStoreContext';

export function RequireAdmin() {
  const { isAdminSignedIn } = useDemoStore();
  if (!isAdminSignedIn) {
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
}
