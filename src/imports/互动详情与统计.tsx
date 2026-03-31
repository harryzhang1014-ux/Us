import svgPaths from "./svg-ducdrtjz28";
import imgUser1 from "figma:asset/e5c41b0ce4adf80d3b16e0b857153444d643bdef.png";
import imgUser2 from "figma:asset/20aa0da935d4f405a8f02160c7a2355f256ab275.png";

function Svg() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d="M15 19L8 12L15 5" id="Vector" stroke="var(--stroke-0, #9D4452)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonGoBack() {
  return (
    <div className="relative rounded-[9999px] shrink-0" data-name="Button - Go back">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[8px] relative">
        <Svg />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="relative shrink-0" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[20px] w-[133.88px]">
          <p className="leading-[28px]">Our Journey</p>
        </div>
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p3145f680} id="Vector" stroke="var(--stroke-0, #9D4452)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonSettings() {
  return (
    <div className="relative rounded-[9999px] shrink-0" data-name="Button - Settings">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[8px] relative">
        <Svg1 />
      </div>
    </div>
  );
}

function NavigationHeader() {
  return (
    <div className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.8)] relative shrink-0 w-full" data-name="Navigation Header">
      <div aria-hidden="true" className="absolute border-[rgba(244,172,183,0.2)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[17px] pt-[16px] px-[24px] relative w-full">
          <ButtonGoBack />
          <Heading />
          <ButtonSettings />
        </div>
      </div>
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[120px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120 120">
        <g id="SVG">
          <path d={svgPaths.pe4ceb00} fill="var(--fill-0, #9D4452)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function DecorativeHeartBackground() {
  return (
    <div className="absolute opacity-5 right-[-15px] top-[-15px]" data-name="Decorative heart background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <Svg2 />
      </div>
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p3c07d680} fill="var(--fill-0, #FF85A1)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(255,133,161,0.2)] content-stretch flex flex-col items-start p-[8px] relative rounded-[12px] shrink-0" data-name="Overlay">
      <Svg3 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[18px] w-[130.17px]">
        <p className="leading-[28px]">Spark History</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Comfortaa:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] relative shrink-0 text-[12px] text-[rgba(157,68,82,0.6)] w-[205.92px]">
        <p className="leading-[16px]">Your emotional connection pulse</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[205.92px]" data-name="Container">
      <Heading1 />
      <Container2 />
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative w-full">
        <Overlay />
        <Container1 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative w-full">
        <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[32px] justify-center leading-[0] relative shrink-0 text-[#ff85a1] text-[24px] text-center w-[59.05px]">
          <p className="leading-[32px]">1,284</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#faf9f6] col-1 justify-self-stretch relative rounded-[16px] row-1 self-start shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(244,172,183,0.05)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center p-[17px] relative w-full">
          <Container4 />
          <div className="flex flex-col font-['Comfortaa:Semi_Bold',sans-serif] h-[15px] justify-center leading-[0] not-italic opacity-70 relative shrink-0 text-[#9d4452] text-[10px] text-center tracking-[0.5px] uppercase w-[76.13px]">
            <p className="leading-[15px]">Sparks Sent</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative w-full">
        <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[32px] justify-center leading-[0] relative shrink-0 text-[#ff85a1] text-[24px] text-center w-[48.52px]">
          <p className="leading-[32px]">98%</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#faf9f6] col-2 justify-self-stretch relative rounded-[16px] row-1 self-start shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(244,172,183,0.05)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center p-[17px] relative w-full">
          <Container5 />
          <div className="flex flex-col font-['Comfortaa:Semi_Bold',sans-serif] h-[15px] justify-center leading-[0] not-italic opacity-70 relative shrink-0 text-[#9d4452] text-[10px] text-center tracking-[0.5px] uppercase w-[62.63px]">
            <p className="leading-[15px]">Sync Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_81px] relative w-full">
        <BackgroundBorder />
        <BackgroundBorder1 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute bottom-[-24px] content-stretch flex flex-col items-start left-[35.44%] right-[35.41%]" data-name="Container">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[10px] w-[9.82px]">
        <p className="leading-[15px]">M</p>
      </div>
    </div>
  );
}

