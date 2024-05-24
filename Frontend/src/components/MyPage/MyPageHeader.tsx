import React, { useEffect, useState } from 'react'
import * as w from '@src/components/styles/MyPage/MyPageHeaderStyle'
import { useAtom, useAtomValue } from 'jotai'
import { isUserAtom } from '@src/stores/authAtom'

type Props = {}

const MyPageHeader = (props: Props) => {
  const user = useAtomValue(isUserAtom)
  const [name, setName] = useState('')
  useEffect(() => {
    setName(user.name as string)
  }, [user])
  return (
    <>
      <w.Welcome>
        안녕하세요
        {name ? <>, {name} 님</> : null}
      </w.Welcome>
    </>
  )
}

export default MyPageHeader
