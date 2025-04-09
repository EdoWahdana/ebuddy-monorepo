'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardTemplate from '../../components/DashboardTemplate';
import { useAppSelector } from '../../store/hooks';

export default function DashboardPage() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();
  
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);
  
  if (!isAuthenticated) {
    return null;
  }
  
  return <DashboardTemplate />;
}