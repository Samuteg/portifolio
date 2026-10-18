import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import DevLogsPage from "../pages/DevLogsPage";

const GO_POST_TITLE = "Exercício em Go: calculando médias de uma turma";
const GO_POST_SLUG = "exercicio-em-go-calculando-medias-de-uma-turma";

afterEach(() => {
  cleanup();
});

describe("DevLogsPage — blog próprio", () => {
  it("lista os posts locais mais recentes", () => {
    render(<DevLogsPage />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Dev Logs" })
    ).toBeInTheDocument();
    expect(screen.getByText(GO_POST_TITLE)).toBeInTheDocument();
  });

  it("mostra 4 posts inicialmente e expande com ver todos", () => {
    render(<DevLogsPage />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(4);

    fireEvent.click(screen.getByRole("button", { name: /ver todos/i }));
    const expanded = screen.getAllByRole("heading", { level: 3 });
    expect(expanded.length).toBeGreaterThan(4);

    fireEvent.click(screen.getByRole("button", { name: /ver menos/i }));
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(4);
  });

  it("linka cada post para sua própria página em /log/<slug>", () => {
    render(<DevLogsPage />);
    const link = screen.getByRole("link", { name: new RegExp(GO_POST_TITLE, "i") });
    expect(link).toHaveAttribute("href", `/log/${GO_POST_SLUG}`);
  });
});
