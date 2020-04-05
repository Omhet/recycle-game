export function isIntersecting(obj, { x, y }) {
    const { left, right, top, bottom } = obj.getBounds();
    const padding = 20;
    return x >= left - padding &&
        x <= right + padding &&
        y >= top - padding &&
        y <= bottom + padding;
}