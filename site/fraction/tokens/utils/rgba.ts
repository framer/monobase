export const rgba = (hex: string, alpha?: number) => {
  const isValidHex = /^#([0-9A-F]{3}){1,2}$/i.test(hex);

  if (!isValidHex) {
    throw new Error(`Convert to rgba: The hex "${hex}" is an invalid color.`);
  }

  const trimmedHex = hex.replace("#", "");
  const r = parseInt(
    trimmedHex.length === 3
      ? trimmedHex.slice(0, 1).repeat(2)
      : trimmedHex.slice(0, 2),
    16
  );
  const g = parseInt(
    trimmedHex.length === 3
      ? trimmedHex.slice(1, 2).repeat(2)
      : trimmedHex.slice(2, 4),
    16
  );
  const b = parseInt(
    trimmedHex.length === 3
      ? trimmedHex.slice(2, 3).repeat(2)
      : trimmedHex.slice(4, 6),
    16
  );

  if (typeof alpha === "number" && Number.isFinite(alpha)) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } else {
    return `rgb(${r}, ${g}, ${b})`;
  }
};
