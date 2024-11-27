import * as http from "@std/http";

const DEFAULT_COOKIE_SETTINGS: Partial<http.Cookie> = {
  maxAge: 3600, // 1 hr
  sameSite: "Lax",
  path: "/",
  secure: true,
};

export function setFlash(key: string, value: string, headers?: Headers) {
  if (!headers) headers = new Headers();

  http.setCookie(headers, {
    ...DEFAULT_COOKIE_SETTINGS,
    name: "flash",
    value: encodeURIComponent(JSON.stringify({ [key]: value })),
  });

  return headers;
}

export function getFlash(headers: Headers): Record<string, string> | null {
  const cookie = http.getCookies(headers);
  if (!cookie["flash"]) return null;

  const flash = JSON.parse(decodeURIComponent(cookie["flash"]));
  return flash;
}

export function deleteFlash(headers: Headers) {
  const cookies = http.getSetCookies(headers);
  // Flash cookie was just set in this request, wait till next request to delete
  if (cookies.find((c) => c.name === "flash")) return;
  http.deleteCookie(headers, "flash");
}
