import { notFound } from "next/navigation";
import { CASE_STUDY_SLUGS, isCaseStudySlug } from "@/content/caseStudies";
import { CaseStudyView } from "@/components/case-study/CaseStudyView";

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!isCaseStudySlug(slug)) {
    notFound();
  }

  return <CaseStudyView slug={slug} />;
}
