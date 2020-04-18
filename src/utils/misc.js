export function isIntersecting(obj, { x, y }, padding) {
  const { left, right, top, bottom } = obj.getBounds();
  return (
    x >= left - padding &&
    x <= right + padding &&
    y >= top - padding &&
    y <= bottom + padding
  );
}

export function getAnimationName(bin, animationType) {
  return `${bin}-${animationType}`;
}

export function getImageSize(key) {
  const tex = this.textures.get(key);
  const { width, height } = tex.getSourceImage();
  return { width, height };
}
