# Studio site: frontend

Next.js 14 (App Router) + Tailwind 3. The enquiry form posts to the separate `../backend` API.

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
```

## Where to edit
- `lib/content.js`: every word, package, case study and form option. Replace the [bracketed] placeholders.
- `app/globals.css`: color and font tokens (CSS variables). Change these when your Figma design is ready.
- `app/page.jsx`: section order/layout. `components/`: Header, Footer, Packages, EnquiryForm.
- `app/work/[slug]/page.jsx`: case study template. Put images in `/public`.
- Thank-you text after sending: `components/EnquiryForm.jsx`.

Deploy to Vercel with **Root Directory = frontend** and set `NEXT_PUBLIC_API_URL` to your deployed backend URL.
