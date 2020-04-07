export function isIntersecting(obj, { x, y }, padding) {
  const { left, right, top, bottom } = obj.getBounds();
  return (
    x >= left - padding &&
    x <= right + padding &&
    y >= top - padding &&
    y <= bottom + padding
  );
}
