import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { useInView } from "../hooks/useInView";

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

const Probe = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return <div ref={ref} data-testid="probe" data-inview={String(inView)} />;
};

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

describe("useInView", () => {
  it("starts out of view and observes the element", () => {
    render(<Probe />);
    expect(screen.getByTestId("probe")).toHaveAttribute("data-inview", "false");
    expect(observe).toHaveBeenCalledTimes(1);
  });

  it("becomes visible when intersecting and stops observing", () => {
    render(<Probe />);
    trigger(true);
    expect(screen.getByTestId("probe")).toHaveAttribute("data-inview", "true");
    expect(unobserve).toHaveBeenCalledTimes(1);
  });

  it("stays hidden when not intersecting", () => {
    render(<Probe />);
    trigger(false);
    expect(screen.getByTestId("probe")).toHaveAttribute("data-inview", "false");
  });
});
