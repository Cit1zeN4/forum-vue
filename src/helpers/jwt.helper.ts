import jwt_decode from "jwt-decode";

export type JWT = { userId: string; iat: number; exp: number };

export function jwtStringToObject(raw_jwt: string): JWT {
  return jwt_decode<JWT>(raw_jwt);
}

export function getCookie(name: string): string | undefined {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
