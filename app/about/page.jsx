import SectionPage from "@/components/SectionPage";
import About from "@/components/About";

export const metadata = { title: "A little about the person behind the pixels. | WebsitesbyKhaula Studio", description: "Meet Khaula, and get a feel for the studio and how we can work together." };

export default function Page() {
  return <SectionPage title="A little about the person behind the pixels." intro="Meet Khaula, and get a feel for the studio and how we can work together." current="/about"><About /></SectionPage>;
}
