import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]
  );

const sourceFiles = walk(join(process.cwd(), "src")).filter(
  (file) => /\.(tsx|ts)$/.test(file) && !file.includes("test")
);

describe("design tokens", () => {
  it("uses semantic Tailwind classes instead of arbitrary CSS variables", () => {
    const offenders = sourceFiles.filter((file) =>
      /\[var\(--(text|surface|line|background|accent|scrim|success|nav-bg|state-wash)/.test(
        readFileSync(file, "utf8")
      )
    );
    expect(offenders).toEqual([]);
  });

  it("does not hardcode the white overlay hack for hover states", () => {
    const offenders = sourceFiles.filter((file) =>
      /bg-white\/\[0\./.test(readFileSync(file, "utf8"))
    );
    expect(offenders).toEqual([]);
  });
});
