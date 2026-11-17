import SectionPage from "@/components/SectionPage";
import BeforeAfter from "@/components/BeforeAfter";

export const metadata = { title: "A little clarity changes the picture. | WebsitesbyKhaula Studio", description: "What a considered website can bring to your work, your story, and your next step." };

export default function Page() {
  return <SectionPage title="A little clarity changes the picture." intro="What a considered website can bring to your work, your story, and your next step." current="/before-after"><BeforeAfter /></SectionPage>;
}
