import { Suspense } from "react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Container } from "@/components/shared/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { WhatsAppLink } from "@/components/shared/WhatsAppLink";
import { howItWorks } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { whatsappMessages } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Request a Quote",
  description:
    "Tell us what you need printed, embroidered or branded and we will come back with a quotation. No account required.",
  path: "/quote",
});

function FormSkeleton() {
  return (
    <div aria-hidden="true" className="space-y-5">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="h-14 animate-pulse rounded-xl bg-sunken" />
      ))}
    </div>
  );
}

export default function QuotePage() {
  return (
    <>
      <PageHeader
        eyebrow="Request a quote"
        title="Tell us what you'd like *made*"
        description="Fill in the details below and we will come back with a quotation. Not sure about something? Leave it out or tell us in the description."
      />

      <section className="py-12 sm:py-16">
        <Container className="grid gap-14 lg:grid-cols-[1.4fr_0.6fr] lg:gap-20">
          <div>
            {/* useSearchParams (prefill from ?service=) needs a Suspense boundary */}
            <Suspense fallback={<FormSkeleton />}>
              <QuoteForm />
            </Suspense>
          </div>

          <aside className="space-y-10 lg:sticky lg:top-28 lg:self-start">
            <div>
              <h2 className="font-display text-2xl tracking-tight text-ink">What happens next</h2>
              <ol className="mt-5 space-y-5">
                {howItWorks.slice(1, 4).map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-medium text-white">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium text-ink">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-brand bg-sunken p-6">
              <h2 className="font-display text-xl tracking-tight text-ink">Prefer WhatsApp?</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Send us your idea and any photos directly in chat.
              </p>
              <WhatsAppLink message={whatsappMessages.quote()} variant="dark" className="mt-4" />
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
