import svgPaths from "./svg-fovyuwmqmn";
import imgMainAppContainer from "figma:asset/e80a17d6fcd466dd3ad4d0e2bbfc1dd241a8396b.png";

function Container() {
  return (
    <div className="opacity-80 relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Nimbus_Sans:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white tracking-[1.2px] uppercase w-[56.34px]">
          <p className="leading-[16px]">Streak</p>
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nimbus_Sans:Bold',sans-serif] h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white w-[26.7px]">
        <p className="leading-[32px]">24</p>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.p46d0800} fill="var(--fill-0, #FB923C)" id="Vector" />
          <path d={svgPaths.p125c0780} fill="var(--fill-0, #FB923C)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4.01px] items-center relative">
        <Container2 />
        <Svg />
      </div>
    </div>
  );
}

function StreakDisplay() {
  return (
    <div className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.2)] content-stretch flex flex-col items-center px-[21px] py-[13px] relative rounded-[16px] shrink-0" data-name="Streak Display">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container />
      <Container1 />
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p311dd680} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p283e8d20} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function SettingsProfileButton() {
  return (
    <div className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.2)] content-stretch flex items-center justify-center p-px relative rounded-[9999px] shrink-0 size-[48px]" data-name="Settings/Profile Button">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Svg1 />
    </div>
  );
}

function HeaderTopNavigationStats() {
  return (
    <div className="absolute content-stretch flex items-start justify-between left-[24px] pt-[32px] right-[24px] top-[24px]" data-name="Header - Top Navigation & Stats">
      <StreakDisplay />
      <SettingsProfileButton />
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p14698b60} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#ff8787] content-stretch flex flex-col items-start p-[12px] relative rounded-[16px] shrink-0" data-name="Background">
      <Svg2 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Nimbus_Sans:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-[81.72px]">
        <p className="leading-[20px]">New Prompt</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-70 relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nimbus_Sans:Regular_Italic',sans-serif] h-[48px] justify-center leading-[16px] not-italic relative shrink-0 text-[12px] text-white w-[104.8px]">
        <p className="mb-0">{`"What's one thing I`}</p>
        <p className="mb-0">did today that made</p>
        <p>{`you smile?"`}</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[104.8px]" data-name="Container">
      <Heading />
      <Container5 />
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative">
        <Background />
        <Container4 />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[16px] py-[8px] relative">
        <div className="flex flex-col font-['Nimbus_Sans:Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#fa5252] text-[12px] text-center tracking-[0.6px] uppercase w-[56.59px]">
          <p className="leading-[16px]">Answer</p>
        </div>
      </div>
    </div>
  );
}

function ActivityFeedSuggestion() {
  return (
    <div className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.1)] relative rounded-[24px] shrink-0 w-full" data-name="Activity Feed/Suggestion">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[21px] relative w-full">
          <Container3 />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p28a11680} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <rect height="10" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="6" x="9" y="12" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-60 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nimbus_Sans:Regular',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white tracking-[-0.5px] uppercase w-[28px]">
        <p className="leading-[15px]">Home</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0" data-name="Link">
      <Svg3 />
      <Container6 />
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p1248b280} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M16 2V6" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M8 2V6" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M3 10H21" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-60 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nimbus_Sans:Regular',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white tracking-[-0.5px] uppercase w-[41.58px]">
        <p className="leading-[15px]">Memory</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0" data-name="Link">
      <Svg4 />
      <Container7 />
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p10ae2000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-60 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nimbus_Sans:Regular',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white tracking-[-0.5px] uppercase w-[23.64px]">
        <p className="leading-[15px]">Love</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0" data-name="Link">
      <Svg5 />
      <Container8 />
    </div>
  );
}

function BottomNav() {
  return (
    <div className="relative shrink-0 w-full" data-name="Bottom Nav">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[72.1px] items-center pl-[36.06px] pr-[36.08px] pt-[8px] relative w-full">
          <Link />
          <Link1 />
          <Link2 />
        </div>
      </div>
    </div>
  );
}

