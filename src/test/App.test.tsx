import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("renders the navbar", () => {
    render(<App />);
    expect(screen.getByText("Samuel")).toBeInTheDocument();
  });

  it("renders the footer", () => {
    render(<App />);
    expect(screen.getByText(/Todos os direitos reservados/)).toBeInTheDocument();
  });

  it("renders all sections on a single page", async () => {
    render(<App />);
    await waitFor(() => {
      for (const id of ["home", "services", "skills", "projects", "experiences", "contact"]) {
        expect(document.getElementById(id)).toBeInTheDocument();
      }
    });
    expect(await screen.findAllByText("Serviços")).not.toHaveLength(0);
    expect(await screen.findAllByText("Skills")).not.toHaveLength(0);
    expect(await screen.findAllByText("Projetos")).not.toHaveLength(0);
    expect(await screen.findAllByText("Experiência")).not.toHaveLength(0);
    expect(await screen.findAllByText("Contato")).not.toHaveLength(0);
  });
});
