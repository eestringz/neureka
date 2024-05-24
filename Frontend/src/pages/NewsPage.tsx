import NewsContainer from '@src/containers/NewsContainer'
import TokenChecker from '@src/utils/TokenChecker'
import React from 'react'

type Props = {}

const NewsPage = (props: Props) => {
  return (
    <>
      <TokenChecker />
      <NewsContainer />
    </>
  )
}

export default NewsPage
