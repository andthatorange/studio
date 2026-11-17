import SectionPage from "@/components/SectionPage";
import Reviews from "@/components/Reviews";

export const metadata = { title: "Kind words, lovely people. | WebsitesbyKhaula Studio", description: "Real experiences from the people behind the projects." };

export default function Page() {
  return <SectionPage title="Kind words, lovely people." intro="Real experiences from the people behind the projects." current="/reviews"><Reviews /></SectionPage>;
}
