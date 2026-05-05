import { useEffect } from "react";
import { HeaderNav } from "@/components/report/HeaderNav";
import { BackToTop } from "@/components/report/BackToTop";
import { ExportMenu } from "@/components/report/ExportMenu";
import { SectionDivider } from "@/components/report/SectionDivider";
import { CoverSection } from "@/sections/CoverSection";
import { HangzhouEcosystemSection } from "@/sections/HangzhouEcosystemSection";
import { CaseSelectionSection } from "@/sections/CaseSelectionSection";
import { DualDriveSection } from "@/sections/DualDriveSection";
import { BodyFormSection } from "@/sections/BodyFormSection";
import { CoreSpecsSection } from "@/sections/CoreSpecsSection";
import { MindBrainSection } from "@/sections/MindBrainSection";
import { CerebellumSection } from "@/sections/CerebellumSection";
import { ScenarioSection } from "@/sections/ScenarioSection";
import { MarketSection } from "@/sections/MarketSection";
import { GTMSection } from "@/sections/GTMSection";
import { PainPointsSection } from "@/sections/PainPointsSection";
import { CompetitiveSection } from "@/sections/CompetitiveSection";
import { VisionSection } from "@/sections/VisionSection";
import { ReferencesSection } from "@/sections/ReferencesSection";

interface HomeProps {
  targetSection?: string;
}

export default function Home({ targetSection }: HomeProps) {
  useEffect(() => {
    if (targetSection) document.getElementById(targetSection)?.scrollIntoView({ behavior: "smooth" });
  }, [targetSection]);

  return (
    <div className="bg-cyber-grid min-h-screen">
      <HeaderNav />
      <BackToTop />
      <ExportMenu />

      <main id="report-root" className="mx-auto max-w-8xl px-4 py-10 md:py-14 md:pl-48">
        <div className="grid gap-6 md:gap-8">
          <CoverSection />
          <SectionDivider />
          <HangzhouEcosystemSection />
          <SectionDivider />
          <CaseSelectionSection />
          <SectionDivider />
          <DualDriveSection />
          <SectionDivider />
          <BodyFormSection />
          <SectionDivider />
          <CoreSpecsSection />
          <SectionDivider />
          <MindBrainSection />
          <SectionDivider />
          <CerebellumSection />
          <SectionDivider />
          <ScenarioSection />
          <SectionDivider />
          <MarketSection />
          <SectionDivider />
          <GTMSection />
          <SectionDivider />
          <PainPointsSection />
          <SectionDivider />
          <CompetitiveSection />
          <SectionDivider />
          <VisionSection />
          <SectionDivider />
          <ReferencesSection />
        </div>
      </main>
    </div>
  );
}
