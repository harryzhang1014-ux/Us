import svgPaths from "./svg-jexaniiuxl";
import imgYourAvatar from "figma:asset/4acb384833c3562a7e051af0bcdb6b5d7bb220e1.png";
import imgPartnerAvatar from "figma:asset/db96c06d56d28ce2fa51eeb9605f44661eb22247.png";

function Container() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nimbus_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#fb7185] text-[14px] text-center tracking-[1.4px] uppercase w-[120.19px]">
        <p className="leading-[20px]">Current Vibe</p>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Nimbus_Sans:Bold',sans-serif] h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#1f2937] text-[30px] text-center w-[208.39px]">
        <p className="leading-[36px]">Missing you ❤️</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nimbus_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[12px] text-center w-[106.97px]">
        <p className="leading-[16px]">Updated 5 mins ago</p>
      </div>
    </div>
  );
}

function SectionCurrentStatusDisplay() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Section - Current Status Display">
      <Container />
      <Heading />
      <Container1 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 2">
      <div className="content-stretch flex flex-col items-start px-[4px] relative w-full">
        <div className="flex flex-col font-['Nimbus_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#374151] text-[18px] w-full">
          <p className="leading-[28px]">How are you feeling?</p>
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nimbus_Sans:Regular',sans-serif] h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#1f2937] text-[30px] text-center w-[8.34px]">
        <p className="leading-[36px]">🥺</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[8px] relative">
        <Container3 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <div className="flex flex-col font-['Nimbus_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[14px] text-center w-[73.64px]">
          <p className="leading-[20px]">Missing you</p>
        </div>
      </div>
    </div>
  );
}

function ButtonMissingYouOption() {
  return (
    <div className="bg-white col-1 content-stretch flex flex-col items-center justify-center justify-self-start pl-[44.67px] pr-[44.69px] py-[26px] relative rounded-[24px] row-1 self-start shrink-0" data-name="Button - Missing You Option">
      <div aria-hidden="true" className="absolute border-2 border-[#fecdd3] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Margin />
      <Container4 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nimbus_Sans:Regular',sans-serif] h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#1f2937] text-[30px] text-center w-[8.34px]">
        <p className="leading-[36px]">💻</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[8px] relative">
        <Container5 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <div className="flex flex-col font-['Nimbus_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[14px] text-center w-[85.89px]">
          <p className="leading-[20px]">Busy Working</p>
        </div>
      </div>
    </div>
  );
}

function ButtonBusyOption() {
  return (
    <div className="bg-white col-2 content-stretch flex flex-col items-center justify-center justify-self-start pl-[38.55px] pr-[38.56px] py-[26px] relative rounded-[24px] row-1 self-start shrink-0" data-name="Button - Busy Option">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Margin1 />
      <Container6 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nimbus_Sans:Regular',sans-serif] h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#1f2937] text-[30px] text-center w-[8.34px]">
        <p className="leading-[36px]">💭</p>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[8px] relative">
        <Container7 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <div className="flex flex-col font-['Nimbus_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[14px] text-center w-[87.17px]">
          <p className="leading-[20px]">Thinking of us</p>
        </div>
      </div>
    </div>
  );
}

function ButtonThinkingOfUsOption() {
  return (
    <div className="bg-white col-1 content-stretch flex flex-col items-center justify-center justify-self-start pl-[37.91px] pr-[37.92px] py-[26px] relative rounded-[24px] row-2 self-start shrink-0" data-name="Button - Thinking of Us Option">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Margin2 />
      <Container8 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['FreeSerif:Regular',sans-serif] h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[#1f2937] text-[30px] text-center w-[24.7px]">
        <p className="leading-[36px]">✨</p>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[8px] relative">
        <Container9 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <div className="flex flex-col font-['Nimbus_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[14px] text-center w-[81.36px]">
          <p className="leading-[20px]">Super Happy</p>
        </div>
      </div>
    </div>
  );
}

function ButtonHappyOption() {
  return (
    <div className="bg-white col-2 content-stretch flex flex-col items-center justify-center justify-self-start pl-[40.81px] pr-[40.83px] py-[26px] relative rounded-[24px] row-2 self-start shrink-0" data-name="Button - Happy Option">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Margin3 />
      <Container10 />
    </div>
  );
}

function Container2() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[__116px_116px] relative shrink-0 w-full" data-name="Container">
      <ButtonMissingYouOption />
      <ButtonBusyOption />
      <ButtonThinkingOfUsOption />
      <ButtonHappyOption />
    </div>
  );
}

