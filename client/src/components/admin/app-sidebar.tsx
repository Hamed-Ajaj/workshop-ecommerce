import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Package,
  Users,
  ChevronDown,
  LogIn,
  LogOut,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/useAuthStore";

const AppSidebar = () => {
  const location = useLocation();
  const [productsOpen, setProductsOpen] = useState(true);
  const [usersOpen, setUsersOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader className="px-4 py-6">
        <Link to="/" className="text-lg font-semibold text-slate-900">
          AESTHETIQUE
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/admin")}>
                  <Link to="/admin">
                    <LayoutGrid />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Products</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setProductsOpen((prev) => !prev)}>
                  <Package />
                  <span>Products</span>
                  <ChevronDown
                    className={`ml-auto h-4 w-4 ${
                      productsOpen ? "rotate-180" : ""
                    }`}
                  />
                </SidebarMenuButton>
                {productsOpen ? (
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild isActive={isActive("/admin/products")}>
                        <Link to="/admin/products">All Products</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild isActive={isActive("/admin/products/new")}>
                        <Link to="/admin/products/new">Add Product</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Users</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setUsersOpen((prev) => !prev)}>
                  <Users />
                  <span>Users</span>
                  <ChevronDown
                    className={`ml-auto h-4 w-4 ${usersOpen ? "rotate-180" : ""}`}
                  />
                </SidebarMenuButton>
                {usersOpen ? (
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild isActive={isActive("/admin/users")}>
                        <Link to="/admin/users">All Users</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild isActive={isActive("/admin/users/new")}>
                        <Link to="/admin/users/new">Add User</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-4 pb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm font-semibold text-slate-700"
            >
              <Avatar className="h-9 w-9">
                <AvatarFallback>
                  {user?.name?.[0]?.toUpperCase() ?? "A"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col">
                <span>{user?.name ?? "Admin"}</span>
                <span className="text-xs font-normal text-slate-500">
                  {user?.role ?? "admin"}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {user ? (
              <DropdownMenuItem onClick={clearAuth}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem asChild>
                <Link to="/sign-in">
                  <LogIn className="mr-2 h-4 w-4" />
                  Log in
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Site settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
