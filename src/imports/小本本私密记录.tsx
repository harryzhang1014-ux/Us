import svgPaths from "./svg-nrdipqwi0i";

function Svg() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.p4cc6c80} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white w-[69.98px]">
        <p className="leading-[20px]">New Entry</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#292524] content-stretch flex gap-[12px] items-center px-[32px] py-[12px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[9999px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]" data-name="Button:shadow" />
      <Svg />
      <Container />
    </div>
  );
}

function FloatingActionButton() {
  return (
    <div className="absolute bottom-[31.5px] content-stretch flex items-start justify-center left-[32px] right-[32px]" data-name="FloatingActionButton">
      <Button />
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p42a6600} id="Vector" stroke="var(--stroke-0, #292524)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="opacity-30 relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <Svg1 />
      </div>
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p2272f8f0} fill="var(--fill-0, #F43F5E)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col h-[8px] items-start pt-[4px] relative shrink-0 w-[4px]" data-name="Margin">
      <div className="bg-[#f43f5e] rounded-[9999px] shrink-0 size-[4px]" data-name="Background" />
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <Svg2 />
        <Margin />
      </div>
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.pd0cef00} id="Vector" stroke="var(--stroke-0, #292524)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="opacity-30 relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <Svg3 />
      </div>
    </div>
  );
}

function BottomNavPlaceholder() {
  return (
    <div className="absolute backdrop-blur-[6px] bg-[rgba(255,255,255,0.8)] bottom-[-0.5px] content-stretch flex gap-[106px] items-center left-0 max-w-[448px] pb-[12px] pt-[13px] px-[53px] right-0" data-name="BottomNavPlaceholder">
      <div aria-hidden="true" className="absolute border-[#f5f5f4] border-solid border-t inset-0 pointer-events-none" />
      <Container1 />
      <Container2 />
      <Container3 />
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p15c9f900} id="Vector" stroke="var(--stroke-0, #F43F5E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function LockIconIndicatingOnlyMeMode() {
  return (
    <div className="bg-[#ffe4e6] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[32px]" data-name="Lock icon indicating 'Only Me' mode">
      <Svg4 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#fb7185] text-[12px] tracking-[0.6px] uppercase w-[58.42px]">
        <p className="leading-[16px]">Only Me</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
        <LockIconIndicatingOnlyMeMode />
        <Container5 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="relative shrink-0" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Dancing_Script:Semi_Bold',sans-serif] h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[#44403c] text-[24px] w-[170.89px]">
          <p className="leading-[32px]">My Secret Notebook</p>
        </div>
      </div>
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p2e0fe800} id="Vector" stroke="var(--stroke-0, #A8A29E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[8px] relative">
        <Svg5 />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.5)] relative shrink-0 w-full z-[3]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#e7e5e4] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[17px] pt-[32px] px-[24px] relative w-full">
          <Container4 />
          <Heading />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#57534e] text-[14px] tracking-[0.35px] w-[200.67px]">
        <p className="leading-[20px]">OBSERVATIONS ABOUT HER</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <div className="bg-[#93c5fd] rounded-[9999px] shrink-0 size-[8px]" data-name="Background" />
      <Heading1 />
    </div>
  );
}

function Item() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex flex-col items-start pl-[8px] relative w-full">
        <div className="flex flex-col font-['Kalam:Regular',sans-serif] justify-center leading-[32px] not-italic relative shrink-0 text-[#44403c] text-[18px] w-full">
          <p className="mb-0">{`She hums when she's focused on`}</p>
          <p>{`painting... it's the sweetest melody.`}</p>
        </div>
      </div>
    </div>
  );
}

function Item1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div className="content-stretch flex flex-col items-start pl-[8px] relative w-full">
        <div className="flex flex-col font-['Kalam:Regular',sans-serif] justify-center leading-[32px] not-italic relative shrink-0 text-[#44403c] text-[18px] w-full">
          <p className="mb-0">She always folds the corner of pages</p>
          <p>in books she wants me to read next.</p>
        </div>
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="bg-gradient-to-b from-[#e5e7eb] from-[3.125%] relative shrink-0 to-[3.125%] to-[rgba(229,231,235,0)] w-full" data-name="List">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start pt-[8px] relative w-full">
        <Item />
        <Item1 />
      </div>
    </div>
  );
}

function Svg6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p3b0e2580} id="Vector" stroke="var(--stroke-0, #60A5FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative">
        <Svg6 />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#60a5fa] text-[12px] text-center w-[94.67px]">
          <p className="leading-[16px]">Add observation</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[rgba(239,246,255,0.5)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[15.5px] items-start p-[17px] relative w-full">
        <List />
        <Button2 />
      </div>
    </div>
  );
}

function SectionObservations() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Section: Observations">
      <Container6 />
      <BackgroundBorderShadow />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#57534e] text-[14px] tracking-[0.35px] w-[105.67px]">
        <p className="leading-[20px]">THINGS I LOVE</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <div className="bg-[#fda4af] rounded-[9999px] shrink-0 size-[8px]" data-name="Background" />
      <Heading2 />
    </div>
  );
}

