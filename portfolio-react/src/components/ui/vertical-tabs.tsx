"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ExternalLink, FileText } from "lucide-react";

const EXPERIENCES = [
  {
    id: "01",
    title: "Full Stack Web Developer Trainee",
    company: "SPCL Infotech Services Pvt. Ltd.",
    period: "FEB 2026 — MAY 2026",
    type: "Full-time",
    description: "Delivering full-stack web development projects as part of a structured training programme. Completed 6 end-to-end assignments covering UI/UX design, responsive layouts, form validation, data visualization, and deployment — all tracked via GitHub with proper version control.",
    projects: [
      { name: "Personal Portfolio Website", description: "Responsive, animated portfolio with interactive elements & contact form.", links: [{ label: "Certificate", href: "/SPCL/Portfolio.pdf" }] },
      { name: "Hotel Booking Form", description: "Dynamic form with date validation, room-type selection & responsive design.", links: [{ label: "Certificate", href: "/SPCL/Hotel Booking Form.pdf" }] },
      { name: "Movie Listing & Rating UI", description: "Grid-based movie browser with star-rating system & interactive hover details.", links: [{ label: "Certificate", href: "/SPCL/Movie Listing and Rating Website UI.pdf" }] },
      { name: "Online Store Homepage", description: "Categorized product cards with filter & sort functionality for a modern e-commerce UI.", links: [{ label: "Certificate", href: "/SPCL/Online Store Homepage with Product Categories.pdf" }] },
      { name: "Personal Finance Tracker", description: "Dashboard web app with expense management, budget tracking, chart visualizations & LocalStorage persistence.", links: [{ label: "Certificate", href: "/SPCL/Personal_Finance_Tracker_Task.pdf" }] },
      { name: "Travel Agency Website", description: "5-page responsive website with destination listings, package pricing, image gallery & validated contact form.", links: [{ label: "Certificate", href: "/SPCL/travel_agency_assignment (1).pdf" }] },
    ],
    certificates: [
      { name: "Portfolio Website", url: "/SPCL/Portfolio.pdf" },
      { name: "Hotel Booking Form", url: "/SPCL/Hotel Booking Form.pdf" },
      { name: "Movie Listing & Rating UI", url: "/SPCL/Movie Listing and Rating Website UI.pdf" },
      { name: "Online Store Homepage", url: "/SPCL/Online Store Homepage with Product Categories.pdf" },
      { name: "Personal Finance Tracker", url: "/SPCL/Personal_Finance_Tracker_Task.pdf" },
      { name: "Travel Agency Website", url: "/SPCL/travel_agency_assignment (1).pdf" },
    ],
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200",
  },
  {
    id: "02",
    title: "Frontend Developer Intern",
    company: "Search Point",
    period: "FEB 2026 — MAR 2026",
    type: "Internship",
    description: "Built responsive UIs, improved user experience, and integrated APIs into the platform during a verified 38-day internship. Delivered 3 feature-complete UI modules, reducing time-to-ship on key product pages. Issued a Verified Achievement Record on completion.",
    projects: [],
    certificates: [
      { name: "Verified Achievement Record", url: "" },
    ],
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1200",
  },
  {
    id: "03",
    title: "Full-Stack Engineer",
    company: "Freelance & Open Source",
    period: "2024 — PRESENT",
    type: "Freelance",
    description: "Built and shipped full-stack web platforms, developer tools, and privacy-first desktop applications using React, Node.js, Spring Boot, PostgreSQL, Electron, and browser-extension APIs.",
    projects: [
      { 
        name: "TimeStream v1.2.0", 
        description: "Fully local developer-activity tracker (Electron + SQLite) with Chrome/Firefox extension and AI-assisted filtering.", 
        links: [
          { label: "Live Demo", href: "https://timestream.netlify.app/" },
          { label: "GitHub", href: "https://github.com/devanshupatil/TimeStream" },
        ]
      },
      { 
        name: "Online Learning Platform", 
        description: "Role-based dashboards, JWT auth, course management, attendance tracking, LLM-powered question extraction.", 
        links: [
          { label: "Live", href: "https://online-learning-portal-ten.vercel.app/" },
          { label: "GitHub", href: "https://github.com/devanshupatil/Online-Learning-Portal" },
        ]
      },
      { 
        name: "SagarShop E-commerce", 
        description: "Full platform with admin panel, product/order management, REST APIs, Supabase.", 
        links: [
          { label: "Live", href: "https://sagar-shop.netlify.app/" },
          { label: "GitHub", href: "https://github.com/devanshupatil/Sagar-Shop" },
        ]
      },
      { 
        name: "Marriage Biodata Builder", 
        description: "Dynamic forms, live preview, one-click PDF generation (jsPDF).", 
        links: [
          { label: "Live", href: "https://marriage-biodata-builder.vercel.app/" },
          { label: "GitHub", href: "https://github.com/devanshupatil/marriage-biodata-builder" },
        ]
      },
    ],
    certificates: [],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200",
  },
  {
    id: "04",
    title: "Hacktoberfest Contributor",
    company: "Open Source",
    period: "2023",
    type: "Open Source",
    description: "Contributed to multiple open-source projects during Hacktoberfest 2023 — a global celebration of open-source development.",
    projects: [],
    certificates: [],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200",
  },
];

