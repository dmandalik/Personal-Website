import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";
import { projects } from "@/data/projects";
import { StatusBadge } from "@/components/ui/StatusBadge";

const project = projects.find((p) => p.id === "tumor-diagnosis")!;
const PDF = "/papers/brain-tumor-diagnosis.pdf";

export const metadata: Metadata = {
  title: `${project.title} — Diversified AI Techniques`,
  description:
    "A published study benchmarking diversified AI techniques for brain-tumor diagnosis on MRI scans under distribution shift, with the full paper embedded.",
};

export default function BrainTumorDiagnosisPage() {
  return (
    <main className="shell relative flex min-h-screen flex-col items-center py-10 text-center">
      {/* back to projects */}
      <Link
        href="/#work"
        className="group inline-flex items-center gap-2 text-sm text-fg/55 transition-colors hover:text-fg"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back to projects
      </Link>

      {/* header */}
      <header className="mt-6 flex max-w-2xl flex-col items-center">
        <div className="flex items-center gap-2.5">
          <span
            className="font-mono text-[11px] uppercase tracking-[0.18em]"
            style={{ color: project.accent }}
          >
            {project.category}
          </span>
          <StatusBadge status={project.status} />
        </div>
        <h1 className="mt-3 font-display text-4xl font-normal text-fg sm:text-5xl">
          {project.title}
        </h1>
        <p
          className="mt-2 text-sm font-medium"
          style={{ color: project.accent }}
        >
          {project.metric}
        </p>

        {/* concise overview */}
        <p className="mt-5 text-sm leading-relaxed text-fg/70">
          Up to 10% of brain and spinal-cord tumors are initially misdiagnosed,
          and a single model trained on one MRI dataset tends to collapse on
          scans it has never seen. This study trains a diversified set of models
          — logistic regression, an MLP, and a TensorFlow/Keras CNN — on three
          distinct Kaggle MRI datasets, then evaluates them on a fully separate
          set to stress distribution shift. The CNN generalized best at 98.2%
          accuracy on unseen scans (vs. 78.6% for logistic regression and 74.9%
          for the MLP), while aggregating the weaker classifiers via boosting and
          multiplicative weight update lifted them to 86.5% and 83.8%. Published
          in the Journal of Student Research (Vol. 12, Issue 4, 2023).
        </p>

        {/* actions */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={PDF}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-bg"
            style={{ background: project.accent }}
          >
            Open paper <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href={PDF}
            download
            className="flex items-center gap-2 rounded-lg border border-line bg-fg/[0.03] px-4 py-2 text-sm text-fg/80 transition-colors hover:text-fg"
          >
            <Download className="h-4 w-4" /> Download
          </a>
        </div>
      </header>

      {/* embedded paper */}
      <div className="glass mt-10 w-full max-w-4xl overflow-hidden">
        <object data={`${PDF}#view=FitH`} type="application/pdf" className="h-[80vh] w-full">
          <iframe
            src={PDF}
            title="Diversified AI Techniques for Augmenting Brain Tumor Diagnosis"
            className="h-[80vh] w-full"
          />
          <div className="p-6 text-sm text-fg/70">
            Your browser can&apos;t display the embedded PDF.{" "}
            <a
              href={PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-fg"
            >
              Open it in a new tab
            </a>
            .
          </div>
        </object>
      </div>
    </main>
  );
}
