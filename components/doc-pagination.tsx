import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { docsSequence } from "@/lib/content";

export function DocPagination({ currentPath }: { currentPath: string }) {
  const index = docsSequence.findIndex((item) => item.href === currentPath);
  const previous = index > 0 ? docsSequence[index - 1] : undefined;
  const next = index >= 0 && index < docsSequence.length - 1 ? docsSequence[index + 1] : undefined;
  if (!previous && !next) return null;
  return (
    <nav className="doc-pagination" aria-label="Previous and next documentation pages">
      {previous ? <Link href={previous.href}><span><ArrowLeft size={14} /> Previous</span><strong>{previous.title}</strong></Link> : <span />}
      {next ? <Link href={next.href}><span>Next <ArrowRight size={14} /></span><strong>{next.title}</strong></Link> : <span />}
    </nav>
  );
}
