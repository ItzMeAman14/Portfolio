"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Intro } from "@/components/layout/Intro";
import { Hero } from "@/components/sections/Hero";
import { Summary } from "@/components/sections/Summary";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Moments } from "@/components/sections/Moments";
import { Journey } from "@/components/sections/Journey";
import { LatestBlogs } from "@/components/sections/LatestBlogs";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <>
      <Intro
        statusText="Initializing Cybernetic Space"
        onFinished={() => setIntroFinished(true)}
      />
      <Navbar />
      <ScrollProgress />

      <main>
        <Hero introFinished={introFinished} />
        <Summary />
        <Skills />
        <Projects />
        <Moments />
        <Journey />
        <LatestBlogs />
        <Contact />
      </main>
    </>
  );
}