const AUTO_PLAY_DURATION = 5000;

export function VerticalTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % EXPERIENCES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + EXPERIENCES.length) % EXPERIENCES.length);
  }, []);

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setIsPaused(false);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, AUTO_PLAY_DURATION);

    return () => clearInterval(interval);
  }, [activeIndex, isPaused, handleNext]);

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const activeExperience = EXPERIENCES[activeIndex];

  return (
    <section className="w-full bg-background py-8 md:py-16 lg:py-24">
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-20 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Experience Cards */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 pt-4">
            <div className="space-y-1 mb-12">
              <h2 className="tracking-tighter text-balance text-3xl font-medium md:text-4xl lg:text-5xl text-foreground">
                Professional Journey
              </h2>
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.3em] block ml-0.5">
                (EXPERIENCE)
              </span>
            </div>

            <div className="flex flex-col space-y-0">
              {EXPERIENCES.map((exp, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={exp.id}
                    onClick={() => handleTabClick(index)}
                    className={cn(
                      "group relative flex items-start gap-4 py-6 md:py-8 text-left transition-all duration-500 border-t border-border/50 first:border-0",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground/60 hover:text-foreground"
                    )}
                  >
                    <div className="absolute left-[-16px] md:left-[-24px] top-0 bottom-0 w-[2px] bg-muted">
                      {isActive && (
                        <motion.div
                          key={`progress-${index}-${isPaused}`}
                          className="absolute top-0 left-0 w-full bg-foreground origin-top"
                          initial={{ height: "0%" }}
                          animate={
                            isPaused ? { height: "0%" } : { height: "100%" }
                          }
                          transition={{
                            duration: AUTO_PLAY_DURATION / 1000,
                            ease: "linear",
                          }}
                        />
                      )}
                    </div>

                    <span className="text-[9px] md:text-[10px] font-medium mt-1 tabular-nums opacity-50">
                      /{exp.id}
                    </span>

                    <div className="flex flex-col gap-2 flex-1">
                      <div className="flex flex-col gap-1">
                        <span
                          className={cn(
                            "text-2xl md:text-3xl lg:text-4xl font-normal tracking-tight transition-colors duration-500",
                            isActive ? "text-foreground" : ""
                          )}
                        >
                          {exp.title}
                        </span>
                        <span className="text-sm md:text-base font-medium text-muted-foreground">
                          {exp.company}
                        </span>
                        <div className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground/70">
                          <span className="font-mono">{exp.period}</span>
                          <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-medium uppercase tracking-wide">
                            {exp.type}
                          </span>
                        </div>
                      </div>

                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.23, 1, 0.32, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <p className="text-muted-foreground text-sm md:text-base font-normal leading-relaxed max-w-sm pb-4">
                              {exp.description}
                            </p>

                            {exp.projects.length > 0 && (
                              <div className="space-y-3 pt-2 border-t border-border/30">
                                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                  Key Projects
                                </h4>
                                <ul className="space-y-2">
                                  {exp.projects.map((project, pIndex) => (
                                    <li key={pIndex} className="flex flex-col gap-1">
                                      <span className="text-sm font-medium text-foreground">
                                        {project.name}
                                      </span>
                                      <p className="text-xs text-muted-foreground/80">{project.description}</p>
                                      <div className="flex flex-wrap gap-2">
                                        {project.links.map((link, lIndex) => (
                                          <a
                                            key={lIndex}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground hover:text-indigo-500 transition-colors px-2 py-1 rounded bg-muted/50 border border-border/30"
                                          >
                                            {link.label === "GitHub" && <ExternalLink size={10} />}
                                            {link.label === "Live Demo" || link.label === "Live" ? <ExternalLink size={10} /> : <FileText size={10} />}
                                            {link.label}
                                          </a>
                                        ))}
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {exp.certificates.length > 0 && (
                              <div className="space-y-3 pt-2 border-t border-border/30">
                                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                  Certificates
                                </h4>
                                <ul className="space-y-2">
                                  {exp.certificates.map((cert, cIndex) => (
                                    <li key={cIndex}>
                                      <a
                                        href={cert.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground hover:text-indigo-500 transition-colors px-2 py-1 rounded bg-muted/50 border border-border/30"
                                      >
                                        <FileText size={10} />
                                        {cert.name}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Image Gallery */}
          <div className="lg:col-span-7 flex flex-col justify-end h-full order-1 lg:order-2">
            <div
              className="relative group/gallery"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="relative aspect-4/5 md:aspect-4/3 lg:aspect-16/11 rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-muted/30 border border-border/40">
                <AnimatePresence
                  initial={false}
                  custom={direction}
                  mode="popLayout"
                >
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      y: { type: "spring", stiffness: 260, damping: 32 },
                      opacity: { duration: 0.4 },
                    }}
                    className="absolute inset-0 w-full h-full cursor-pointer"
                    onClick={handleNext}
                  >
                    <img
                      src={activeExperience.image}
                      alt={activeExperience.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 m-0! p-0! block"
                    />

                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex gap-2 md:gap-3 z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-foreground hover:bg-background transition-all active:scale-90"
                    aria-label="Previous"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-foreground hover:bg-background transition-all active:scale-90"
                    aria-label="Next"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VerticalTabs;