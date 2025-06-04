'use client';

import SidebarResponsavel from '../Components/Sidebar/SidebarResponsavel';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <SidebarResponsavel />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
