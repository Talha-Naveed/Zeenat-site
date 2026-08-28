import { codeToHtml } from "shiki";
import { CopyButton } from "@/components/copy-button";

const languageMap = { ts: "typescript", tsx: "tsx", js: "javascript", bash: "bash" } as const;

export async function CodeBlock({
  code,
  language = "tsx",
  filename,
  label,
}: {
  code: string;
  language?: keyof typeof languageMap;
  filename?: string;
  label?: string;
}) {
  const html = await codeToHtml(code, { lang: languageMap[language], theme: "github-dark-default" });
  return (
    <div className="code-block">
      <div className="code-toolbar">
        <span>{filename ?? label ?? language.toUpperCase()}</span>
        <CopyButton value={code} />
      </div>
      <div className="highlighted-code" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
