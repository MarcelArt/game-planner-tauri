import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Toaster } from '@/components/ui/toaster';
import { useParams } from 'react-router';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { gameId } = useParams();

  return gameId ? (
    <SidebarProvider>
      <AppSidebar gameId={gameId} />
      <main className='w-screen h-screen'>
        <SidebarTrigger />
        {children}
      </main>
      <Toaster />
    </SidebarProvider>
  ) : null;
}
