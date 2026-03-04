export class AutoPlayController {
  stepDuration: number;
  loop: boolean;

  constructor(
    { stepDuration = 3000, loop = true }: { stepDuration?: number; loop?: boolean } = {},
  ) {
    this.stepDuration = stepDuration;
    this.loop = loop;
  }

  computeNext(active: number, count: number): number | null {
    return active < count - 1 ? active + 1 : this.loop ? 0 : null;
  }
}
