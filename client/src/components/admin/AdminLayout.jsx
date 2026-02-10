import { Link, Outlet } from "react-router-dom";
import { LayoutDashboard, Package, PlusCircle, Settings, LogOut, FolderTree } from "lucide-react";

export default function AdminLayout() {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md hidden md:flex flex-col">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold font-serif text-black">Mark Optical</h1>
                    <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/admin/products" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        <Package size={20} />
                        <span>Products</span>
                    </Link>
                    <Link to="/admin/products/new" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        <PlusCircle size={20} />
                        <span>Add Product</span>
                    </Link>
                    <Link to="/admin/categories" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        <FolderTree size={20} />
                        <span>Categories</span>
                    </Link>
                    <div className="h-px bg-gray-200 my-4" />
                    <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        <Settings size={20} />
                        <span>Settings</span>
                    </Link>
                </nav>

                <div className="p-4 border-t">
                    <button className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
