import type { Project } from "@/content";
import { ArrowUpRight } from "lucide-react";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col border border-[color:var(--rule)] p-5">
      <p className="eyebrow">{project.kind}</p>
      <h3 className="display mt-3 text-lg">
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ink)]"
          >
            {project.name}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        ) : (
          project.name
        )}
      </h3>
      <p className="body-text mt-2 text-sm">{project.summary}</p>
      <ul className="mt-4 space-y-2">
        {project.highlights.map((h) => (
          <li key={h} className="body-text text-sm">
            {h}
          </li>
        ))}
      </ul>
      <p className="eyebrow mt-auto pt-5">{project.stack}</p>
    </article>
  );
}
