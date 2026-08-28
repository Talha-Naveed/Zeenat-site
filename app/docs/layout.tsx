import { DocsSidebar } from "@/components/docs-sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell docs-layout">
      <DocsSidebar />
      <div className="docs-content">{children}</div>
    </div>
  );
}
