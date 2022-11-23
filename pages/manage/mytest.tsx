import type { ReactElement } from 'react'
import MainLayout from '../../comps/layouts/main'

import type { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  return <p>hello world</p>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export default Page