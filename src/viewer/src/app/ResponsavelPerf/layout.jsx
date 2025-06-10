'use client';

import SidebarResponsavel from '../Components/Sidebar/SidebarResponsavel';
import SidebarMobile from '../Components/SidebarMobile/SidebarResponsavel'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <SidebarResponsavel />
      <SidebarMobile />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
