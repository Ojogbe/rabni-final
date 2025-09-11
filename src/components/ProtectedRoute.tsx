import { Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log('ProtectedRoute: Component rendered - This should only show for /admin/dashboard routes');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('ProtectedRoute: Checking authentication...');
        
        const { data: { session } } = await supabase.auth.getSession();
        console.log('ProtectedRoute: Session:', session?.user?.id);
        
        if (session?.user) {
          // Check admin profile with timeout
          const adminCheckPromise = supabase
            .from('admin_profiles')
            .select('role')
            .eq('id', session.user.id)
            .eq('role', 'admin')
            .single();
          
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Admin check timeout')), 3000)
          );
          
          const { data: adminProfile } = await Promise.race([adminCheckPromise, timeoutPromise]) as any;
          
          console.log('ProtectedRoute: Admin profile:', adminProfile);
          setIsAuthenticated(!!adminProfile);
        } else {
          console.log('ProtectedRoute: No session');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('ProtectedRoute: Auth check error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}