function MoodSwitcherSection() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Mood Switcher Section">
      <Heading1 />
      <Container2 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Nimbus_Sans:Bold',sans-serif] h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#312e81] text-[18px] w-[196.03px]">
        <p className="leading-[28px]">Conflict Hint (吵架暗示)</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nimbus_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#818cf8] text-[12px] w-[162.83px]">
        <p className="leading-[16px]">Signal a disagreement subtly...</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[196.03px]" data-name="Container">
      <Heading2 />
      <Container13 />
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.p31add918} id="Vector" stroke="var(--stroke-0, #6366F1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#e0e7ff] content-stretch flex flex-col items-start p-[8px] relative rounded-[9999px] shrink-0" data-name="Background">
      <Svg />
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative w-full">
        <Container12 />
        <Background />
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="opacity-60 relative shrink-0 size-[48px]" data-name="Background">
      <div aria-hidden="true" className="absolute bg-clip-padding bg-white border-0 border-[transparent] border-solid inset-0 mix-blend-saturation pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <div className="flex flex-col font-['Nimbus_Sans:Regular',sans-serif] h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[#1f2937] text-[24px] text-center w-[6.69px]">
          <p className="leading-[32px]">🔥</p>
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nimbus_Sans:Regular',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#4338ca] text-[10px] text-center w-[50px]">
        <p className="leading-[15px]">Cooling Off</p>
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative">
        <Container14 />
      </div>
    </div>
  );
}

function ButtonCoolingFlameHint() {
  return (
    <div className="bg-[rgba(255,255,255,0.6)] col-1 content-stretch flex flex-col items-center justify-self-start pl-[19.66px] pr-[19.67px] py-[13px] relative rounded-[16px] row-1 self-start shrink-0" data-name="Button - Cooling Flame Hint">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Background1 />
      <Margin4 />
    </div>
  );
}

function Container15() {
  return (
    <div className="opacity-60 relative shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <div className="flex flex-col font-['Nimbus_Sans:Regular',sans-serif] h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[#1f2937] text-[24px] text-center w-[6.69px]">
          <p className="leading-[32px]">🥀</p>
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nimbus_Sans:Regular',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#4338ca] text-[10px] text-center w-[54.45px]">
        <p className="leading-[15px]">Feeling Hurt</p>
      </div>
    </div>
  );
}

function Margin5() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative">
        <Container16 />
      </div>
    </div>
  );
}

function ButtonWiltingFlowerHint() {
  return (
    <div className="bg-[rgba(255,255,255,0.6)] col-2 content-stretch flex flex-col items-center justify-self-start px-[17.44px] py-[13px] relative rounded-[16px] row-1 self-start shrink-0" data-name="Button - Wilting Flower Hint">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container15 />
      <Margin5 />
    </div>
  );
}

function Container17() {
  return (
    <div className="opacity-60 relative shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <div className="flex flex-col font-['Nimbus_Sans:Regular',sans-serif] h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[#1f2937] text-[24px] text-center w-[6.69px]">
          <p className="leading-[32px]">🌧️</p>
        </div>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nimbus_Sans:Regular',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#4338ca] text-[10px] text-center w-[45.92px]">
        <p className="leading-[15px]">Low Mood</p>
      </div>
    </div>
  );
}

function Margin6() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative">
        <Container18 />
      </div>
    </div>
  );
}

function ButtonRainCloudHint() {
  return (
    <div className="bg-[rgba(255,255,255,0.6)] col-3 content-stretch flex flex-col items-center justify-self-start px-[20.67px] py-[13px] relative rounded-[16px] row-1 self-start shrink-0" data-name="Button - Rain Cloud Hint">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container17 />
      <Margin6 />
    </div>
  );
}

function SubtleVisualCues() {
  return (
    <div className="relative shrink-0 w-full" data-name="Subtle Visual Cues">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[12px] gap-y-[12px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[_97px] relative w-full">
        <ButtonCoolingFlameHint />
        <ButtonWiltingFlowerHint />
        <ButtonRainCloudHint />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Nimbus_Sans:Regular_Italic',sans-serif] h-[33px] justify-center leading-[16.5px] not-italic relative shrink-0 text-[#6366f1] text-[11px] text-center w-[265.96px]">
        <p className="mb-0">{`"This will change your status bar color to a soft blue for`}</p>
        <p>{`your partner to see."`}</p>
      </div>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(219,234,254,0.3)] relative rounded-[12px] shrink-0 w-full" data-name="Overlay">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[12px] pt-[11.25px] px-[12px] relative w-full">
        <Container19 />
      </div>
    </div>
  );
}

