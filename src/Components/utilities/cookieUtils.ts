// WIP
export const curryCookie = (doc: Document) => (key: string) => (value: string) => (expiry: string) => value
    ? (doc.cookie = `${key}=${value}; ${
        expiry ? `expires=${expiry}; ` : `max-age=86400; `
      }`)
    : (doc.cookie.match(`(^|; )${key}=([^;]*)`) || "")[2]
    ? (doc.cookie.match(`(^|; )${key}=([^;]*)`) || "")[2]
    : "";
const cc = curryCookie(document);

export const setCookie = (key: string, val: string) => cc(key)(val)("");
export const getCookie = (key: string) => cc(key)("")("");
export const rmCookie = (key: string) => cc(key)("-")(new Date().toUTCString());
export const hasCookie = (key: string) => !!getCookie(key);

// From Newlook's createExpirableCookie
export const setExpirableCookie = (
  // cookie: string,
  name: string,
  value: string,
  date: Date,
  path: string
): void => {
  // All cookie expiration dates need to be specified as UTC string
  const expires = date.toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=${path};secure`;
};

// From Newlook
export const getWebSecurityTokenExpiry = (): Date => {
  return new Date(parseInt(getCookie("webSecurityTokenExpiry"), 10));
};
