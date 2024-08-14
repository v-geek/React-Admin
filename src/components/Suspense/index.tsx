import React, { Suspense } from 'react'
import { PageLoader } from '../Loading'

const SuspenseComponent = (Component: React.LazyExoticComponent<React.ComponentType>) => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  )
}

export default SuspenseComponent
