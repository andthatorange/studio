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

## Instagram posts, project pictures, and client reviews

Edit these lists in `lib/content.js`. They start empty so the site never publishes invented posts or testimonials. The sections show a brief coming-soon message until you add content.

### Link an Instagram post

Add an entry inside `instagram.posts`. Use an actual Instagram post or reel permalink. The post is embedded directly from Instagram, including its media. No uploaded image or API key is needed. The account/post must be public and allow embedding. Instagram may not render private, deleted, or restricted posts; the direct Instagram link remains available.

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

You can also paste plain link strings inside `instagram.posts` for homepage-only posts, for example `"https://www.instagram.com/p/YOUR_REAL_POST_ID/"`. Example IDs starting with `YOUR_` are skipped until replaced with real links. Old `image` fields are ignored.

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

