export interface Point {
  x: number;
  y: number;
}

export interface PointWithDirection extends Point {
  facing: string;
}
