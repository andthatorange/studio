import SectionPage from "@/components/SectionPage";
import FAQ from "@/components/FAQ";

export const metadata = { title: "A few things you might be wondering. | WebsitesbyKhaula Studio", description: "Scope, timing, working together: a little clarity before we begin." };

export default function Page() {
  return <SectionPage title="A few things you might be wondering." intro="Scope, timing, working together: a little clarity before we begin." current="/faq"><FAQ /></SectionPage>;
}
