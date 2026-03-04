import type { AnimatingStep } from "./types";

export class StepAnimator {
  private keyGen: number;
  private steps: AnimatingStep[];

  constructor(count: number) {
    this.keyGen = count;
    this.steps = Array.from({ length: count }, (_, i) => ({
      key: i,
      index: i,
      phase: "stable" as const,
    }));
  }

  reconcile(newCount: number): { hasEntering: boolean; exitingCount: number } {
    const liveCount = this.steps.filter((s) => s.phase !== "exiting").length;
    if (liveCount === newCount) {
      return {
        hasEntering: this.steps.some((s) => s.phase === "entering"),
        exitingCount: this.steps.filter((s) => s.phase === "exiting").length,
      };
    }

    if (newCount < liveCount) {
      let seen = 0;
      this.steps = this.steps.map((s) => {
        if (s.phase === "exiting") return s;
        seen++;
        if (seen > newCount) return { ...s, phase: "exiting" as const };
        return s;
      });
    }

    if (newCount > liveCount) {
      for (let i = liveCount; i < newCount; i++) {
        this.keyGen++;
        this.steps.push({
          key: this.keyGen,
          index: i,
          phase: "entering" as const,
        });
      }
    }

    // Re-index live steps
    let idx = 0;
    this.steps = this.steps.map((s) =>
      s.phase === "exiting" ? s : { ...s, index: idx++ },
    );

    return {
      hasEntering: this.steps.some((s) => s.phase === "entering"),
      exitingCount: this.steps.filter((s) => s.phase === "exiting").length,
    };
  }

  promoteEntering(): void {
    this.steps = this.steps.map((s) =>
      s.phase === "entering" ? { ...s, phase: "stable" as const } : s,
    );
  }

  removeExiting(): void {
    this.steps = this.steps.filter((s) => s.phase !== "exiting");
  }

  getSteps(): AnimatingStep[] {
    return [...this.steps];
  }
}
