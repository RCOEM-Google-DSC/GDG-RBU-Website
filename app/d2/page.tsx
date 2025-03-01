"use client"

import { useEffect, useState, useRef } from "react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { ThemeSwitcher } from "@/components/theme-switcher"

const ExpandableCardStack = () => {
  const [expanded, setExpanded] = useState(false)
  const { theme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const cardContainerRef = useRef(null)

  const cards = [
    {
      id: 1,
      title: "Socials",
      image: "/socialcard.png",
    },
    {
      id: 2,
      title: "Management",
      image: "/managmentcard.png",
    },
    {
      id: 3,
      title: "Web",
      image: "/wedcard.png",
    },
    {
      id: 4,
      title: "Design",
      image: "/designcard.png",
    },
    {
      id: 5,
      title: "MAC",
      image: "/MACcard.png",
    },
    {
      id: 6,
      title: "CP",
      image: "/cpcard.png",
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (cardContainerRef.current) {
        const rect = cardContainerRef.current.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0

        if (isVisible && window.scrollY > 100) {
          setScrolled(true)
          setExpanded(true)
        } else if (window.scrollY < 50) {
          setScrolled(false)
          setExpanded(false)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getCardStyle = (index: number) => {
    const image = cards[index].image
    const baseStyle = {
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      width: "180px",
      height: "250px",
      position: "absolute",
      transition: "all 0.7s ease-in-out",
    }

    if (!expanded) {
      // Initial stacked position - moved further down
      const horizontalOffset = index * 15
      return {
        ...baseStyle,
        top: "70%", // Moved from 60% to 70% to position even lower
        left: "50%",
        transform: `translateX(calc(-50% + ${horizontalOffset}px)) translateY(-70%) rotate(${index * 2 - 5}deg)`,
        zIndex: cards.length - index,
      }
    } else {
      // ADJUST EXPANDED CARD POSITION HERE
      // ----------------------------------
      // baseStartX: Controls the starting point from the left (smaller = more left)
      const baseStartX = 11; // CHANGE THIS VALUE to move all cards left/right
      
      // horizontalSpread: Controls how far apart the cards are horizontally
      const horizontalSpread = 15; // CHANGE THIS VALUE to adjust spacing between cards
      
      // Calculate the horizontal position for each card
      const baseX = baseStartX + (index * horizontalSpread)
      
      // verticalStartY: Controls how far from the top the cards start
      const verticalStartY = 35; // CHANGE THIS VALUE to move all cards up/down
      
      // verticalSpread: Controls how far apart the cards are vertically
      const verticalSpread = 15; // CHANGE THIS VALUE to adjust vertical spacing
      
      // Calculate the vertical position for each card
      const baseY = verticalStartY + (index * verticalSpread)
      // ----------------------------------
      
      return {
        ...baseStyle,
        top: `${baseY}%`,
        left: `${baseX}%`, // Remove the extra 10% to move slightly left compared to previous version
        transform: "translate(-50%, -50%) rotate(0deg)",
        zIndex: cards.length - index,
      }
    }
  }

  // Speech bubble component
  const SpeechBubble = ({ text, position, color = "bg-green-400" }) => (
    <div
      className={`absolute ${position} ${color} px-4 py-2 rounded-full text-white font-medium z-50 transition-all duration-500 ease-in-out`}
      style={{
        opacity: expanded ? 1 : 0,
        transform: expanded ? "scale(1)" : "scale(0)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        transitionDelay: "0.3s",
      }}
    >
      {text}
    </div>
  )

  return (
    <div>
      <nav className="fixed flex items-center justify-between mb-8 w-[76rem] z-50">
        <img src="/gdgico.svg" alt="GDG Logo" className="w-16 h-16 mr-32 ml-6" />
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-black hover:text-gray-700">
            Home
          </Link>
          <Link href="/events" className="text-black hover:text-gray-700">
            Events
          </Link>
          <Link href="/team" className="text-black hover:text-gray-700">
            Team
          </Link>
          <Link href="/alumni" className="text-black hover:text-gray-700">
            Alumni
          </Link>
          <Link href="/contact" className="text-black hover:text-gray-700">
            Contact
          </Link>
        </div>
        <div className="w-12 h-6 rounded-full flex justify-between mb-3">
          <ThemeSwitcher />
        </div>
      </nav>

      {/* Reduced top padding from pt-24 to pt-20 */}
      <div className="min-h-screen pt-20 px-4 bg-white dark:bg-gray-900 dark:text-white transition-all duration-500">
        {/* Reduced margin-bottom from mb-8 to mb-4 */}
        <h1
          className={`text-5xl font-bold text-center mt-3 mb-4 transition-opacity duration-500 ${scrolled ? "opacity-0" : "opacity-100"}`}
        >
          Our Domains
        </h1>
        
        <div className="max-w-6xl mx-auto relative">
          {/* Our Domains text in top right when scrolled */}
          <div
            className={`absolute top-28 right-0 text-right transition-all duration-500 ease-in-out ${scrolled ? "opacity-100" : "opacity-0"}`}
          >
            <h2 className="text-4xl font-bold mb-2">Our Domains</h2>
            <p className="text-lg max-w-xs">Be part of the innovation—grow, build, and inspire with GDG!</p>
          </div>

          {/* Added negative margin-top to move cards closer to the heading */}
          <div ref={cardContainerRef} className="relative flex justify-center items-center h-[650px] mx-auto -mt-7">
            <div className="relative w-full h-full">
              {cards.map((card, index) => (
                <div key={card.id} className="absolute rounded-2xl shadow-xl" style={getCardStyle(index)}>
                  
                </div>
              ))}
            </div>
            {/* Bottom left text */}
            <div
              className={`absolute bottom-0 left-0 max-w-md transition-all duration-500 ease-in-out ${scrolled ? "opacity-100" : "opacity-0"}`}
            >
              <p className="text-lg top-6">
                Be part of the innovation—grow, build, and inspire with GDG! Be part of the innovation—grow, build, and
                inspire with GDG!
              </p>
            </div>
          </div>

          {/* Description text moved up closer to heading */}
          <div 
            className={`max-w-3xl mx-auto mb-6 -mt-4 text-center space-y-2 transition-all duration-500 ease-in-out ${
              scrolled || expanded ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <h2 className="text-4xl font-medium">
              Whether you're into <span className="text-red-500">management</span>,{" "}
              <span className="text-green-500">tech</span>, or <span className="text-blue-500">design</span>, GDG has
              something for you!
            </h2>
            <p className="text-3xl text-gray-500 dark:text-gray-400">
              Be part of the innovation—grow, build, and inspire with GDG!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpandableCardStack
