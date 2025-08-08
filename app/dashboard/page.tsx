    import AuthGuard from '@/components/auth/authguard';
    import Dashboard from '@/components/dashboard/Dashboard';

export default function DashboardPage() {
  return (
    <AuthGuard>
      <Dashboard />
    </AuthGuard>
  );
}