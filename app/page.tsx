import type { Metadata } from "next";
import { HomeExperience } from "@/components/HomeExperience";

export const metadata: Metadata = {
  title: "Windowprime | Ramen & deuren op maat",
  description:
    "Ramen en deuren met karakter. Ontdek aluminium en pvc schrijnwerk, vakkundig geplaatst door Windowprime.",
};

export default function Home() {
  return <HomeExperience />;
}
