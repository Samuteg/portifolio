import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "../pages/HomePage";

describe("HomePage budget modal", () => {
  it("opens when clicking hire and closes with Escape", async () => {
    render(<HomePage />);
    fireEvent.click(await screen.findByRole("button", { name: /me contrate/i }));
    expect(await screen.findByRole("dialog", { name: /solicitar orçamento/i })).toBeInTheDocument();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog", { name: /solicitar orçamento/i })).not.toBeInTheDocument();
  });

  it("closes when clicking outside the dialog", async () => {
    render(<HomePage />);
    fireEvent.click(await screen.findByRole("button", { name: /me contrate/i }));
    const dialog = await screen.findByRole("dialog", { name: /solicitar orçamento/i });
    const backdrop = dialog.parentElement;
    if (!backdrop) throw new Error("backdrop not found");
    fireEvent.click(backdrop);
    expect(screen.queryByRole("dialog", { name: /solicitar orçamento/i })).not.toBeInTheDocument();
  });

  it("submits the form by opening WhatsApp with the message", async () => {
    const openMock = vi.fn();
    Object.defineProperty(window, "open", { value: openMock, writable: true });
    render(<HomePage />);
    fireEvent.click(await screen.findByRole("button", { name: /me contrate/i }));
    await screen.findByRole("dialog", { name: /solicitar orçamento/i });

    fireEvent.change(screen.getByPlaceholderText("Ex: Maria Silva"), {
      target: { value: "Maria Silva" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ex: maria@email.com"), {
      target: { value: "maria@email.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/descreva brevemente/i), {
      target: { value: "Preciso de um site" },
    });
    fireEvent.click(screen.getByRole("button", { name: /enviar pelo whatsapp/i }));

    expect(openMock).toHaveBeenCalledTimes(1);
    const url = String(openMock.mock.calls[0][0]);
    expect(url).toContain("https://wa.me/551158491828");
    expect(url).toContain(encodeURIComponent("Maria Silva"));
  });

  it("keeps keyboard focus inside the open dialog", async () => {
    render(<HomePage />);
    fireEvent.click(await screen.findByRole("button", { name: /me contrate/i }));
    const dialog = await screen.findByRole("dialog", { name: /solicitar orçamento/i });
    const focusables = Array.from(
      dialog.querySelectorAll<HTMLElement>("button, input, textarea")
    );
    const last = focusables[focusables.length - 1];
    last.focus();
    fireEvent.keyDown(window, { key: "Tab" });
    expect(document.activeElement).toBe(focusables[0]);
    fireEvent.keyDown(window, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(last);
  });

  it("describes the dialog with its instructions", async () => {
    render(<HomePage />);
    fireEvent.click(await screen.findByRole("button", { name: /me contrate/i }));
    const dialog = await screen.findByRole("dialog", { name: /solicitar orçamento/i });
    expect(dialog).toHaveAttribute("aria-describedby", "hire-modal-hint");
    expect(document.getElementById("hire-modal-hint")).toHaveTextContent(/whatsapp/i);
  });

  it("gives the fields the shared focus style instead of suppressing the outline", async () => {
    render(<HomePage />);
    fireEvent.click(await screen.findByRole("button", { name: /me contrate/i }));
    const input = await screen.findByLabelText("Seu nome");
    expect(input.className).toContain("field");
    expect(input.className).not.toContain("focus:outline-none");
  });
});
