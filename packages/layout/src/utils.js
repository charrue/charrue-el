import * as pathToRegexp from "path-to-regexp";

// eslint-disable-next-line no-useless-escape
const HttpReg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return HttpReg.test(path);
}

export function urlToList(url) {
  const segments = url.split("/").filter(i => i);
  return segments.map((_, index) => {
    return `/${segments.slice(0, index + 1).join("/")}`;
  });
}

export function getMatchedMenuKeys(menuKeys, path) {
  return menuKeys.filter(key => {
    return !!pathToRegexp.match(key, { decode: decodeURIComponent })(path);
  });
}

export function menuDataFormatter(
  data,
  parentPath = "",
  parentAuthority,
) {
  return data.map(item => {
    let path = item.path;
    if (path && !isUrl(path)) {
      const isRootPath = path[0] === "/";
      if (path) {
        path = parentPath && isRootPath ? path : `${parentPath}/${path}`;
      }
    }

    path = cleanPath(path);
    const result = {
      ...item,
      path,
      // 权限默认继承自父级
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = menuDataFormatter(
        item.children,
        `${parentPath}/${item.path}`,
        item.authority,
      );
    }
    return result;
  });
}

export function cleanPath(path) {
  return path.replace(/\/\//g, "/");
}
