import SectionPage from "@/components/SectionPage";
import InstagramPosts from "@/components/InstagramPosts";

export const metadata = { title: "From the studio journal. | WebsitesbyKhaula Studio", description: "A few little squares of new work, ideas, and everything in between." };

export default function Page() {
  return <SectionPage title="From the studio journal." intro="A few little squares of new work, ideas, and everything in between." current="/instagram"><InstagramPosts /></SectionPage>;
}
