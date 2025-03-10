"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Menu, Github, Linkedin, FileText, Code2 } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

export function NavHeader() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [letterHovered, setLetterHovered] = useState(-1)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)

  const portfolioText = "MR.SHASHI"

  // Add window width tracking
  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Add click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !menuButtonRef.current?.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(1, window.scrollY / (window.innerHeight * 0.1))
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Add scroll handler for mobile view
  useEffect(() => {
    const handleScroll = () => {
      if (windowWidth < 768) { // Check if in mobile view
        setIsNavbarVisible(window.scrollY < 50); // Show navbar if scrolled less than 50px
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [windowWidth]);

  return (
    <div className={cn(
      "fixed left-0 top-0 w-full z-50 flex justify-center pt-2 md:pt-0 transition-all duration-300"
    )}>
      <div
        className="w-full px-4 flex justify-center"
        style={{
          paddingTop: windowWidth >= 768 ? `${8 + scrollProgress * 8}px` : "8px",
          paddingLeft: windowWidth >= 768 ? `${scrollProgress * 16}px` : "16px",
          paddingRight: windowWidth >= 768 ? `${scrollProgress * 16}px` : "16px"
        }}
      >
        <nav
          className={cn(
            "relative w-full rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 md:transition-all md:duration-300 transition-opacity duration-300 ease-in-out transform",
            { 
              "opacity-0 translate-y-[-100%]": !isNavbarVisible && windowWidth < 768, // Hide navbar with transition
              "opacity-100 translate-y-0": isNavbarVisible && windowWidth < 768 // Show navbar
            }
          )}
          style={
            windowWidth >= 768
              ? {
                  width: scrollProgress === 0 ? "100%" : `${100 - scrollProgress * 25}%`,
                  backgroundColor: `rgba(0, 0, 0, ${scrollProgress * 0.4})`,
                  backdropFilter: `blur(${scrollProgress * 16}px)`,
                  borderColor: `rgba(255, 255, 255, ${scrollProgress * 0.1})`
                }
              : {}
          }
        >
          <div className="h-16 flex items-center justify-between px-6">
            <Link
              href="/portfolio"
              className="text-white hover:text-white/80 transition-colors flex items-center gap-2 shrink-0 relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => {
                setIsHovered(false)
                setLetterHovered(-1)
              }}
            >
              <div className="relative">
                <div className="flex items-center">
                  {portfolioText.split('').map((letter, index) => (
                    <span
                      key={index}
                      className={cn(
                        "text-m font-semibold transition-all duration-300 hover:scale-125 cursor-default",
                        letterHovered === index ? "text-primary animate-bounce" : "",
                        isHovered ? "hover:text-primary" : "",
                        isHovered && letterHovered === -1 ? "animate-pulse" : ""
                      )}
                      style={{
                        opacity: Math.max(0, 1 - scrollProgress * 2),
                        textShadow: letterHovered === index ? "0 0 20px rgba(255, 255, 0, 0.5)" : "none",
                        transform: `translateY(${letterHovered === index ? "-2px" : "0"})`,
                      }}
                      onMouseEnter={() => setLetterHovered(index)}
                      onMouseLeave={() => setLetterHovered(-1)}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
                {isHovered && (
                  <div 
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"
                    style={{
                      opacity: Math.max(0, 1 - scrollProgress * 2)
                    }}
                  />
                )}
              </div>
            </Link>

            <div className="flex-1 flex items-center justify-center">
              <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                <Link href="#about" className="text-[#989898] hover:text-white transition-colors text-sm">
                  About
                </Link>
                <Link href="#techstack" className="text-[#989898] hover:text-white transition-colors text-sm">
                  Tech Stack
                </Link>
                <Link href="#projects" className="text-[#989898] hover:text-white transition-colors text-sm">
                  Projects
                </Link>
                <Link href="#contact" className="text-[#989898] hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </div>
            </div>

            {/* Social Links and Resume Button */}
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Link 
                  href="https://instagram.com/shashi.codes" 
                  target="_blank"
                  className="group relative p-2 transition-all duration-300"
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#FFA116] via-[#B3B3B3] to-[#FFA116] rounded-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300 blur" />
                  <div className="relative flex items-center text-[#989898] group-hover:text-[#FFA116] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24"
style={{fill:"#989898"}}>
    <path d="M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z"></path>
</svg>
                  </div>
                </Link>

                <Link 
                  href="https://github.com/skrout8" 
                  target="_blank"
                  className="group relative p-2 transition-all duration-300"
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#6e5494] via-[#B3B3B3] to-[#6e5494] rounded-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300 blur" />
                  <div className="relative flex items-center text-[#989898] group-hover:text-white transition-colors">
                    <Github className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </div>
                </Link>

                <Link 
                  href="https://www.linkedin.com/in/shashikanta-rout81/" 
                  target="_blank"
                  className="group relative p-2 transition-all duration-300"
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#0A66C2] via-[#B3B3B3] to-[#0A66C2] rounded-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300 blur" />
                  <div className="relative flex items-center text-[#989898] group-hover:text-[#0A66C2] transition-colors">
                    <Linkedin className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </div>
                </Link>
              </div>

              <div className="w-px h-6 bg-white/10 mx-2" />

              <Link href="https://doc-10-88-prod-00-apps-viewer.googleusercontent.com/viewer2/prod-00/pdf/7hf04dm5muau2ojsski7mfbs80hfvf8l/f7f0duh59l1iq58eqaueo0tql6sp50ur/1741611075000/3/116731434098133277409/APznzaY9uWUwjJQeG9rvKDI37uM_8RJ9wml4lOxQibhc6Stf4KPswJXYS5ZRS7Bp-8eXNsPf9DeeSA-Qc0op6-bh3v5aIgd5Ydf_FOECijDL1xfR0zU02RZ-N0z7lKT6VPkYjKDMsKjnVK2tVG150jvT80Y7As5KD1K02-INuyYYVmVcc4GzbNCkUEHhGASA5ZYY1JDs265lMwaqhifM118TJLC1vWg7GqtVBPZ7Jt-4QSLj3HDJO7dcC2IF9VmUcVVDl6c8iacemu97M2g1ErVekA3xdjYTyQ4MY5dPWu8zu-Vx1SdRxOITd2ZBaw0svlMpBtRLmP86eiDASBG9TM4tczgHMRJ9xVEA0nD90eY0JnlNqo7h_jLvN2egmtS_lQ3iGDD9ZfDmCnEiCImXezrvDfbh5M9BRs9xW3EJUvkJ2j1N175CRUY_bcOl_DaShBLpTJWbxvlmMVHGw2Go8V7ytUzGwKlOObxKKiDBY8GVGhxhXAf0WRPbyOrG1mhKp8XtLVhdcoSXg--fHB3p4By0PD3vF9KlSL13mDbtJXcwHCNz6j7XoONS3U2ciNcAyIe-dGikpdSM1sjZM2cJPnw-oJZyG0jzTaDxXIBkBX8S2weADpAt2e2_IYNHwundgPM21YJudqCBPDIAYpoqCDhmrRvOUlJRVeywjL7yEd7B6y64xn0gozVVjtnfd9ySXoZI7ynAnD8M7b_6zvHaTmWKuIpPqfHXfaS_i9Sm_sKTFj-UhpG1AYuK39NQ_LjuvwLLjjoHlj779KP1WVOPjxS0eiXrqGmfe8BVrd0iiGaCkW2xrpkYzlFqL5GS0lP5i7BrSapsStCYWL8BnrdJdT30iaPbLTqCtzB5GcHuSKA9dsHwb_IBC47ajLEXW84s6d2Z3igmD3Ux0aRBnwLduyVYCBypJZMOigpKmJObMMIOMTHj4Ug3mf0z6mhBAqEcSGF7MKtsmdJRa-OsxPUaL-szlyBiRjZw4GGvsxIblVwrEF7wgrQBjoB5qkdG8qicl6oAmV-PoVXzjeoSvwIyEwIRHmyBrBua3h1q_gGyPQq-oskVeiKQH3oHADBPyakQ_pZxbKnWkb6luPJ2_0xc6zkzZ87SSzfb_M2An5qHgWpRO4vlYVlsVJqNAv_m_J2vOV6rV6PIQunYBfe9FzXVR_JU3mew2GHaDAqZEBuorufOz9yVUU5jUW2B9Grs9TX5izrCWXVCgwtr6cBDNO-nQLJMaHNl453sTw-Jrl1quqLFbGfbzm3CUG4Y-X4ZLLK1Wy9nHVEJPMRCMDiTazOoBfVGOozqVjeht7XZkdJqFUTV-YkltroxRzPD7374ZYmP5S6F0G7HDBIrCbjU5Tzqn1mMTuStfLzPGb1Kn2H_BSmgw-rrfWiSvb6BaQel6YqwQOpVzAwALoMYkrkY94AyzaYHUHBnjLIWGpeFvb6eth9hBLk_MpStARC-O9VKEPiWbmLRDPc-Ji9ipVgFFy1AOnY6xa_z5eaZm_7bLcRlaYiIJ-YysPgOnb1wsMnN4jTG5yZVJ9k5xwt3yhQBYsxxUDR0PTjlM-mkGjXqF9uwt1Bt12pVCIgFdZX-pVFhMkfuns0cGiITQlV5_WGUSOrxDuL8UjDMdVlvz2e_IMBzaqV5h3QK9i-e3j6b36N8-T0m8JE5o5cIe11BCKjWW-PazvzRC7Pd7ceeresQBEH2FvsvUPqp4y0JN8oXTfUS5TO0Z4SC8qD4QJAIEnzQ9kQ2rjmtsRO2LR802mJEpvjDX2Sp4wercOyulHpyghBlIj-nTAeqc6TjUA74Zf2A20zqqRTl4ZTuD5n9LkBXObEGnF4Yc1Wfc8__p3omvCrEDTuJm5oiKDkwARgJZXwAx9T_PNjt3SNHgyUzeWyB3AEyayGpwnKxnLdneYRIz5rlS6Ja3DcESrT2nbj8WaQqBLtAj-aKX20x6aLYPPkVFYliA8Nqc2qAxU8ZGQdI9FSHWpQz_W40Cz5ypjj20SpX8lciOKW6sE3z9JLibeJaYDnproAex59xxUIt8O27BNYIX0cUytERqDED-LWe?authuser=0&nonce=h190c6u9rpv1u&user=116731434098133277409&hash=nf74mvfirrtnccumcug25499nj0o9mod" target="_blank">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-black transition-all relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-yellow-400 to-primary opacity-0 group-hover:opacity-100 animate-gradient-xy transition-opacity" />
                  <FileText className="w-4 h-4 mr-2 relative z-10" />
                  <span className="relative z-10">Resume</span>
                </Button>
              </Link>
            </div>

            <button
              ref={menuButtonRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "md:hidden p-2 hover:bg-white/5 rounded-lg transition-colors",
                mobileMenuOpen && "bg-white/5"
              )}
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div
              ref={mobileMenuRef}
              className="absolute left-0 right-0 top-14 z-50 md:hidden border-t border-white/10 bg-black/90 backdrop-blur-xl rounded-b-2xl shadow-lg"
            >
              <div className="px-6 py-4 space-y-4">
                <Link
                  href="#about"
                  className="block text-[#989898] hover:text-white transition-colors text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="#projects"
                  className="block text-[#989898] hover:text-white transition-colors text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Projects
                </Link>
                <Link
                  href="#contact"
                  className="block text-[#989898] hover:text-white transition-colors text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4 mb-4">
                    <Link 
                      href="https://instagram.com/shashi.codes" 
                      target="_blank"
                      className="group relative"
                    >
                      <div className="absolute -inset-2 bg-gradient-to-r from-[#FFA116] via-[#B3B3B3] to-[#FFA116] rounded-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300 blur" />
                      <div className="relative flex items-center text-[#989898] group-hover:text-[#FFA116] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24"
style={{fill:"#989898"}}>
    <path d="M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z"></path>
</svg>
                      </div>
                    </Link>
                    <Link 
                      href="https://github.com/skrout8" 
                      target="_blank"
                      className="group relative"
                    >
                      <div className="absolute -inset-2 bg-gradient-to-r from-[#6e5494] via-[#B3B3B3] to-[#6e5494] rounded-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300 blur" />
                      <div className="relative flex items-center text-[#989898] group-hover:text-white transition-colors">
                        <Github className="w-5 h-5 transition-transform group-hover:scale-110" />
                      </div>
                    </Link>
                    <Link 
                      href="https://www.linkedin.com/in/shashikanta-rout81/" 
                      target="_blank"
                      className="group relative"
                    >
                      <div className="absolute -inset-2 bg-gradient-to-r from-[#0A66C2] via-[#B3B3B3] to-[#0A66C2] rounded-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300 blur" />
                      <div className="relative flex items-center text-[#989898] group-hover:text-[#0A66C2] transition-colors">
                        <Linkedin className="w-5 h-5 transition-transform group-hover:scale-110" />
                      </div>
                    </Link>
                  </div>
                  <Link href="https://doc-10-88-prod-00-apps-viewer.googleusercontent.com/viewer2/prod-00/pdf/7hf04dm5muau2ojsski7mfbs80hfvf8l/f7f0duh59l1iq58eqaueo0tql6sp50ur/1741611075000/3/116731434098133277409/APznzaY9uWUwjJQeG9rvKDI37uM_8RJ9wml4lOxQibhc6Stf4KPswJXYS5ZRS7Bp-8eXNsPf9DeeSA-Qc0op6-bh3v5aIgd5Ydf_FOECijDL1xfR0zU02RZ-N0z7lKT6VPkYjKDMsKjnVK2tVG150jvT80Y7As5KD1K02-INuyYYVmVcc4GzbNCkUEHhGASA5ZYY1JDs265lMwaqhifM118TJLC1vWg7GqtVBPZ7Jt-4QSLj3HDJO7dcC2IF9VmUcVVDl6c8iacemu97M2g1ErVekA3xdjYTyQ4MY5dPWu8zu-Vx1SdRxOITd2ZBaw0svlMpBtRLmP86eiDASBG9TM4tczgHMRJ9xVEA0nD90eY0JnlNqo7h_jLvN2egmtS_lQ3iGDD9ZfDmCnEiCImXezrvDfbh5M9BRs9xW3EJUvkJ2j1N175CRUY_bcOl_DaShBLpTJWbxvlmMVHGw2Go8V7ytUzGwKlOObxKKiDBY8GVGhxhXAf0WRPbyOrG1mhKp8XtLVhdcoSXg--fHB3p4By0PD3vF9KlSL13mDbtJXcwHCNz6j7XoONS3U2ciNcAyIe-dGikpdSM1sjZM2cJPnw-oJZyG0jzTaDxXIBkBX8S2weADpAt2e2_IYNHwundgPM21YJudqCBPDIAYpoqCDhmrRvOUlJRVeywjL7yEd7B6y64xn0gozVVjtnfd9ySXoZI7ynAnD8M7b_6zvHaTmWKuIpPqfHXfaS_i9Sm_sKTFj-UhpG1AYuK39NQ_LjuvwLLjjoHlj779KP1WVOPjxS0eiXrqGmfe8BVrd0iiGaCkW2xrpkYzlFqL5GS0lP5i7BrSapsStCYWL8BnrdJdT30iaPbLTqCtzB5GcHuSKA9dsHwb_IBC47ajLEXW84s6d2Z3igmD3Ux0aRBnwLduyVYCBypJZMOigpKmJObMMIOMTHj4Ug3mf0z6mhBAqEcSGF7MKtsmdJRa-OsxPUaL-szlyBiRjZw4GGvsxIblVwrEF7wgrQBjoB5qkdG8qicl6oAmV-PoVXzjeoSvwIyEwIRHmyBrBua3h1q_gGyPQq-oskVeiKQH3oHADBPyakQ_pZxbKnWkb6luPJ2_0xc6zkzZ87SSzfb_M2An5qHgWpRO4vlYVlsVJqNAv_m_J2vOV6rV6PIQunYBfe9FzXVR_JU3mew2GHaDAqZEBuorufOz9yVUU5jUW2B9Grs9TX5izrCWXVCgwtr6cBDNO-nQLJMaHNl453sTw-Jrl1quqLFbGfbzm3CUG4Y-X4ZLLK1Wy9nHVEJPMRCMDiTazOoBfVGOozqVjeht7XZkdJqFUTV-YkltroxRzPD7374ZYmP5S6F0G7HDBIrCbjU5Tzqn1mMTuStfLzPGb1Kn2H_BSmgw-rrfWiSvb6BaQel6YqwQOpVzAwALoMYkrkY94AyzaYHUHBnjLIWGpeFvb6eth9hBLk_MpStARC-O9VKEPiWbmLRDPc-Ji9ipVgFFy1AOnY6xa_z5eaZm_7bLcRlaYiIJ-YysPgOnb1wsMnN4jTG5yZVJ9k5xwt3yhQBYsxxUDR0PTjlM-mkGjXqF9uwt1Bt12pVCIgFdZX-pVFhMkfuns0cGiITQlV5_WGUSOrxDuL8UjDMdVlvz2e_IMBzaqV5h3QK9i-e3j6b36N8-T0m8JE5o5cIe11BCKjWW-PazvzRC7Pd7ceeresQBEH2FvsvUPqp4y0JN8oXTfUS5TO0Z4SC8qD4QJAIEnzQ9kQ2rjmtsRO2LR802mJEpvjDX2Sp4wercOyulHpyghBlIj-nTAeqc6TjUA74Zf2A20zqqRTl4ZTuD5n9LkBXObEGnF4Yc1Wfc8__p3omvCrEDTuJm5oiKDkwARgJZXwAx9T_PNjt3SNHgyUzeWyB3AEyayGpwnKxnLdneYRIz5rlS6Ja3DcESrT2nbj8WaQqBLtAj-aKX20x6aLYPPkVFYliA8Nqc2qAxU8ZGQdI9FSHWpQz_W40Cz5ypjj20SpX8lciOKW6sE3z9JLibeJaYDnproAex59xxUIt8O27BNYIX0cUytERqDED-LWe?authuser=0&nonce=h190c6u9rpv1u&user=116731434098133277409&hash=nf74mvfirrtnccumcug25499nj0o9mod" target="_blank" className="block">
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-black transition-all relative group overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary via-yellow-400 to-primary opacity-0 group-hover:opacity-100 animate-gradient-xy transition-opacity" />
                      <FileText className="w-4 h-4 mr-2 relative z-10" />
                      <span className="relative z-10">Resume</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  )
} 