"use client";

import { TeamMemberCard } from "@/components/ui/TeamMemberCard";
import type { Staff } from "@/lib/types";

interface Props {
  staff: Staff[];
}

export function TeamContent({ staff }: Props) {
  return (
    <section className="py-20 bg-light-primary min-h-[60vh]">
      <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 items-start">
          {staff.map((member, i) => (
            <TeamMemberCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
