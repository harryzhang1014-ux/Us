import svgPaths from "./svg-j5vul9p4ap";
import imgSummerBeachDay from "figma:asset/b2ab0f839653e5928dccaef2f7e3a39023e25933.png";
import imgAnniversaryDinner from "figma:asset/e8ecdc95e1e4fc06c75b50e4e19a9125b0293b4b.png";
import imgMovingIn from "figma:asset/de8c7fc3b69d48612755c616dda77a47c8ee91fa.png";
import imgSundayMorning from "figma:asset/acf29dd39efdddcc8eb62fc5184b9ba57ea05f01.png";
import imgParkWalk from "figma:asset/b4c738686f6222cabb67299b2eba01ce999a182c.png";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Playfair_Display:Bold',sans-serif] font-bold h-[36px] justify-center leading-[0] relative shrink-0 text-[#1f2937] text-[30px] w-[172.41px]">
        <p className="leading-[36px]">Love Gallery</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] w-[153.34px]">
        <p className="leading-[20px]">Capturing our forever...</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[172.41px]" data-name="Container">
      <Heading />
      <Container2 />
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d="M12 4V20M20 12H4" id="Vector" stroke="var(--stroke-0, #F06292)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start p-[9px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#fdf2f8] border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Svg />
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-end justify-between relative w-full">
        <Container1 />
        <Button />
      </div>
    </div>
  );
}

function MainHeader() {
  return (
    <div className="backdrop-blur-[6px] bg-[rgba(255,249,245,0.8)] relative shrink-0 w-full z-[4]" data-name="MainHeader">
      <div aria-hidden="true" className="absolute border-[#fce7f3] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[17px] pt-[48px] px-[24px] relative w-full">
        <Container />
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p42a6600} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[10px] uppercase w-[30.13px]">
        <p className="leading-[15px]">Home</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <Svg1 />
      <Margin />
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p38d04800} id="Vector" stroke="var(--stroke-0, #F06292)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#f06292] text-[10px] uppercase w-[45.23px]">
        <p className="leading-[15px]">Gallery</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <Svg2 />
      <Margin1 />
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p12978b80} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[10px] uppercase w-[31.81px]">
        <p className="leading-[15px]">Dates</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <Svg3 />
      <Margin2 />
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.pdd9b840} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[10px] uppercase w-[40.73px]">
        <p className="leading-[15px]">Profile</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <Svg4 />
      <Margin3 />
    </div>
  );
}

function Nav() {
  return (
    <div className="relative shrink-0 w-full" data-name="Nav">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pr-[0.02px] relative w-full">
          <Container3 />
          <Container4 />
          <Container5 />
          <Container6 />
        </div>
      </div>
    </div>
  );
}

function FooterBottomNav() {
  return (
    <div className="absolute backdrop-blur-[8px] bg-[rgba(255,255,255,0.9)] bottom-0 content-stretch flex flex-col items-start left-0 pb-[16px] pt-[17px] px-[32px] w-[390px] z-[3]" data-name="Footer - BottomNav">
      <div aria-hidden="true" className="absolute border-[#fce7f3] border-solid border-t inset-0 pointer-events-none" />
      <Nav />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#f06292] content-stretch flex flex-col items-center justify-center left-0 pb-[9.5px] pt-[8.5px] px-[24px] rounded-[9999px] top-0" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[9999px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" data-name="Button:shadow" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white w-[81.95px]">
        <p className="leading-[20px]">All Moments</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center px-[25px] py-[9px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#fdf2f8] border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[14px] text-center w-[112.41px]">
        <p className="leading-[20px]">Shared Moments</p>
      </div>
    </div>
  );
}

function ButtonMargin() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[129.95px] pl-[16px] top-0" data-name="Button:margin">
      <Button2 />
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center px-[25px] py-[9px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#fdf2f8] border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[14px] text-center w-[69.89px]">
        <p className="leading-[20px]">Date Night</p>
      </div>
    </div>
  );
}

function ButtonMargin1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[308.36px] pl-[16px] top-0" data-name="Button:margin">
      <Button3 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center px-[25px] py-[9px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#fdf2f8] border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[14px] text-center w-[90.98px]">
        <p className="leading-[20px]">Memory Lane</p>
      </div>
    </div>
  );
}

function ButtonMargin2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[444.25px] pl-[16px] top-0" data-name="Button:margin">
      <Button4 />
    </div>
  );
}

function NavHorizontalScrollableCategoriesForEasyNavigation() {
  return (
    <div className="h-[62px] overflow-clip relative shrink-0 w-full" data-name="Nav - Horizontal scrollable categories for easy navigation">
      <Button1 />
      <ButtonMargin />
      <ButtonMargin1 />
      <ButtonMargin2 />
    </div>
  );
}

function SummerBeachDay() {
  return (
    <div className="aspect-[169/169] relative shrink-0 w-full" data-name="Summer Beach Day">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgSummerBeachDay} />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[10px] tracking-[0.5px] uppercase w-[103.41px]">
        <p className="leading-[15px]">Shared Moments</p>
      </div>
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path clipRule="evenodd" d={svgPaths.p24d2bb80} fill="var(--fill-0, #F06292)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container9 />
      <Svg5 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">
        <p className="leading-[16px]">June 14, 2023</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start p-[12px] relative w-full">
        <Container8 />
        <Container10 />
      </div>
    </div>
  );
}

