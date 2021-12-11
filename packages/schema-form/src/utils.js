export function isPrimary(obj) {
  return (
    typeof obj === "string" ||
    typeof obj === "number" ||
    typeof obj === "boolean"
  );
}

export const hasOwnProperty = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
