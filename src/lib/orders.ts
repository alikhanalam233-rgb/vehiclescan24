import type { Order } from '@/types';

export function nextReference(orders: Order[]): string {
  const highest = orders.reduce((max, order) => {
    const number = Number(order.reference.replace('VS24-', ''));
    return Number.isNaN(number) ? max : Math.max(max, number);
  }, 10000);
  return `VS24-${highest + 1}`;
}

export function generateAccessToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(24));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function isLinkExpired(expiresAt: string): boolean {
  return new Date(expiresAt).getTime() <= Date.now();
}
