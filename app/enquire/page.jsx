import SectionPage from "@/components/SectionPage";
import Enquire from "@/components/Enquire";

export const metadata = { title: "Let’s make something that feels like you. | WebsitesbyKhaula Studio", description: "A new website, a fresh start, or an idea that is still taking shape. Tell me about it." };

export default function Page() {
  return <SectionPage title="Let’s make something that feels like you." intro="A new website, a fresh start, or an idea that is still taking shape. Tell me about it." current="/enquire"><Enquire /></SectionPage>;
}
