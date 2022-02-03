export const PluginKey = "$CharrueLayoutPluginOptions"

export const getComponentConfig = (version) => {
  const config = {}
  if (version == 2) {
    config.subMenu = 'el-submenu'
  } else if (version == 3) {
    config.subMenu = 'el-sub-menu'
  } else {
    console.error(`[charrue layout] version ${version} is not supported`)
  }
  return config
}

const HttpReg =
  // eslint-disable-next-line no-useless-escape
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return HttpReg.test(path);
}

export function urlToList(url) {
  const segments = url.split("/").filter((i) => i);
  return segments.map((_, index) => {
    return `/${segments.slice(0, index + 1).join("/")}`;
  });
}
/**
 * 1. 补全path的路径
 * 2. 补全redirect的路径  如果一个菜单数据设置了redirect 那么在$route.path 匹配到该path时，会指向redirect所指向的path
 *
 * @param { RegisterMenuData } data
 * @returns { RegisterMenuData }
 */
export function menuDataFormatter(data, parentPath = "") {
  return data.map((item) => {
    let { path } = item;
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
      parentPath
    };
    if (item.children) {
      result.children = menuDataFormatter(
        item.children,
        `${parentPath}/${item.path}`,
      );
    }
    return result;
  });
}

/**
 * @param { RegisterMenuData[] } processedMenuData
 */
export function getMenuDataPathMapping(menuList) {
  let mapping = {}

  const setMapping = (list) => {
    const itemList = []
    list.forEach(item => {
      mapping[item.path] = item
      if (item.children && Array.isArray(item.children) && item.children.length > 0) {
        itemList.push(...item.children)
      }
    })
    return itemList
  }

  let list = setMapping(menuList)
  while(list && list.length > 0) {
    list = setMapping(list)
  }

  return mapping;
}

export function cleanPath(path) {
  return path.replace(/\/\//g, "/");
}

export const inBrowser = typeof window !== undefined;

export function isFunction(val) {
  return typeof val === "function";
}
