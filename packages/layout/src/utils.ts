import * as pathToRegexp from "path-to-regexp";
import { RegisterMenuData } from "./types";

// eslint-disable-next-line no-useless-escape
const HttpReg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path: string): boolean {
  return HttpReg.test(path);
}

export function urlToList(url: string): string[] {
  const segments = url.split("/").filter(i => i);
  return segments.map((_, index) => {
    return `/${segments.slice(0, index + 1).join("/")}`;
  });
}

export function getMatchedMenuKeys(menuKeys: string[], path: string): string[] {
  return menuKeys.filter(key => {
    return !!pathToRegexp.match(key, { decode: decodeURIComponent })(path);
  });
}

export function menuDataFormatter(
  data: RegisterMenuData[],
  parentPath = "",
  parentAuthority?: RegisterMenuData["authority"]
): RegisterMenuData[] {
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
      authority: item.authority || parentAuthority
    };
    if (item.children) {
      result.children = menuDataFormatter(
        item.children,
        `${parentPath}/${item.path}`,
        item.authority
      );
    }
    return result;
  });
}

export function cleanPath(path: string): string {
  return path.replace(/\/\//g, "/");
}
// export function menuDataFormatter(
//   data: RegisterMenuData[],
//   parentPath = "",
//   parentAuthority?: RegisterMenuData["authority"]
// ): RegisterMenuData[] {
//   return data.map(item => {
//     let { path } = item;
//     if (!isUrl(path)) {
//       if (item.path) {
//         // 父级path(带有/) + 子级path
//         path = parentPath + item.path;
//       } else {
//         // 如果子级路径为空，则删除父级路径的'/'
//         path = parentPath.slice(0, parentPath.length - 1);
//       }
//     }
//     const result = {
//       ...item,
//       path,
//       // 权限默认继承自父级
//       authority: item.authority || parentAuthority
//     };
//     if (item.children) {
//       result.children = menuDataFormatter(
//         item.children,
//         `${parentPath}${item.path}/`,
//         item.authority
//       );
//     }
//     return result;
//   });
// }
