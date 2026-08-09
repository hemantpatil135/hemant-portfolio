"use client";

import { useState } from "react";
import { MissionHeader } from "./projects/MissionHeader";
import { MissionArchive } from "./projects/MissionArchive";

export function Projects() {
  // Index rather than the project itself: the archive panel is always on screen
  // and needs a selection at rest, so there's no "nothing selected" state.
  const [selected, setSelected] = useState(0);

  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="section-shell">
        <MissionHeader />

        <div className="mt-14">
          <MissionArchive selected={selected} onSelect={setSelected} />
        </div>
      </div>
    </section>
  );
}
