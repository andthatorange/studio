import SectionPage from "@/components/SectionPage";
import Packages from "@/components/Packages";

export const metadata = { title: "A little beginning or the whole picture. | WebsitesbyKhaula Studio", description: "Find a starting point for your website, then shape the details around your brand." };

export default function Page() {
  return <SectionPage title="A little beginning or the whole picture." intro="Find a starting point for your website, then shape the details around your brand." current="/packages"><Packages /></SectionPage>;
}
