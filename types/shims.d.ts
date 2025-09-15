// types/shims.d.ts
// Minimal shims to unblock TS when local @types are missing.

declare module 'd3-array' {
  export function sum<T>(array: Iterable<T>, accessor?: (d: T) => number): number;
}

declare module 'd3-format' {
  export function format(specifier: string): (n: number) => string;
}

declare module 'three/examples/jsm/loaders/SVGLoader' {
  import { Loader, Shape } from 'three';
  export class SVGLoader extends Loader {
    load(
      url: string,
      onLoad: (data: { paths: { toShapes(isCCW?: boolean, noHoles?: boolean): Shape[] }[] }) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: unknown) => void
    ): void;
    static createShapes(
      shapePath: { toShapes(isCCW?: boolean, noHoles?: boolean): Shape[] }
    ): Shape[];
  }
}

declare module 'd3-shape'