function Svg7() {
  return (
    <div className="relative shrink-0 size-[96px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 96 96">
        <g id="SVG">
          <path d={svgPaths.p292e7f80} fill="var(--fill-0, #FFE4E6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function DecorativeElement() {
  return (
    <div className="absolute opacity-50 right-[-15px] top-[-15px]" data-name="Decorative element">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <Svg7 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#fb7185] text-[16px] w-[11.88px]">
        <p className="leading-[24px]">1.</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[6.76px] relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Kalam:Regular',sans-serif] h-[56px] justify-center leading-[28px] not-italic relative shrink-0 text-[#44403c] text-[18px] w-[269.37px]">
        <p className="mb-0">The way her eyes crinkle when she</p>
        <p>laughs at my bad jokes.</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[12px] h-[56px] items-start relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container11 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#fb7185] text-[16px] w-[15.08px]">
        <p className="leading-[24px]">2.</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[75.25px] relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Kalam:Regular',sans-serif] h-[56px] justify-center leading-[28px] not-italic relative shrink-0 text-[#44403c] text-[18px] w-[197.67px]">
        <p className="mb-0">Her kindness toward total</p>
        <p>strangers.</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[12px] h-[56px] items-start relative shrink-0 w-full" data-name="Container">
      <Container13 />
      <Container14 />
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start relative w-full">
        <Container9 />
        <Container12 />
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#fecdd3] border-dashed inset-0 pointer-events-none rounded-[12px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[2px] py-[10px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#fb7185] text-[14px] text-center w-[129.52px]">
          <p className="leading-[20px]">Tap to write more...</p>
        </div>
      </div>
    </div>
  );
}

function OverlayBorderShadow() {
  return (
    <div className="bg-[rgba(255,241,242,0.3)] relative rounded-[16px] shrink-0 w-full" data-name="Overlay+Border+Shadow">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start p-[21px] relative w-full">
          <DecorativeElement />
          <Container8 />
          <Button3 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#ffe4e6] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function SectionThingsILove() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Section: Things I Love">
      <Container7 />
      <OverlayBorderShadow />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#57534e] text-[14px] tracking-[0.35px] w-[97.48px]">
        <p className="leading-[20px]">MY FEELINGS</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <div className="bg-[#d8b4fe] rounded-[9999px] shrink-0 size-[8px]" data-name="Background" />
      <Heading3 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#a8a29e] text-[10px] uppercase w-full">
        <p className="leading-[15px]">March 14, 2024</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Kalam:Regular',sans-serif] justify-center leading-[29.25px] not-italic relative shrink-0 text-[#44403c] text-[18px] w-full">
        <p className="mb-0">{`"Today was hard at work, but just`}</p>
        <p className="mb-0">thinking about seeing her later made</p>
        <p className="mb-0">{`everything feel lighter. It's crazy how`}</p>
        <p className="mb-0">much of an impact she has on my</p>
        <p>{`mood without even trying."`}</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative w-full">
        <Container17 />
        <Container18 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#d8b4fe] text-[10px] w-[97.39px]">
        <p className="leading-[15px]">Unlocked via FaceID</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-end relative size-full">
        <Container20 />
      </div>
    </div>
  );
}

function BackgroundBorderShadow1() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[rgba(250,245,255,0.5)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[17px] relative w-full">
        <Container16 />
        <Container19 />
      </div>
    </div>
  );
}

function SectionMyFeelings() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Section: My Feelings">
      <Container15 />
      <BackgroundBorderShadow1 />
    </div>
  );
}

function ContentArea() {
  return (
    <div className="relative shrink-0 w-full z-[2]" data-name="ContentArea">
      <div className="content-stretch flex flex-col gap-[32px] items-start p-[24px] relative w-full">
        <SectionObservations />
        <SectionThingsILove />
        <SectionMyFeelings />
      </div>
    </div>
  );
}

function MainContainer() {
  return (
    <div className="content-stretch flex flex-col isolate items-start max-w-[448px] min-h-[1059px] pb-[80px] relative shrink-0 w-full" data-name="MainContainer" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 390 1059.5\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(27.577 0 0 74.918 195 529.75)\\'><stop stop-color=\\'rgba(229,231,235,1)\\' offset=\\'0.029463\\'/><stop stop-color=\\'rgba(229,231,235,0)\\' offset=\\'0.029463\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgb(253, 251, 247) 0%, rgb(253, 251, 247) 100%)" }}>
      <Header />
      <ContentArea />
      <div className="absolute bg-[rgba(255,255,255,0)] inset-[0_0_-0.75px_0] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] z-[1]" data-name="MainContainer:shadow" />
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-[#f5f5f4] content-stretch flex flex-col items-start relative size-full" data-name="小本本 - 私密记录">
      <FloatingActionButton />
      <BottomNavPlaceholder />
      <MainContainer />
    </div>
  );
}