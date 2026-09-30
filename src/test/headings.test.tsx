import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";

describe("heading hierarchy", () => {
  it("renders exactly one h1 — the hero", async () => {
    render(<App />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { level: 1, name: "Olá, eu sou Samuel" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 2, name: "Serviços" })
      ).toBeInTheDocument();
    }, { timeout: 5000 });
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent("Olá, eu sou Samuel");
  });

  it("marks every section title as h2", async () => {
    render(<App />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { level: 2, name: "Serviços" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 2, name: "Skills" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 2, name: "Projetos" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 2, name: "Experiência" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 2, name: "Contato" })
      ).toBeInTheDocument();
    }, { timeout: 5000 });
    for (const title of ["Serviços", "Skills", "Projetos", "Experiência", "Contato"]) {
      expect(screen.getByRole("heading", { level: 2, name: title })).toBeInTheDocument();
    }
  });

  it("renders each service as an h3 under the Serviços h2", async () => {
    render(<App />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { level: 2, name: "Serviços" })
      ).toBeInTheDocument();
    }, { timeout: 5000 });
    for (const name of ["Desenvolvimento Web", "Design UI/UX", "Automação & Scripts", "Apps & Mobile"]) {
      expect(screen.getByRole("heading", { level: 3, name })).toBeInTheDocument();
    }
    expect(
      screen.queryByRole("heading", { level: 1, name: "Desenvolvimento Web" })
    ).not.toBeInTheDocument();
  });

  it("renders skill stacks as h3 under the Skills h2", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 2, name: "Skills" })).toBeInTheDocument();
    }, { timeout: 5000 });
    for (const name of ["Frontend", "Backend", "DevOps & Tools"]) {
      expect(screen.getByRole("heading", { level: 3, name })).toBeInTheDocument();
    }
  });

  it("lists the featured project first and shows no invented rating", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 3, name: "SamutegDev" })).toBeInTheDocument();
    }, { timeout: 5000 });
    expect(screen.getByRole("heading", { level: 3, name: "TaskNest" })).toBeInTheDocument();
    const titles = screen
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);
    expect(titles.indexOf("SamutegDev")).toBeLessThan(titles.indexOf("TaskNest"));
    expect(screen.queryByText("4.8")).not.toBeInTheDocument();
    expect(screen.queryByText("4.9")).not.toBeInTheDocument();
    expect(screen.queryByText("4.1")).not.toBeInTheDocument();
  });

  it("keeps the experience hierarchy at h2 → h3 → h4", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 2, name: "Experiência" })).toBeInTheDocument();
    }, { timeout: 5000 });
    expect(screen.getByRole("heading", { level: 3, name: "Experiência Profissional" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 4, name: "Desenvolvedor Freelancer" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Formação" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Certificados" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 4, name: "Java Fundamentos" })).toBeInTheDocument();
  });

  it("distinguishes static contact info from actionable links", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 2, name: "Contato" })).toBeInTheDocument();
    }, { timeout: 5000 });
    expect(screen.getByRole("heading", { level: 3, name: "Informações" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Redes Sociais" })).toBeInTheDocument();
    const links = screen.getAllByRole("link");
    expect(links.some((link) => link.textContent?.includes("Brasil"))).toBe(false);
    const email = screen.getByRole("link", { name: /samuneveslopes@gmail\.com/i });
    expect(email).toHaveAttribute("href", "mailto:samuneveslopes@gmail.com");
  });

  it("never skips a heading level", async () => {
    render(<App />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { level: 1, name: "Olá, eu sou Samuel" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 2, name: "Serviços" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 2, name: "Skills" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 2, name: "Projetos" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 2, name: "Experiência" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 2, name: "Contato" })
      ).toBeInTheDocument();
    }, { timeout: 5000 });
    const levels = screen
      .getAllByRole("heading")
      .map((heading) => Number(heading.tagName[1]));
    expect(levels[0]).toBe(1);
    for (let i = 1; i < levels.length; i++) {
      expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
    }
  });
});
