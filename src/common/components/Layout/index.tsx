import { type ReactNode } from 'react'

import Header, { type HeaderProps } from '@/common/components/Header'

interface Props {
  children: ReactNode
  headerProps: HeaderProps
}

const Layout = ({ children, headerProps }: Props) => (
  <div className="flex h-full flex-col">
    <Header baseUrl={headerProps.baseUrl} links={headerProps.links} endSlot={headerProps.endSlot} />
    <main className="container flex-1 py-4 sm:py-8">{children}</main>
  </div>
)

export default Layout
