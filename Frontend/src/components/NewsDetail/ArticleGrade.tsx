import React, { useEffect, useState } from 'react'

import * as g from '@src/components/styles/NewsDetail/ArticleGradeStyle'

import Rating from '@mui/material/Rating'
import { useMutation } from 'react-query'
import { fetchPostGrade } from '@src/apis/NewsApi'
import { useAtom } from 'jotai'
import { isUserEmailAtom } from '@src/stores/authAtom'

type Props = {
  grade: string
  newsId: string
}

type Grade = {
  email: string
  newsId: string
  grade: string
}

const ArticleGrade = ({ grade, newsId }: Props) => {
  const [value, setValue] = useState<number>(0)
  const [userEmail, setUserEmail] = useAtom(isUserEmailAtom)

  useEffect(() => {
    setValue(parseInt(grade))
  }, [grade])

  const { mutate: gradeMutate } = useMutation((data: Grade) =>
    fetchPostGrade(data),
  )

  const handleRatingChange = (
    event: React.ChangeEvent<{}>,
    newValue: number | null,
  ) => {
    if (newValue !== null) {
      setValue(newValue)
      // 새로운 값으로 요청을 보냄
      gradeMutate({
        email: userEmail,
        newsId: newsId,
        grade: newValue.toString(),
      })
    }
  }

  return (
    <>
      <g.Wrapper className="article-grade">
        <g.GradeMsg>다음에도 이 주제의 기사를 읽고 싶으신가요?</g.GradeMsg>
        <Rating value={value ? value : 0} onChange={handleRatingChange} />
      </g.Wrapper>
    </>
  )
}

export default ArticleGrade
