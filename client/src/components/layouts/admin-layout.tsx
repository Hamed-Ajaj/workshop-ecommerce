import { Outlet } from "react-router-dom";
import AdminGuard from "@/components/admin/admin-guard";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/admin/app-sidebar";

const AdminLayout = () => {
  return (
    <AdminGuard>
      <SidebarProvider defaultOpen>
        <AppSidebar />
        <SidebarInset className="bg-slate-50 min-h-svh w-full overflow-x-hidden">
          <div className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold text-slate-900">Admin</h1>
            </div>
          </div>
          <main className="p-8">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AdminGuard>
  );
};

export default AdminLayout;
