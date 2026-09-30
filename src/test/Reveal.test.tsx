import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import Reveal from "../components/Reveal";

let observerCallback: IntersectionObserverCallback | null = null;
const observe = vi.fn();
const unobserve = vi.fn();
const disconnect = vi.fn();

class ControllableObserver {
  constructor(cb: IntersectionObserverCallback) {
    observerCallback = cb;
  }
  observe = observe;
  unobserve = unobserve;
  disconnect = disconnect;
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

const trigger = (isIntersecting: boolean) => {
  act(() => {
    observerCallback?.(
      [{ isIntersecting } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );
  });
};

beforeEach(() => {
  observerCallback = null;
  vi.clearAllMocks();
  vi.stubGlobal("IntersectionObserver", ControllableObserver);
});

describe("Reveal", () => {
  it("keeps content hidden until the element intersects", () => {
    render(
      <Reveal>
        <p>conteúdo</p>
      </Reveal>
    );
    const box = screen.getByText("conteúdo").parentElement;
    expect(box?.className).toContain("opacity-0");
    expect(box?.className).toContain("translate-y-6");
  });

  it("reveals content on intersection and caps the stagger delay", () => {
    render(
      <Reveal delay={2}>
        <p>conteúdo</p>
      </Reveal>
    );
    const box = screen.getByText("conteúdo").parentElement;
    expect(box?.style.transitionDelay).toBe("0.2s");
    trigger(true);
    expect(box?.className).toContain("opacity-100");
    expect(box?.className).not.toContain("opacity-0");
  });

  it("caps the stagger at 0.3s", () => {
    render(
      <Reveal delay={9}>
        <p>conteúdo</p>
      </Reveal>
    );
    expect(screen.getByText("conteúdo").parentElement?.style.transitionDelay).toBe("0.3s");
  });

  it("supports the left and scale variants", () => {
    render(
      <>
        <Reveal variant="left">
          <p>esquerda</p>
        </Reveal>
        <Reveal variant="scale">
          <p>escala</p>
        </Reveal>
      </>
    );
    expect(screen.getByText("esquerda").parentElement?.className).toContain("-translate-x-6");
    expect(screen.getByText("escala").parentElement?.className).toContain("scale-95");
  });
});
