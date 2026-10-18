import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import LogPostPage from "../pages/LogPostPage";

const GO_POST_SLUG = "exercicio-em-go-calculando-medias-de-uma-turma";
const GO_POST_TITLE = "Exercício em Go: calculando médias de uma turma";
const OLDER_SLUG = "structs-em-go-organizando-dados-de-forma-clara";
const NEWER_SLUG = "task-nest-refatorando-um-saa-s-de-gestao-de-tarefas-com-type-safety-de-ponta-a-ponta";

afterEach(() => {
  cleanup();
});

describe("LogPostPage — página completa do post", () => {
  it("renderiza o post como página com h1 e conteúdo markdown", () => {
    render(<LogPostPage slug={GO_POST_SLUG} />);
    expect(
      screen.getByRole("heading", { level: 1, name: GO_POST_TITLE })
    ).toBeInTheDocument();
    expect(screen.getByText("Modelando os dados")).toBeInTheDocument();
  });

  it("aplica syntax highlight nos code blocks", () => {
    render(<LogPostPage slug={GO_POST_SLUG} />);
    const code = document.querySelector("code.language-go");
    expect(code).not.toBeNull();
    expect(code?.querySelector(".hljs-keyword")).not.toBeNull();
  });

  it("exibe a imagem hero do post", () => {
    render(<LogPostPage slug={GO_POST_SLUG} />);
    const img = screen.getByRole("img", { name: GO_POST_TITLE });
    expect(img).toHaveAttribute("src", `/log-images/${GO_POST_SLUG}.webp`);
  });

  it("define o title do documento com o nome do post", () => {
    render(<LogPostPage slug={GO_POST_SLUG} />);
    expect(document.title).toBe(`${GO_POST_TITLE} — Samuel`);
  });

  it("navega entre posts anterior e próximo", () => {
    render(<LogPostPage slug={GO_POST_SLUG} />);
    expect(screen.getByRole("link", { name: /anterior/i })).toHaveAttribute(
      "href",
      `/log/${OLDER_SLUG}`
    );
    expect(screen.getByRole("link", { name: /próximo/i })).toHaveAttribute(
      "href",
      `/log/${NEWER_SLUG}`
    );
  });

  it("volta para a seção de logs pelo link do header", () => {
    render(<LogPostPage slug={GO_POST_SLUG} />);
    const back = screen.getByRole("link", { name: /todos os logs/i });
    expect(back).toHaveAttribute("href", "/#devlogs");
  });

  it("mostra estado 404 para slug inexistente", () => {
    render(<LogPostPage slug="post-que-nao-existe" />);
    expect(screen.getByRole("heading", { level: 1, name: "Post não encontrado" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /voltar para os logs/i })).toHaveAttribute(
      "href",
      "/#devlogs"
    );
  });
});