function ConflictHintSection() {
  return (
    <div className="bg-[rgba(238,242,255,0.5)] relative rounded-[32px] shrink-0 w-full" data-name="Conflict Hint Section">
      <div aria-hidden="true" className="absolute border border-[#e0e7ff] border-solid inset-0 pointer-events-none rounded-[32px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative w-full">
        <Container11 />
        <SubtleVisualCues />
        <Overlay />
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] items-start left-0 p-[24px] right-0 top-[73px]" data-name="Main">
      <SectionCurrentStatusDisplay />
      <MoodSwitcherSection />
      <ConflictHintSection />
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p37770e00} fill="var(--fill-0, #FB7185)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nimbus_Sans:Bold',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#fb7185] text-[10px] text-center w-[30.56px]">
        <p className="leading-[15px]">Status</p>
      </div>
    </div>
  );
}

function Margin7() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <Container20 />
    </div>
  );
}

function Button() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <Svg1 />
        <Margin7 />
      </div>
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.pd0cef00} id="Vector" stroke="var(--stroke-0, #D1D5DB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nimbus_Sans:Regular',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[10px] text-center w-[21.02px]">
        <p className="leading-[15px]">Chat</p>
      </div>
    </div>
  );
}

function Margin8() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <Container21 />
    </div>
  );
}

function Button1() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <Svg2 />
        <Margin8 />
      </div>
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p12978b80} id="Vector" stroke="var(--stroke-0, #D1D5DB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nimbus_Sans:Regular',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[10px] text-center w-[19.81px]">
        <p className="leading-[15px]">Plan</p>
      </div>
    </div>
  );
}

function Margin9() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <Container22 />
    </div>
  );
}

function Button2() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <Svg3 />
        <Margin9 />
      </div>
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.pdd9b840} id="Vector" stroke="var(--stroke-0, #D1D5DB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Nimbus_Sans:Regular',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#9ca3af] text-[10px] text-center w-[36.13px]">
        <p className="leading-[15px]">Settings</p>
      </div>
    </div>
  );
}

function Margin10() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0" data-name="Margin">
      <Container23 />
    </div>
  );
}

function Button3() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <Svg4 />
        <Margin10 />
      </div>
    </div>
  );
}

function BottomNavigationTabBar() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-between left-0 pb-[32px] pl-[40px] pr-[40.03px] pt-[13px] right-0 top-[845px]" data-name="Bottom Navigation Tab Bar">
      <div aria-hidden="true" className="absolute border-[#ffe4e6] border-solid border-t inset-0 pointer-events-none" />
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function YourAvatar() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Your Avatar">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgYourAvatar} />
      </div>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-[#fecdd3] relative rounded-[9999px] shrink-0 size-[40px]" data-name="Background+Border+Shadow">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <YourAvatar />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Margin11() {
  return (
    <div className="content-stretch flex flex-col h-[12px] items-start pl-[12px] relative shrink-0 w-[44px]" data-name="Margin">
      <div className="bg-[#fda4af] h-[12px] rounded-[9999px] shrink-0 w-[32px]" data-name="Background" />
    </div>
  );
}

function PartnerAvatar() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Partner Avatar">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgPartnerAvatar} />
      </div>
    </div>
  );
}

function BackgroundBorderShadow1() {
  return (
    <div className="bg-[#bfdbfe] relative rounded-[9999px] shrink-0 size-[40px]" data-name="Background+Border+Shadow">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <PartnerAvatar />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Margin12() {
  return (
    <div className="content-stretch flex flex-col h-[40px] items-start pl-[12px] relative shrink-0 w-[52px]" data-name="Margin">
      <BackgroundBorderShadow1 />
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative">
        <BackgroundBorderShadow />
        <Margin11 />
        <Margin12 />
      </div>
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p16aba100} id="Vector" stroke="var(--stroke-0, #FB7185)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative">
        <Svg5 />
      </div>
    </div>
  );
}

function HeaderPersistentTopStatusBar() {
  return (
    <div className="absolute backdrop-blur-[6px] bg-[rgba(255,255,255,0.8)] content-stretch flex items-center justify-between left-0 pb-[17px] pt-[16px] px-[24px] right-0 top-0" data-name="Header - Persistent Top Status Bar">
      <div aria-hidden="true" className="absolute border-[#ffe4e6] border-b border-solid inset-0 pointer-events-none" />
      <Container24 />
      <Container25 />
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-[#fff1f2] relative size-full" data-name="状态与吵架暗示">
      <Main />
      <BottomNavigationTabBar />
      <HeaderPersistentTopStatusBar />
    </div>
  );
}