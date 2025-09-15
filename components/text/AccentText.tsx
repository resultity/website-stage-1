// components/text/AccentText.tsx
import React from "react";

type Props = {
  text: string;
  className?: string;
  accentClassName?: string;
  as?: "p" | "div" | "span";
  inverted?: boolean; 
};

export default function AccentText({
  text,
  className = "content is-medium is-size-6-touch is-size-4-desktop has-text-dark",
  accentClassName = "has-text-black-ter has-text-weight-bold is-size-5-touch is-size-3-desktop",
  as = "p",
  inverted = false,
}: Props) {
  const containerClasses = inverted
    ? "content is-medium is-size-6-touch is-size-4-desktop has-text-light"
    : className;

  const accentClasses = inverted
    ? "has-text-white has-text-weight-bold is-size-5-touch is-size-3-desktop"
    : accentClassName;

  const nodes = React.useMemo(() => parseAccent(text, accentClasses), [text, accentClasses]);

  if (as === "div") return <div className={containerClasses}>{nodes}</div>;
  if (as === "span") return <span className={containerClasses}>{nodes}</span>;
  return <p className={containerClasses}>{nodes}</p>;
}

// Parses *...* and \n
function parseAccent(input: string, accentClass: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let start = 0;
  let i = 0;
  let open = false;

  while (i < input.length) {
    const ch = input[i];

    // Escaped asterisk "\*"
    if (ch === "\\" && i + 1 < input.length && input[i + 1] === "*") {
      if (start < i) out.push(input.slice(start, i));
      out.push("*");
      i += 2;
      start = i;
      continue;
    }

    // Newline "\n"
    if (ch === "\n") {
      if (start < i) out.push(input.slice(start, i));
      out.push(<br key={`br-${out.length}`} />);
      i += 1;
      start = i;
      continue;
    }

    // Accent toggle "*"
    if (ch === "*") {
      if (!open) {
        if (start < i) out.push(input.slice(start, i));
        open = true;
        i += 1;
        start = i;
        continue;
      } else {
        const content = input.slice(start, i);
        out.push(
          <span className={accentClass} key={`acc-${out.length}`}>
            {content}
          </span>
        );
        open = false;
        i += 1;
        start = i;
        continue;
      }
    }

    i += 1;
  }

  if (start < input.length) out.push(input.slice(start));

  if (open) {
    const lastIdx = out.length - 1;
    if (lastIdx >= 0 && typeof out[lastIdx] === "string") {
      out[lastIdx] = "*" + (out[lastIdx] as string);
    } else {
      out.push("*");
    }
  }

  return out;
}
