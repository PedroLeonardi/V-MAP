'use client';

import SidebarAluno from '../Components/Sidebar/SidebarAluno';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <SidebarAluno />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
