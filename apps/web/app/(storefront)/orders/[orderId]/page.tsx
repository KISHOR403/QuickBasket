import React from 'react';
import { MOCK_ORDERS } from '@quickbasket/mocks';
import { OrderTrackingClient } from './OrderTrackingClient';

export function generateStaticParams() {
  return MOCK_ORDERS.map((o) => ({ orderId: o.id }));
}

export default function OrderTrackingPage({ params }: { params: { orderId: string } }) {
  return <OrderTrackingClient orderId={params.orderId} />;
}
