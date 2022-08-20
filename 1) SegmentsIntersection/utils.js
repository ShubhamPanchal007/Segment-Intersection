function linearInterpolation(x, y, t) {
  return x + (y - x) * t;
}
function getIntersection(P1, P2, P3, P4) {
  let A1 = P2.y - P1.y,
    B1 = P2.x - P1.x,
    C1 = A1 * P1.x + B1 * P1.y;
  let A2 = P4.y - P3.y,
    B2 = P3.x - P4.x,
    C2 = A2 * P3.x + B2 * P3.y;

  let top1 = C1 * B2 - C2 * B1;
  let top2 = -(C1 * A2 - A1 * C2);
  let denominator = A1 * B2 - A2 * B1;
  return {
    x: top1 / denominator,
    y: top2 / denominator,
  };
}
