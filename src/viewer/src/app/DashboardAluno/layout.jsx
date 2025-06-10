'use client';

import SidebarAluno from '../Components/Sidebar/SidebarAluno';
import SidebarMobile from '../Components/SidebarMobile/SidebarAluno'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <SidebarAluno />
      <SidebarMobile />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
