import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../components/Navbar";

const expectedLinks = [
  ["Home", "#home"],
  ["Serviços", "#services"],
  ["Skills", "#skills"],
  ["Projetos", "#projects"],
  ["Experiência", "#experiences"],
  ["Contato", "#contact"],
] as const;

describe("Navbar", () => {
  it("renders anchor links for every section", () => {
    render(<Navbar />);
    for (const [label, href] of expectedLinks) {
      const links = screen.getAllByRole("link", { name: label });
      expect(links[0]).toHaveAttribute("href", href);
    }
  });

  it("marks the clicked section as current", () => {
    render(<Navbar />);
    const services = screen.getAllByRole("link", { name: "Serviços" })[0];
    fireEvent.click(services);
    expect(services).toHaveAttribute("aria-current", "true");
  });

  it("moves focus to the section on navigation", () => {
    render(
      <div>
        <Navbar />
        <section id="skills" tabIndex={-1}>
          Skills
        </section>
      </div>
    );
    const skills = screen.getAllByRole("link", { name: "Skills" })[0];
    fireEvent.click(skills);
    expect(document.getElementById("skills")).toHaveFocus();
  });
});