function ArticleMemoryCard() {
  return (
    <div className="absolute bg-white left-0 right-[187px] rounded-[16px] top-0" data-name="Article - Memory Card 1">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] w-full">
        <SummerBeachDay />
        <Container7 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#fdf2f8] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function AnniversaryDinner() {
  return (
    <div className="aspect-[169/169] relative shrink-0 w-full" data-name="Anniversary Dinner">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgAnniversaryDinner} />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[10px] tracking-[0.5px] uppercase w-[65.31px]">
        <p className="leading-[15px]">Date Night</p>
      </div>
    </div>
  );
}

function Svg6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.pcdf1ec0} id="Vector" stroke="var(--stroke-0, #F06292)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container13 />
      <Svg6 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">
        <p className="leading-[16px]">Aug 21, 2023</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start p-[12px] relative w-full">
        <Container12 />
        <Container14 />
      </div>
    </div>
  );
}

function ArticleMemoryCard1() {
  return (
    <div className="absolute bg-white left-0 right-[187px] rounded-[16px] top-[247px]" data-name="Article - Memory Card 2">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] w-full">
        <AnniversaryDinner />
        <Container11 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#fdf2f8] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function MovingIn() {
  return (
    <div className="aspect-[169/169] relative shrink-0 w-full" data-name="Moving In">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgMovingIn} />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[10px] tracking-[0.5px] uppercase w-[80.17px]">
        <p className="leading-[15px]">Memory Lane</p>
      </div>
    </div>
  );
}

function Svg7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path clipRule="evenodd" d={svgPaths.p24d2bb80} fill="var(--fill-0, #F06292)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Svg7 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">
        <p className="leading-[16px]">Sept 05, 2023</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start p-[12px] relative w-full">
        <Container16 />
        <Container18 />
      </div>
    </div>
  );
}

function ArticleMemoryCard2() {
  return (
    <div className="absolute bg-white left-0 right-[187px] rounded-[16px] top-[494px]" data-name="Article - Memory Card 3">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] w-full">
        <MovingIn />
        <Container15 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#fdf2f8] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function SundayMorning() {
  return (
    <div className="aspect-[169/169] relative shrink-0 w-full" data-name="Sunday Morning">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgSundayMorning} />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[10px] tracking-[0.5px] uppercase w-[65.31px]">
        <p className="leading-[15px]">Date Night</p>
      </div>
    </div>
  );
}

function Svg8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.pcdf1ec0} id="Vector" stroke="var(--stroke-0, #F06292)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container21 />
      <Svg8 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">
        <p className="leading-[16px]">Oct 12, 2023</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start p-[12px] relative w-full">
        <Container20 />
        <Container22 />
      </div>
    </div>
  );
}

function ArticleMemoryCard3() {
  return (
    <div className="absolute bg-white left-[187px] right-0 rounded-[16px] top-0" data-name="Article - Memory Card 4">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] w-full">
        <SundayMorning />
        <Container19 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#fdf2f8] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function ParkWalk() {
  return (
    <div className="aspect-[169/169] relative shrink-0 w-full" data-name="Park Walk">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgParkWalk} />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[10px] tracking-[0.5px] uppercase w-[103.41px]">
        <p className="leading-[15px]">Shared Moments</p>
      </div>
    </div>
  );
}

function Svg9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path clipRule="evenodd" d={svgPaths.p24d2bb80} fill="var(--fill-0, #F06292)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container25 />
      <Svg9 />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">
        <p className="leading-[16px]">Nov 30, 2023</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start p-[12px] relative w-full">
        <Container24 />
        <Container26 />
      </div>
    </div>
  );
}

function ArticleMemoryCard4() {
  return (
    <div className="absolute bg-white left-[187px] right-0 rounded-[16px] top-[247px]" data-name="Article - Memory Card 5">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] w-full">
        <ParkWalk />
        <Container23 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#fdf2f8] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function SectionMasonryGallery() {
  return (
    <div className="h-[725px] relative shrink-0 w-full" data-name="Section - MasonryGallery">
      <ArticleMemoryCard />
      <ArticleMemoryCard1 />
      <ArticleMemoryCard2 />
      <ArticleMemoryCard3 />
      <ArticleMemoryCard4 />
    </div>
  );
}

function Main() {
  return (
    <div className="relative shrink-0 w-full z-[2]" data-name="Main">
      <div className="content-stretch flex flex-col items-start px-[16px] py-[24px] relative w-full">
        <NavHorizontalScrollableCategoriesForEasyNavigation />
        <SectionMasonryGallery />
      </div>
    </div>
  );
}

function Svg10() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="SVG">
          <path d={svgPaths.p23905a80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p19bbe3e0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#f06292] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[56px]" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] left-0 rounded-[9999px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[56px] top-0" data-name="Button:shadow" />
      <Svg10 />
    </div>
  );
}

function FloatingAddButtonMobileSpecific() {
  return (
    <div className="absolute bottom-[96px] content-stretch flex flex-col items-start right-[24px] z-[1]" data-name="FloatingAddButton (Mobile Specific)">
      <Button5 />
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-[#fff9f5] content-stretch flex flex-col isolate items-start pb-[80px] relative size-full" data-name="恋爱相册">
      <MainHeader />
      <FooterBottomNav />
      <Main />
      <FloatingAddButtonMobileSpecific />
    </div>
  );
}