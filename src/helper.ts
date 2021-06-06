import path from "path";

export function join(a: string, b: string) {
  return path.join(a, b).replaceAll("\\", "/");
}
