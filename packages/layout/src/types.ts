/* eslint-disable no-unused-vars */
export type SFCWithInstall<T> = T & { install(app: any): void; };

export interface RegisterMenuData {
  title: string
  path: string
  icon?: string
  hide?: boolean
  query?: Record<string, any>
  params: Record<string, any>
  redirect?: string
  children?: RegisterMenuData[]
  target?: string
  subMenuProps?: Record<string, any>
  authority?: (...args: any[]) => boolean
}

export interface LayoutProps {
  collapsed?: boolean
  fixedHeader?: boolean
  data: RegisterMenuData[]
  logo?: string
  title?: string
}

export interface GlobalHeaderProps {
  opened?: boolean
  fixed?: boolean
}

export interface GlobalAsideProps {
  collapsed?: boolean
  data: RegisterMenuData[]
  logo?: string
  title?: string
  Authorized?: (...args: any[]) => boolean
  prefixIconClass?: string
  menuTextClass?: string
  checkMenuDisabled?: (data: RegisterMenuData) => boolean
  routerParams: Record<string, any>
  siderWidths?: string[]
}
