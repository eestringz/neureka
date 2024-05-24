import DictionaryContainer from '@src/containers/DictionaryContainer'
import TokenChecker from '@src/utils/TokenChecker'
import React from 'react'

type Props = {}

const DictionaryPage = (props: Props) => {
  return (
    <>
      <TokenChecker />
      <DictionaryContainer />
    </>
  )
}

export default DictionaryPage
