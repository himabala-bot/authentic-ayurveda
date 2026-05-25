import React from "react";

const avatarColors = [
  { bg: "#7FB9E6", text: "#fff" },  // Sky
  { bg: "#D6BEEA", text: "#fff" },  // Lavender
  { bg: "#F4D77A", text: "#fff" },  // Butter
  { bg: "#B7C96A", text: "#fff" },  // Matcha
  { bg: "#F98BA9", text: "#fff" },  // Pink
  { bg: "#FF8F45", text: "#fff" },  // Tangerine
];

function getInitials(name: string) {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: {
    text: string;
    name: string;
  }[];
  duration?: number;
}) => {
  const dur = props.duration || 10;

  return (
    <div className={props.className} style={{ overflow: "hidden" }}>
      <div
        className="flex flex-col gap-6 pb-6"
        style={{
          animation: `testimonial-scroll ${dur}s linear infinite`,
        }}
      >
        {/* Duplicate for seamless loop */}
        {[0, 1].map((setIndex) => (
          <React.Fragment key={setIndex}>
            {props.testimonials.map(({ text, name }, i) => {
              const colorIdx = (setIndex * props.testimonials.length + i) % avatarColors.length;
              const color = avatarColors[colorIdx];
              return (
                <div
                  className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-border bg-card shadow-card max-w-[300px] sm:max-w-none"
                  key={`${setIndex}-${i}`}
                >
                  <div className="text-muted-foreground leading-relaxed text-sm">
                    {text}
                  </div>
                  <div className="flex items-center gap-3 mt-5">
                    <div
                      className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
                      style={{ backgroundColor: color.bg, color: color.text }}
                    >
                      {getInitials(name)}
                    </div>
                    <div className="font-medium tracking-tight leading-5 text-foreground text-sm sm:text-base">
                      {name}
                    </div>
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
