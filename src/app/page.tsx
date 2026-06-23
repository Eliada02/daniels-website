import { SiteMotion } from "@/components/site-motion";
import {
  Barometer,
  GoldGradientDef,
  PathRail,
  ProgressBar,
} from "@/components/chrome/site-chrome";
import { SiteNav } from "@/components/chrome/site-nav";
import { Hero } from "@/components/sections/hero";
import { PainPoints } from "@/components/sections/pain-points";
import { Solution } from "@/components/sections/solution";
import { Method } from "@/components/sections/method";
import { Education } from "@/components/sections/education";
import { Testimonials } from "@/components/sections/testimonials";
import { Cta } from "@/components/sections/cta";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  return (
    <SiteMotion motion={siteConfig.motion}>
      <GoldGradientDef />
      <ProgressBar />
      <Barometer />
      <PathRail />
      <SiteNav />

      <main>
        <Hero />
        <PainPoints />
        <Solution />
        <Method />
        <Education />
        <Testimonials />
        <Cta />
      </main>
    </SiteMotion>
  );
}