function Mon() {
  return (
    <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative rounded-tl-[8px] rounded-tr-[8px]" data-name="Mon">
      <Container6 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bottom-[-24px] content-stretch flex flex-col items-start left-[40.18%] right-[40.15%]" data-name="Container">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[10px] w-[6.62px]">
        <p className="leading-[15px]">T</p>
      </div>
    </div>
  );
}

function Tue() {
  return (
    <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative rounded-tl-[8px] rounded-tr-[8px]" data-name="Tue">
      <Container7 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bottom-[-24px] content-stretch flex flex-col items-start left-[36.06%] right-[36.09%]" data-name="Container">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[10px] w-[9.39px]">
        <p className="leading-[15px]">W</p>
      </div>
    </div>
  );
}

function Wed() {
  return (
    <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative rounded-tl-[8px] rounded-tr-[8px]" data-name="Wed">
      <Container8 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute bottom-[-24px] content-stretch flex flex-col items-start left-[40.15%] right-[40.18%]" data-name="Container">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[10px] w-[6.63px]">
        <p className="leading-[15px]">T</p>
      </div>
    </div>
  );
}

function Thu() {
  return (
    <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative rounded-tl-[8px] rounded-tr-[8px]" data-name="Thu">
      <Container9 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bottom-[-24px] content-stretch flex flex-col items-start left-[40.72%] right-[40.75%]" data-name="Container">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[10px] w-[6.25px]">
        <p className="leading-[15px]">F</p>
      </div>
    </div>
  );
}

function Fri() {
  return (
    <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative rounded-tl-[8px] rounded-tr-[8px]" data-name="Fri">
      <Container10 />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute bottom-[-24px] content-stretch flex flex-col items-start left-[39.8%] right-[39.77%]" data-name="Container">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[10px] w-[6.89px]">
        <p className="leading-[15px]">S</p>
      </div>
    </div>
  );
}

function Sat() {
  return (
    <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative rounded-tl-[8px] rounded-tr-[8px]" data-name="Sat">
      <Container11 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute bottom-[-24px] content-stretch flex flex-col items-start left-[39.8%] right-[39.77%]" data-name="Container">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[10px] w-[6.89px]">
        <p className="leading-[15px]">S</p>
      </div>
    </div>
  );
}

function Sun() {
  return (
    <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative rounded-tl-[8px] rounded-tr-[8px]" data-name="Sun">
      <Container12 />
    </div>
  );
}

function SimpleCssSparkChartVisualization() {
  return (
    <div className="h-[96px] relative shrink-0 w-full" data-name="Simple CSS Spark Chart Visualization">
      <div className="flex flex-row items-end size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-end justify-between pl-[8px] pr-[7.97px] relative size-full">
          <Mon />
          <Tue />
          <Wed />
          <Thu />
          <Fri />
          <Sat />
          <Sun />
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[16px] relative w-full">
        <div className="flex flex-col font-['Comfortaa:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] relative shrink-0 text-[#ff85a1] text-[12px] text-center w-[246.06px]">
          <p className="leading-[16px]">{`✨ You're most connected on Thursdays!`}</p>
        </div>
      </div>
    </div>
  );
}

function SparkHistorySection() {
  return (
    <div className="bg-white relative rounded-[24px] shrink-0 w-full" data-name="Spark History Section">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start p-[25px] relative w-full">
          <DecorativeHeartBackground />
          <Container />
          <Container3 />
          <SimpleCssSparkChartVisualization />
          <Container13 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(244,172,183,0.1)] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[18px] w-[154.38px]">
        <p className="leading-[28px]">Love Challenges</p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#ff85a1] content-stretch flex flex-col items-start px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Comfortaa:Semi_Bold',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-[74.8px]">
        <p className="leading-[16px]">12 / 20 Done</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Background />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[14px] w-[132.48px]">
        <p className="leading-[20px]">{`"Cook a New Meal"`}</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] relative shrink-0 text-[#ff85a1] text-[12px] w-[24.22px]">
        <p className="leading-[16px]">80%</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <Container17 />
        <Container18 />
      </div>
    </div>
  );
}

