import NewsDetailContainer from '@src/containers/NewsDetailContainer'
import TokenChecker from '@src/utils/TokenChecker'
import React from 'react'
import { useParams } from 'react-router-dom'

type Props = {}

const NewsDetailPage = ({}: Props) => {
  const { id } = useParams()

  return (
    <>
      <TokenChecker />
      <NewsDetailContainer newsId={id as string} />
    </>
  )
}

export default NewsDetailPage
