import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_PACKAGES } from '@/data/packages';
import { DEMO_ORDERS } from '@/data/demoOrders';
import { generateAccessToken, nextReference } from '@/lib/orders';
import type { Order, PackageId, ReportPackage } from '@/types';

const ADMIN_SESSION_KEY = 'vs24-demo-admin';

export interface NewOrderInput {
  customerEmail: string;
  vin: string;
  packageId: PackageId;
}

export interface DemoStoreValue {
  orders: Order[];
  packages: ReportPackage[];
  isAdminSignedIn: boolean;
  createOrder: (input: NewOrderInput) => Order | null;
  getOrder: (reference: string) => Order | undefined;
  getOrderByAccessToken: (token: string) => Order | undefined;
  updateOrder: (reference: string, patch: Partial<Order>) => void;
  publishReport: (reference: string) => void;
  setPackagePrice: (id: PackageId, price: number) => void;
  signInAdmin: () => void;
  signOutAdmin: () => void;
}

const DemoStoreContext = createContext<DemoStoreValue | null>(null);

export function DemoStoreProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(DEMO_ORDERS);
  const [packages, setPackages] = useState<ReportPackage[]>(DEFAULT_PACKAGES);
  const [isAdminSignedIn, setIsAdminSignedIn] = useState<boolean>(
    () => sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true'
  );

  const value = useMemo<DemoStoreValue>(() => {
    const getOrder = (reference: string) => orders.find((order) => order.reference === reference);

    return {
      orders,
      packages,
      isAdminSignedIn,
      createOrder: ({ customerEmail, vin, packageId }) => {
        const pkg = packages.find((item) => item.id === packageId);
        if (!pkg) return null;
        const order: Order = {
          reference: nextReference(orders),
          createdAt: new Date().toISOString(),
          customerEmail,
          vin,
          packageId,
          amount: pkg.price,
          paymentStatus: 'awaiting_payment',
          reportStatus: 'pending',
          vehicle: {
            make: '',
            model: '',
            buildYear: null,
            firstRegistration: '',
            fuelType: '',
            colour: '',
            mileageKm: null,
          },
          findings: [],
          reportFile: null,
          access: null,
          emails: [],
        };
        setOrders((current) => [order, ...current]);
        return order;
      },
      getOrder,
      getOrderByAccessToken: (token) =>
        orders.find((order) => order.access?.token === token),
      updateOrder: (reference, patch) =>
        setOrders((current) =>
          current.map((order) => (order.reference === reference ? { ...order, ...patch } : order))
        ),
      publishReport: (reference) => {
        const order = getOrder(reference);
        const pkg = packages.find((item) => item.id === order?.packageId);
        if (!order || !pkg) return;
        const publishedAt = new Date();
        const expiresAt = new Date(publishedAt);
        expiresAt.setDate(expiresAt.getDate() + pkg.reportValidityDays);
        setOrders((current) =>
          current.map((item) =>
            item.reference === reference
              ? {
                  ...item,
                  reportStatus: 'published',
                  access: {
                    token: generateAccessToken(),
                    publishedAt: publishedAt.toISOString(),
                    expiresAt: expiresAt.toISOString(),
                  },
                }
              : item
          )
        );
      },
      setPackagePrice: (id, price) =>
        setPackages((current) =>
          current.map((pkg) => (pkg.id === id ? { ...pkg, price } : pkg))
        ),
      signInAdmin: () => {
        sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
        setIsAdminSignedIn(true);
      },
      signOutAdmin: () => {
        sessionStorage.removeItem(ADMIN_SESSION_KEY);
        setIsAdminSignedIn(false);
      },
    };
  }, [orders, packages, isAdminSignedIn]);

  return <DemoStoreContext.Provider value={value}>{children}</DemoStoreContext.Provider>;
}

export function useDemoStore(): DemoStoreValue {
  const context = useContext(DemoStoreContext);
  if (!context) throw new Error('useDemoStore must be used inside DemoStoreProvider');
  return context;
}