function ProgressBarContainer() {
  return (
    <div className="bg-[#ffe5d9] h-[10px] relative rounded-[9999px] shrink-0 w-full" data-name="Progress Bar Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="absolute bg-[#ff85a1] h-[10px] left-0 right-[20%] rounded-[9999px] top-0" data-name="Progress Bar Fill" />
      </div>
    </div>
  );
}

function User() {
  return (
    <div className="max-w-[316px] relative rounded-[9999px] shadow-[0px_0px_0px_2px_white] shrink-0 size-[20px]" data-name="User 1">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgUser1} />
      </div>
    </div>
  );
}

function User1() {
  return (
    <div className="absolute left-[-12px] rounded-[9999px] shadow-[0px_0px_0px_2px_white] size-[20px] top-0" data-name="User 2">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgUser2} />
      </div>
    </div>
  );
}

function ImgUser2Margin() {
  return (
    <div className="h-[20px] max-w-[304px] relative shrink-0 w-[8px]" data-name="Img - User 2:margin">
      <User1 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Comfortaa:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] relative shrink-0 text-[10px] text-[rgba(157,68,82,0.5)] w-[178.98px]">
        <p className="leading-[15px]">Ingredients bought, ready to cook!</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative w-full">
        <User />
        <ImgUser2Margin />
        <Container20 />
      </div>
    </div>
  );
}

function Challenge() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Challenge 1">
      <div aria-hidden="true" className="absolute border border-[rgba(244,172,183,0.1)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[17px] relative w-full">
        <Container16 />
        <ProgressBarContainer />
        <Container19 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[14px] w-[105.95px]">
        <p className="leading-[20px]">{`"Sunset Picnic"`}</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] relative shrink-0 text-[12px] text-[rgba(157,68,82,0.4)] w-[24.44px]">
        <p className="leading-[16px]">30%</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <Container22 />
        <Container23 />
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#ffe5d9] h-[10px] relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="absolute bg-[#f4acb7] h-[10px] left-0 right-[70%] rounded-[9999px] top-0" data-name="Background" />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Comfortaa:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[10px] text-[rgba(157,68,82,0.5)] w-full">
          <p className="leading-[15px]">Waiting for a sunny day...</p>
        </div>
      </div>
    </div>
  );
}

function Challenge1() {
  return (
    <div className="bg-white opacity-75 relative rounded-[16px] shrink-0 w-full" data-name="Challenge 2">
      <div aria-hidden="true" className="absolute border border-[rgba(244,172,183,0.1)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[17px] relative w-full">
        <Container21 />
        <Background1 />
        <Container24 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Challenge />
      <Challenge1 />
    </div>
  );
}

function SectionChallengesProgress() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Section - Challenges Progress">
      <Container14 />
      <Container15 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[18px] w-full">
        <p className="leading-[28px]">Interaction Calendar</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[14px] w-[98.77px]">
        <p className="leading-[20px]">October 2023</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative self-stretch shrink-0" data-name="Container">
      <div className="bg-[#ff85a1] rounded-[9999px] shrink-0 size-[8px]" data-name="Background" />
      <div className="flex flex-col font-['Comfortaa:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[10px] w-[36.02px]">
        <p className="leading-[15px]">Perfect</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative self-stretch shrink-0" data-name="Container">
      <div className="bg-[rgba(244,172,183,0.4)] rounded-[9999px] shrink-0 size-[8px]" data-name="Overlay" />
      <div className="flex flex-col font-['Comfortaa:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[10px] w-[31.17px]">
        <p className="leading-[15px]">Active</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex gap-[16px] h-[15px] items-start relative shrink-0" data-name="Container">
      <Container28 />
      <Container29 />
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[8px] relative w-full">
          <Container26 />
          <Container27 />
        </div>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="col-1 content-stretch flex flex-col items-center justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[10px] text-[rgba(157,68,82,0.4)] text-center uppercase w-[19.03px]">
        <p className="leading-[15px]">Mo</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="col-2 content-stretch flex flex-col items-center justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[10px] text-[rgba(157,68,82,0.4)] text-center uppercase w-[15.06px]">
        <p className="leading-[15px]">Tu</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="col-3 content-stretch flex flex-col items-center justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[10px] text-[rgba(157,68,82,0.4)] text-center uppercase w-[16.39px]">
        <p className="leading-[15px]">We</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="col-4 content-stretch flex flex-col items-center justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[10px] text-[rgba(157,68,82,0.4)] text-center uppercase w-[15.33px]">
        <p className="leading-[15px]">Th</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="col-5 content-stretch flex flex-col items-center justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[10px] text-[rgba(157,68,82,0.4)] text-center uppercase w-[12.58px]">
        <p className="leading-[15px]">Fr</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="col-6 content-stretch flex flex-col items-center justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[10px] text-[rgba(157,68,82,0.4)] text-center uppercase w-[13.92px]">
        <p className="leading-[15px]">Sa</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="col-7 content-stretch flex flex-col items-center justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[10px] text-[rgba(157,68,82,0.4)] text-center uppercase w-[15.34px]">
        <p className="leading-[15px]">Su</p>
      </div>
    </div>
  );
}

