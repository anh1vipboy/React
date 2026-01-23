import SidebarWrapper from "@/components/layout/SidebarWrapper";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarWrapper>
      {children}
    </SidebarWrapper>
  )
}
