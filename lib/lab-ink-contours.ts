import type { LabSection } from "./lab";

type Point = [number, number];
type Curve = [Point, Point, Point];
const lerp = (a: Point, b: Point, t: number): Point => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

function split(start: Point, [a, b, end]: Curve, t: number): [Curve, Curve] {
  const ab = lerp(start, a, t), bc = lerp(a, b, t), cd = lerp(b, end, t);
  const left = lerp(ab, bc, t), right = lerp(bc, cd, t), middle = lerp(left, right, t);
  return [[ab, left, middle], [right, cd, end]];
}

// Subdivision preserves each curve while giving every room the same eight
// cubic segments and two closing edges as the menu. Motion can then interpolate
// both directions instead of falling back to an immediate path replacement.
function boundary(start: Point, curves: Curve[], divisions: number[]): string {
  let cursor = start;
  const segments: Curve[] = [];
  curves.forEach((curve, index) => {
    let remainder = curve;
    for (let count = divisions[index]; count > 1; count--) {
      const [head, tail] = split(cursor, remainder, 1 / count);
      segments.push(head);
      cursor = head[2];
      remainder = tail;
    }
    segments.push(remainder);
    cursor = remainder[2];
  });
  const numbers = (points: Point[]) => points.flat().map(value => Number(value.toFixed(4))).join(" ");
  return `M${numbers([start])}${segments.map(curve => `C${numbers(curve)}`).join("")}L1660 ${cursor[1]}L1660 ${start[1]}Z`;
}

const musicStart: Point = [540, -150];
export const musicInkContours = [
  boundary(musicStart, [[[620, 50], [635, 170], [550, 300]], [[460, 440], [570, 480], [555, 640]], [[530, 780], [615, 880], [600, 1030]]], [3, 3, 2]),
  boundary(musicStart, [[[595, 40], [660, 175], [565, 305]], [[485, 430], [535, 500], [570, 640]], [[555, 790], [590, 880], [615, 1030]]], [3, 3, 2]),
  boundary(musicStart, [[[645, 60], [610, 160], [535, 295]], [[440, 450], [600, 465], [540, 640]], [[510, 770], [640, 895], [585, 1030]]], [3, 3, 2]),
];
musicInkContours.push(musicInkContours[0]);

const gamesContour = boundary([-100, -150], [[[-100, 246.6667], [-100, 643.3333], [-100, 1040]]], [8]);
// Life's visible boundary is traversed top-to-bottom like the menu. Its closing
// edges remain offscreen, beyond the existing slide to the right.
const lifeContour = boundary([465, -180], [
  [[390, -110], [578, -25], [628, 95]],
  [[685, 230], [527, 216], [485, 385]],
  [[440, 570], [632, 513], [724, 650]],
  [[820, 795], [1095, 690], [1205, 830]],
  [[1310, 985], [1420, 1020], [1650, 1020]],
], [2, 2, 2, 1, 1]);

export const roomInkContours: Record<LabSection, string> = {
  life: lifeContour,
  games: gamesContour,
  music: musicInkContours[0],
  projects: musicInkContours[0],
  odds: musicInkContours[0],
};
