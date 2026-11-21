# Thread Core Studios website

Marketing and enquiry website for a creative printing, embroidery and branding studio.
Built with Next.js (App Router), TypeScript, Tailwind CSS, Lucide icons and Supabase.

**MVP scope:** brand presentation, service discovery, portfolio, quote requests, WhatsApp contact.
No accounts, cart, checkout or payments (see [Roadmap](#roadmap)).

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000
```

Other commands: `npm run build`, `npm run start`, `npm run lint`.

## Environment variables

See [.env.example](.env.example). Everything is optional for browsing the site; the quote and
contact forms need Supabase.

| Variable | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | public | Canonical URL for SEO, sitemap, share previews |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | public | WhatsApp number, digits only, international format |
| `SUPABASE_URL` | server | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | server | Service-role key. **Secret.** Used only in API routes |
| `SUPABASE_ARTWORK_BUCKET` | server | Storage bucket name (default `enquiry-artwork`) |
| `RESEND_API_KEY`, `NOTIFY_EMAIL_TO`, `NOTIFY_EMAIL_FROM` | server | Optional email alert for each enquiry |

The service-role key is never sent to the browser: `lib/supabase.ts` imports `server-only`, so
importing it from a client component fails the build.

## Supabase setup

1. Create a project at supabase.com.
2. Open **SQL Editor**, paste the contents of [supabase/schema.sql](supabase/schema.sql) and run it.
   This creates the tables (`services`, `portfolio_projects`, `enquiries`, `contact_messages`),
   Row Level Security, and the private `enquiry-artwork` storage bucket.
3. Copy **Project URL** and the **service_role** key from *Project Settings -> API* into
   `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
4. Submit a test quote on the site, then check *Table Editor -> enquiries*.

Enquiries and contact messages have no public access: only the server can read or write them.
View them in the Supabase dashboard (a proper admin screen is Phase 4).

**Until Supabase is configured**, the quote and contact forms show a friendly message and offer to
send the details on WhatsApp instead. Nothing is silently lost.

## Project structure

```
app/
  page.tsx                  Home
  services/page.tsx         Services (expandable categories)
  services/[slug]/page.tsx  Individual service
  portfolio/page.tsx        Our Work (filterable gallery)
  about/page.tsx            About
  contact/page.tsx          Contact
  quote/page.tsx            Request a Quote
  api/quote/route.ts        Quote submission (validation, upload, save, notify)
  api/contact/route.ts      Contact form submission
  layout.tsx, globals.css   Shell, fonts, colour tokens
  sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg, not-found.tsx, error.tsx, loading.tsx
components/
  layout/    Navbar, Footer
  home/      Hero, ServicesOverview, WhyChooseUs, FeaturedProjects, HowItWorks
  services/  ServiceCard, ServiceGrid, ServiceAccordion
  portfolio/ PortfolioCard, PortfolioGallery
  forms/     QuoteForm, ContactForm, fields
  shared/    Button, CTASection, Container, Logo, PageHeader, SectionHeading,
             StatusBadge, WhatsAppButton, WhatsAppLink
lib/
  config.ts       ** Business name, contact details, social links, navigation **
  services.ts     ** Service categories and services (data) **
  portfolio.ts    ** Portfolio projects and filters (data) **
  content.ts      ** Editable page copy (hero, why choose us, how it works, about) **
  validation.ts   Shared client + server validation, upload rules
  whatsapp.ts     WhatsApp link and message builders
  supabase.ts, notify.ts, rate-limit.ts, seo.ts, utils.ts
types/index.ts
supabase/schema.sql
scripts/generate-placeholders.mjs   Generates the temporary placeholder images
public/images/placeholders/         Temporary illustrations (replace with real photos)
```

## How to change things

### Business name, contact details, social links
Edit [lib/config.ts](lib/config.ts). The name appears in the navbar, footer, page titles, emails and
WhatsApp messages. Set the WhatsApp number with `NEXT_PUBLIC_WHATSAPP_NUMBER`. Delete a social
link entry to hide it.

### Colours
Edit the `BRAND TOKENS` at the top of [app/globals.css](app/globals.css). The site uses a neutral
base plus one accent: change `--brand-accent` (and `-strong` / `-soft`) to rebrand. Keep the accent
dark enough for white text on it (WCAG AA, 4.5:1).

### Logo
The navbar/footer use a temporary wordmark in [components/shared/Logo.tsx](components/shared/Logo.tsx).
Swap the `<svg>` for your logo (an `<Image>` works too). Replace `app/icon.svg` for the favicon.

### Services
Edit [lib/services.ts](lib/services.ts). Add an object to `services` and it appears on the Services
page, gets its own `/services/<slug>` page, joins the quote form's product list and the sitemap.
- `status`: `active`, `coming_soon` (shown with a badge, CTA becomes "Ask about this") or `inactive` (hidden everywhere).
- To add a whole new line of business (e.g. Packaging), add an entry to `serviceCategories`, then
  services whose `category` is its slug. Categories marked `coming_soon` are grouped under
  "Future services"; set one to `active` and it gets its own section automatically.
- There are no prices anywhere: all pricing is by quotation.

### Portfolio
Edit [lib/portfolio.ts](lib/portfolio.ts). All current projects are **samples** (`isSample: true`,
shown with a "Sample" tag). For each real job: add the photo, update the title, description and
`image`, and delete `isSample`. Add a filter tab by adding to `portfolioCategories`.

### Page copy
Edit [lib/content.ts](lib/content.ts). The About page copy is placeholder text with no invented
history, awards or statistics.

### Replacing placeholder images
1. Put real photos in `public/images/` (JPG/PNG/WebP; Next optimises them automatically).
2. Update the `image` path of each service/category/project, and the three hero tiles in
   `components/home/Hero.tsx`.
3. Once nothing references them, delete `public/images/placeholders/` and `scripts/generate-placeholders.mjs`.

### Moving data into Supabase later
Everything reads data through the async functions at the bottom of `lib/services.ts` and
`lib/portfolio.ts`. Replace their bodies with Supabase queries (the tables already exist) and no
page or component needs to change.

## Quote and contact forms: how they are protected

- Validation runs in the browser (instant feedback) **and** on the server (the real check).
- Uploads: JPG, PNG, WebP or PDF, max 4 MB (the limit of Vercel's request body). The server checks
  the declared type, the size **and the file's actual first bytes**, so renamed files are rejected.
- Files go to a private bucket; the notification email contains a signed link valid for 7 days.
- Spam: a hidden honeypot field, a minimum fill time, and a limit of 5 submissions per IP per hour.
  The rate limiter is in-memory, so on serverless it is best-effort. For stronger protection add
  Vercel WAF rate limiting or a shared store (Upstash Redis) behind `lib/rate-limit.ts`.
- The service-role key lives only on the server. Table access has Row Level Security on.

## Deploying

The project is connected to Vercel and GitHub: every push to `main` deploys. Add the environment
variables above in *Vercel -> Project -> Settings -> Environment Variables*, then redeploy.
To use `threadcorestudios.com`, add it under *Settings -> Domains* and create the DNS records
Vercel shows at your domain registrar.

## Roadmap

The architecture leaves room for these later phases (none are built yet):

1. **Online shop:** product catalogue, variations, customisation options, cart, payments.
2. **Customer accounts:** login, order history and tracking, repeat orders.
3. **Admin dashboard:** manage services, portfolio, enquiries, quotations and orders.
4. **Expansion:** new product categories, corporate accounts, bulk orders, packaging and signage.

## Outstanding before launch

- [ ] Set `NEXT_PUBLIC_WHATSAPP_NUMBER`. Until then WhatsApp buttons open WhatsApp with the message ready but no recipient.
- [ ] Replace the placeholder phone, email, address and social links in `lib/config.ts`.
- [ ] Run `supabase/schema.sql` and set the Supabase variables (forms don't save until you do).
- [ ] Optional: set the Resend variables for email alerts.
- [ ] Replace placeholder images and sample portfolio projects with real photography.
- [ ] Replace the temporary wordmark with the real logo; review the About copy.
- [ ] Point `threadcorestudios.com` DNS at Vercel.
