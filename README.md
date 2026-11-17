# Studio site: frontend

Next.js 14 (App Router) + Tailwind 3. The enquiry form posts to `/api/enquire` in this app. A separate Render backend is no longer required.

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

Deploy to Vercel with **Root Directory = frontend** (or the directory containing this package.json). Add `RESEND_API_KEY`, `STUDIO_EMAIL` (your receiving inbox), and `FROM_EMAIL` (a sender on your verified Resend domain) in Vercel Settings > Environment Variables, then redeploy. Remove the old `NEXT_PUBLIC_API_URL`; the form now uses its own website's API.

The server route is `app/api/enquire/route.js`. It validates submissions, emails the studio via Resend, and sends a visitor confirmation. `MONGODB_URI` optionally saves a backup in the `enquiries` collection. No Notion connection is included. Without the required email settings, the form returns a setup error rather than claiming it sent an enquiry.

For spam protection, configure both `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` and allow your deployed hostname in Cloudflare Turnstile. The hidden honeypot remains active without these keys. The old Express backend's in-memory rate limiter is not used by this route; configure a Vercel Firewall rate-limit rule for POST `/api/enquire` for deployment-level rate limiting.

After deploying, submit one real test enquiry and check the studio inbox, visitor confirmation, and Vercel function logs. Local development uses the same route with settings from `.env.local`.

## Instagram posts, project pictures, and client reviews

Edit these lists in `lib/content.js`. They start empty so the site never publishes invented posts or testimonials. The sections show a brief coming-soon message until you add content.

### Link an Instagram post

Add an entry inside `instagram.posts`. Use an actual Instagram post or reel permalink. Posts appear as image-only cards linked to Instagram, without follower counts or likes. After adding links, run the cover importer described below to save their public cover images locally. No Instagram API key is needed.

```js
{
  id: "kaye-launch",
  projectSlug: "kayecanvas", // must match the project's existing slug exactly
  url: "https://www.instagram.com/p/YOUR_REAL_POST_ID/",
  image: "/instagram/kaye-launch.jpg", // optional; stored in public/instagram/
  alt: "Describe the post's image",
  title: "A closer look at KayeCanvas",
  caption: "Your own caption for this post.",
  showOnHome: true,
},
```

You can also paste plain link strings inside `instagram.posts` for homepage-only posts, for example `"https://www.instagram.com/p/YOUR_REAL_POST_ID/"`. Example IDs starting with `YOUR_` are skipped until replaced with real links. The `image` field points to a saved local cover.

A post with `projectSlug` appears on that case study. It also appears on the homepage unless `showOnHome` is `false`. Omit `projectSlug` for a general studio post that only appears on the homepage. Invalid or non-Instagram post URLs are skipped.

### Add meeting photos, moodboards, or sketches

Every project object now has `gallery: []`. Add images to the relevant project's array. These photos appear only on that case study, and open at full size when clicked.

```js
gallery: [
  {
    src: "/projects/kayecanvas/moodboard.jpg",
    alt: "Describe the colors, references, and textures on the moodboard",
    label: "The moodboard",
    caption: "A few references that helped us find the direction.",
  },
  {
    src: "/projects/kayecanvas/meeting.jpg",
    alt: "Describe the project meeting photograph",
    label: "Our first conversation",
    caption: "Your own note about this meeting.",
  },
],
```

Place the corresponding files under `public/projects/kayecanvas/`. Use photos and meeting screenshots you have permission to publish.

### Add a real client review

Add an entry inside `reviews.items`. The same review appears on the homepage and its matching project page; there is no need to copy it twice.

```js
{
  id: "kaye-review",
  projectSlug: "kayecanvas",
  quote: "Paste the client's actual words here.",
  name: "Client's approved display name",
  role: "Artist, KayeCanvas", // optional
  avatar: "/reviews/kaye.jpg", // optional
  showOnHome: true,
},
```

Only entries with a quote and a name are displayed. Set `showOnHome: false` to keep a review on its project page only. The section headings and introductory text are editable in the `instagram` and `reviews` objects too.


## Standalone section pages

The homepage is still `/`. Section pages reuse the same content and components:
`/hero`, `/before-after`, `/work`, `/packages`, `/process`, `/about`, `/instagram`, `/reviews`, `/faq`, and `/enquire`.

## Image-only Instagram cards (no stats)

The site now uses locally saved cover images linked to your posts, not Instagram embeds. Your three existing post images are saved in `public/instagram/`.

When adding more posts, add an object to `instagram.posts` in `lib/content.js`:

```js
{ id: "post-4", url: "https://www.instagram.com/p/REAL_POST_ID/", title: "Your title", projectSlug: "kayecanvas" }
```

Then run from the frontend directory:

```powershell
powershell -NoProfile -File scripts/import-instagram-covers.ps1
```

This imports public post cover images and fills the `image` field automatically, skipping existing local covers. Instagram may block downloads or remove access; if the script reports that it cannot get an image, save your cover in `public/instagram/` and set `image` manually. To refresh an existing cover, remove its `image` field and rerun the importer. Post links and project associations stay intact.


## Visitor journey

The homepage now introduces the studio, shows work, explains the benefit and services, builds trust through reviews and About, explains the process, answers questions, and ends in the enquiry form. Instagram is optional browsing near the end.

Package prices and detailed scope are on `/packages`; the homepage services overview lives in `servicesOverview` in `lib/content.js`. Main enquiry links use “Tell me about your project”. The quote opener is preserved.

The enquiry keeps the original full form, with all fields visible together. Package links use `/enquire?package=PACKAGE_ID` and preselect that package. The visible response promise comes from your existing copy: 2 working days. No free-call claim has been added.

`/before-after` remains available for old links, but it is no longer promoted in the page directory; the comparison is part of the homepage journey. Standalone pages include a relevant next step to enquire.