function CalendarDaysMockup() {
  return (
    <div className="col-1 content-stretch flex flex-col items-center justify-self-stretch opacity-20 py-[8px] relative row-2 self-start shrink-0" data-name="Calendar Days (Mockup)">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[10px] text-center w-[11.7px]">
        <p className="leading-[15px]">28</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="col-2 content-stretch flex flex-col items-center justify-self-stretch opacity-20 py-[8px] relative row-2 self-start shrink-0" data-name="Container">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[10px] text-center w-[11.7px]">
        <p className="leading-[15px]">29</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="col-3 content-stretch flex flex-col items-center justify-self-stretch opacity-20 py-[8px] relative row-2 self-start shrink-0" data-name="Container">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[10px] text-center w-[11.78px]">
        <p className="leading-[15px]">30</p>
      </div>
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="bg-[#ff85a1] col-4 content-stretch flex flex-col items-center justify-self-stretch py-[8px] relative rounded-[8px] row-2 self-start shrink-0" data-name="Background+Shadow">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[10px] text-center text-white w-[3.94px]">
        <p className="leading-[15px]">1</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function BackgroundShadow1() {
  return (
    <div className="bg-[#ff85a1] col-5 content-stretch flex flex-col items-center justify-self-stretch py-[8px] relative rounded-[8px] row-2 self-start shrink-0" data-name="Background+Shadow">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[10px] text-center text-white w-[5.89px]">
        <p className="leading-[15px]">2</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Overlay1() {
  return (
    <div className="bg-[rgba(244,172,183,0.3)] col-6 content-stretch flex flex-col items-center justify-self-stretch py-[8px] relative rounded-[8px] row-2 self-start shrink-0" data-name="Overlay">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[10px] text-center w-[6px]">
        <p className="leading-[15px]">3</p>
      </div>
    </div>
  );
}

function BackgroundShadow2() {
  return (
    <div className="bg-[#ff85a1] col-7 content-stretch flex flex-col items-center justify-self-stretch py-[8px] relative rounded-[8px] row-2 self-start shrink-0" data-name="Background+Shadow">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[10px] text-center text-white w-[6.53px]">
        <p className="leading-[15px]">4</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function BackgroundShadow3() {
  return (
    <div className="bg-[#ff85a1] col-1 content-stretch flex flex-col items-center justify-self-stretch py-[8px] relative rounded-[8px] row-3 self-start shrink-0" data-name="Background+Shadow">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[10px] text-center text-white w-[6.3px]">
        <p className="leading-[15px]">5</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Overlay2() {
  return (
    <div className="bg-[rgba(244,172,183,0.3)] col-2 content-stretch flex flex-col items-center justify-self-stretch py-[8px] relative rounded-[8px] row-3 self-start shrink-0" data-name="Overlay">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[10px] text-center w-[5.81px]">
        <p className="leading-[15px]">6</p>
      </div>
    </div>
  );
}

function BackgroundShadow4() {
  return (
    <div className="bg-[#ff85a1] col-3 content-stretch flex flex-col items-center justify-self-stretch py-[8px] relative rounded-[8px] row-3 self-start shrink-0" data-name="Background+Shadow">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[10px] text-center text-white w-[5.48px]">
        <p className="leading-[15px]">7</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Overlay3() {
  return (
    <div className="bg-[rgba(244,172,183,0.3)] col-4 content-stretch flex flex-col items-center justify-self-stretch py-[8px] relative rounded-[8px] row-3 self-start shrink-0" data-name="Overlay">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[10px] text-center w-[5.81px]">
        <p className="leading-[15px]">8</p>
      </div>
    </div>
  );
}

function BackgroundShadow5() {
  return (
    <div className="bg-[#ff85a1] col-5 content-stretch flex flex-col items-center justify-self-stretch py-[8px] relative rounded-[8px] row-3 self-start shrink-0" data-name="Background+Shadow">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[10px] text-center text-white w-[5.81px]">
        <p className="leading-[15px]">9</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function BackgroundShadow6() {
  return (
    <div className="bg-[#ff85a1] col-6 content-stretch flex flex-col items-center justify-self-stretch py-[8px] relative rounded-[8px] row-3 self-start shrink-0" data-name="Background+Shadow">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[10px] text-center text-white w-[9.72px]">
        <p className="leading-[15px]">10</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function BackgroundShadow7() {
  return (
    <div className="bg-[#ff85a1] col-7 content-stretch flex flex-col items-center justify-self-stretch py-[8px] relative rounded-[8px] row-3 self-start shrink-0" data-name="Background+Shadow">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[10px] text-center text-white w-[7.88px]">
        <p className="leading-[15px]">11</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Overlay4() {
  return (
    <div className="bg-[rgba(244,172,183,0.3)] col-1 content-stretch flex flex-col items-center justify-self-stretch py-[8px] relative rounded-[8px] row-4 self-start shrink-0" data-name="Overlay">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[10px] text-center w-[9.81px]">
        <p className="leading-[15px]">12</p>
      </div>
    </div>
  );
}

function BackgroundShadow8() {
  return (
    <div className="bg-[#ff85a1] col-2 content-stretch flex flex-col items-center justify-self-stretch py-[8px] relative rounded-[8px] row-4 self-start shrink-0" data-name="Background+Shadow">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[10px] text-center text-white w-[9.92px]">
        <p className="leading-[15px]">13</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container39() {
  return (
    <div className="col-4 content-stretch flex flex-col items-center justify-self-stretch py-[8px] relative row-4 self-start shrink-0" data-name="Container">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[10px] text-[rgba(157,68,82,0.4)] text-center w-[10.23px]">
        <p className="leading-[15px]">15</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="col-5 content-stretch flex flex-col items-center justify-self-stretch py-[8px] relative row-4 self-start shrink-0" data-name="Container">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[10px] text-[rgba(157,68,82,0.4)] text-center w-[9.75px]">
        <p className="leading-[15px]">16</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="col-6 content-stretch flex flex-col items-center justify-self-stretch py-[8px] relative row-4 self-start shrink-0" data-name="Container">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[10px] text-[rgba(157,68,82,0.4)] text-center w-[9.41px]">
        <p className="leading-[15px]">17</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="col-7 content-stretch flex flex-col items-center justify-self-stretch py-[8px] relative row-4 self-start shrink-0" data-name="Container">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[10px] text-[rgba(157,68,82,0.4)] text-center w-[9.75px]">
        <p className="leading-[15px]">18</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="col-3 content-stretch flex flex-col items-center justify-self-stretch py-[8px] relative rounded-[8px] row-4 self-start shrink-0" data-name="Container">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[8px] shadow-[0px_0px_0px_2px_#ff85a1]" data-name="Overlay+Shadow" />
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[10px] text-center w-[10.47px]">
        <p className="leading-[15px]">14</p>
      </div>
      <div className="absolute bg-[#ff85a1] right-[-4px] rounded-[9999px] size-[8px] top-[-4px]" data-name="Background+Border">
        <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[9999px]" />
      </div>
    </div>
  );
}

function CalendarGrid() {
  return (
    <div className="relative shrink-0 w-full" data-name="Calendar Grid">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(7,minmax(0,1fr))] grid-rows-[____15px_31px_31px_31px] relative w-full">
        <Container30 />
        <Container31 />
        <Container32 />
        <Container33 />
        <Container34 />
        <Container35 />
        <Container36 />
        <CalendarDaysMockup />
        <Container37 />
        <Container38 />
        <BackgroundShadow />
        <BackgroundShadow1 />
        <Overlay1 />
        <BackgroundShadow2 />
        <BackgroundShadow3 />
        <Overlay2 />
        <BackgroundShadow4 />
        <Overlay3 />
        <BackgroundShadow5 />
        <BackgroundShadow6 />
        <BackgroundShadow7 />
        <Overlay4 />
        <BackgroundShadow8 />
        <Container39 />
        <Container40 />
        <Container41 />
        <Container42 />
        <Container43 />
      </div>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-white relative rounded-[24px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[rgba(244,172,183,0.1)] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[21px] relative w-full">
        <Container25 />
        <CalendarGrid />
      </div>
    </div>
  );
}

function SectionMilestoneCalendar() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Section - Milestone Calendar">
      <Heading3 />
      <BackgroundBorderShadow />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[18px] w-[145.45px]">
        <p className="leading-[28px]">Earned Badges</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] relative shrink-0 text-[#ff85a1] text-[12px] w-[47.58px]">
        <p className="[text-decoration-skip-ink:none] decoration-solid leading-[16px] underline">View All</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading4 />
      <Link />
    </div>
  );
}

function Container46() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[#9d4452] text-[36px] w-[13.16px]">
          <p className="leading-[40px]">🍯</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundShadow9() {
  return (
    <div className="absolute bg-[#facc15] bottom-[-2px] left-[14.63px] rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" data-name="Background+Shadow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[8px] py-[2px] relative">
        <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] relative shrink-0 text-[8px] text-white uppercase w-[34.75px]">
          <p className="leading-[12px]">Level 5</p>
        </div>
      </div>
    </div>
  );
}

function OverlayBorderOverlayBlur() {
  return (
    <div className="backdrop-blur-[4px] bg-[rgba(255,255,255,0.4)] content-stretch flex items-center justify-center p-[2px] relative rounded-[9999px] shrink-0 size-[80px]" data-name="Overlay+Border+OverlayBlur">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="-translate-x-1/2 absolute bg-[rgba(255,255,255,0)] left-1/2 rounded-[9999px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Overlay+Shadow" />
      <Container46 />
      <BackgroundShadow9 />
    </div>
  );
}

function Badge() {
  return (
    <div className="absolute bottom-[16px] content-stretch flex flex-col gap-[8px] items-center left-0 min-w-[100px] pl-[8.27px] pr-[8.28px] top-0" data-name="Badge 1">
      <OverlayBorderOverlayBlur />
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[10px] text-center w-[83.45px]">
        <p className="leading-[15px]">Honey Mooners</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[#9d4452] text-[36px] w-[13.16px]">
          <p className="leading-[40px]">🔥</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundShadow10() {
  return (
    <div className="absolute bg-[#f97316] bottom-[-2px] left-[5.2px] rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" data-name="Background+Shadow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[8px] py-[2px] relative">
        <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] relative shrink-0 text-[8px] text-white uppercase w-[53.58px]">
          <p className="leading-[12px]">Hot Streak</p>
        </div>
      </div>
    </div>
  );
}

function OverlayBorderOverlayBlur1() {
  return (
    <div className="backdrop-blur-[4px] bg-[rgba(255,255,255,0.4)] content-stretch flex items-center justify-center p-[2px] relative rounded-[9999px] shrink-0 size-[80px]" data-name="Overlay+Border+OverlayBlur">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="-translate-x-1/2 absolute bg-[rgba(255,255,255,0)] left-1/2 rounded-[9999px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Overlay+Shadow" />
      <Container47 />
      <BackgroundShadow10 />
    </div>
  );
}

function Badge1() {
  return (
    <div className="absolute bottom-[16px] content-stretch flex flex-col gap-[8px] items-center left-[116px] min-w-[100px] px-[10px] top-0" data-name="Badge 2">
      <OverlayBorderOverlayBlur1 />
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[10px] text-center w-[68.22px]">
        <p className="leading-[15px]">Unstoppable</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[#9d4452] text-[36px] w-[13.16px]">
          <p className="leading-[40px]">📸</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundShadow11() {
  return (
    <div className="absolute bg-[#60a5fa] bottom-[-2px] left-[23.28px] rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" data-name="Background+Shadow">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[8px] py-[2px] relative">
        <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] relative shrink-0 text-[8px] text-white uppercase w-[17.42px]">
          <p className="leading-[12px]">Pro</p>
        </div>
      </div>
    </div>
  );
}

function OverlayBorderOverlayBlur2() {
  return (
    <div className="backdrop-blur-[4px] bg-[rgba(255,255,255,0.4)] content-stretch flex items-center justify-center p-[2px] relative rounded-[9999px] shrink-0 size-[80px]" data-name="Overlay+Border+OverlayBlur">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="-translate-x-1/2 absolute bg-[rgba(255,255,255,0)] left-1/2 rounded-[9999px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[80px] top-0" data-name="Overlay+Shadow" />
      <Container48 />
      <BackgroundShadow11 />
    </div>
  );
}

function Badge2() {
  return (
    <div className="absolute bottom-[16px] content-stretch flex flex-col gap-[8px] items-center left-[232px] min-w-[100px] px-[10px] top-0" data-name="Badge 3">
      <OverlayBorderOverlayBlur2 />
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[10px] text-center w-[78.17px]">
        <p className="leading-[15px]">Memory Maker</p>
      </div>
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="SVG">
          <path d={svgPaths.p2516100} id="Vector" stroke="var(--stroke-0, #9D4452)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function OverlayBorder() {
  return (
    <div className="bg-[rgba(157,68,82,0.1)] content-stretch flex items-center justify-center p-[2px] relative rounded-[9999px] shrink-0 size-[80px]" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(157,68,82,0.05)] border-dashed inset-0 pointer-events-none rounded-[9999px]" />
      <Svg4 />
    </div>
  );
}

function Badge4Locked() {
  return (
    <div className="absolute bottom-[16px] content-stretch flex flex-col gap-[8px] items-center left-[348px] min-w-[100px] opacity-40 px-[10px] top-0" data-name="Badge 4 (Locked)">
      <OverlayBorder />
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#9d4452] text-[10px] text-center w-[37.42px]">
        <p className="leading-[15px]">Locked</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[119px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <Badge />
      <Badge1 />
      <Badge2 />
      <Badge4Locked />
    </div>
  );
}

function SectionBadgesMedals() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Section - Badges & Medals">
      <Container44 />
      <Container45 />
    </div>
  );
}

function Main() {
  return (
    <div className="relative shrink-0 w-full" data-name="Main">
      <div className="content-stretch flex flex-col gap-[32px] items-start px-[20px] relative w-full">
        <SparkHistorySection />
        <SectionChallengesProgress />
        <SectionMilestoneCalendar />
        <SectionBadgesMedals />
      </div>
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.p188dcf00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#ff85a1] content-stretch flex gap-[8px] items-center justify-center py-[16px] relative rounded-[24px] shrink-0 w-full" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[24px] shadow-[0px_20px_25px_-5px_rgba(255,133,161,0.3),0px_8px_10px_-6px_rgba(255,133,161,0.3)]" data-name="Button:shadow" />
      <Svg5 />
      <div className="flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white w-[153.16px]">
        <p className="leading-[24px]">Send a Spark Now</p>
      </div>
    </div>
  );
}

function BottomInteractionMessage() {
  return (
    <div className="absolute bottom-[24px] content-stretch flex flex-col items-start left-[19.5px] w-[351px]" data-name="Bottom Interaction Message">
      <Button />
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-[#ffe5d9] content-stretch flex flex-col gap-[24px] items-start pb-[49px] relative size-full" data-name="互动详情与统计">
      <NavigationHeader />
      <Main />
      <BottomInteractionMessage />
    </div>
  );
}