function FooterBottomInteractionUi() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[24px] pb-[40px] px-[16px] right-[24px] top-[635px]" data-name="Footer - Bottom Interaction UI">
      <ActivityFeedSuggestion />
      <BottomNav />
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Nimbus_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-[145.67px]">
          <p className="leading-[20px]">Alex is waiting for you...</p>
        </div>
      </div>
    </div>
  );
}

function OverlayBorderOverlayBlur() {
  return (
    <div className="backdrop-blur-[12px] bg-[rgba(0,0,0,0.3)] content-stretch flex gap-[12px] items-center px-[25px] py-[9px] relative rounded-[9999px] shrink-0" data-name="Overlay+Border+OverlayBlur">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="bg-[#4ade80] rounded-[9999px] shadow-[0px_0px_10px_0px_rgba(72,187,120,0.6)] shrink-0 size-[10px]" data-name="Background+Shadow" />
      <Container9 />
    </div>
  );
}

function PartnerSyncStatus() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Partner Sync Status">
      <OverlayBorderOverlayBlur />
    </div>
  );
}

function PartnerSyncStatusMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[48px] relative shrink-0" data-name="Partner Sync Status:margin">
      <PartnerSyncStatus />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nimbus_Sans:Bold',sans-serif] h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-white tracking-[0.45px] uppercase w-[153.17px]">
        <p className="leading-[28px]">Hold to Spark</p>
      </div>
    </div>
  );
}

function TapLabel() {
  return (
    <div className="-translate-x-1/2 absolute bottom-[-40px] content-stretch flex flex-col items-start left-1/2 w-[192px]" data-name="Tap Label">
      <Container10 />
    </div>
  );
}

function Svg6() {
  return (
    <div className="h-full overflow-clip relative shrink-0 w-[192px]" data-name="SVG">
      <div className="absolute bottom-[12.5%] left-1/4 right-1/4 top-[8.33%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 96 152">
          <path d={svgPaths.p134732c0} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Svg7() {
  return (
    <div className="relative size-[192px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 192 192">
        <g id="SVG">
          <path d={svgPaths.p3bbe9600} id="progress-circle" opacity="0.3" stroke="var(--stroke-0, white)" strokeWidth="3.84" />
        </g>
      </svg>
    </div>
  );
}

function ButtonInteractToKeepTheSparkAlive() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[192px]" data-name="Button - Interact to keep the spark alive">
      <Svg6 />
      <div className="absolute flex items-center justify-center left-0 size-[192px] top-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <Svg7 />
        </div>
      </div>
    </div>
  );
}

function TheCoreSparkFlame() {
  return (
    <div className="content-stretch flex flex-col items-start relative shadow-[0px_0px_25px_0px_rgba(255,107,107,0.8)] shrink-0" data-name="The Core 'Spark' Flame">
      <div className="absolute flex inset-[-48px] items-center justify-center">
        <div className="flex-none size-[288px]">
          <div className="bg-[rgba(255,135,135,0.3)] blur-[32px] rounded-[9999px] size-full" data-name="Background Aura" />
        </div>
      </div>
      <TapLabel />
      <ButtonInteractToKeepTheSparkAlive />
    </div>
  );
}

function SectionCentralInteractionZone() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[130px_24px_249px_24px] items-center justify-center" data-name="Section - Central Interaction Zone">
      <PartnerSyncStatusMargin />
      <TheCoreSparkFlame />
    </div>
  );
}

function MainAppContainer() {
  return (
    <div className="h-[884px] relative shrink-0 w-full" data-name="Main App Container">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-full left-[-63.33%] max-w-none top-0 w-[226.67%]" src={imgMainAppContainer} />
        </div>
        <div className="absolute bg-gradient-to-b from-[rgba(0,0,0,0.2)] inset-0 to-[rgba(0,0,0,0.4)]" />
      </div>
      <HeaderTopNavigationStats />
      <FooterBottomInteractionUi />
      <SectionCentralInteractionZone />
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#ff9a9e] items-start relative size-full to-[#fecfef] via-[#fecfef] via-[99%]" data-name="首页 - 续火花互动">
      <MainAppContainer />
    </div>
  );
}