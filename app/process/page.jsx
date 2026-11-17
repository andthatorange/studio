import SectionPage from "@/components/SectionPage";
import Process from "@/components/Process";

export const metadata = { title: "From an idea to a place of your own. | WebsitesbyKhaula Studio", description: "A thoughtful process, with room for questions, collaboration, and the details that matter." };

export default function Page() {
  return <SectionPage title="From an idea to a place of your own." intro="A thoughtful process, with room for questions, collaboration, and the details that matter." current="/process"><Process /></SectionPage>;
}
