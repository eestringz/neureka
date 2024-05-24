import { publicRequest } from '@src/hooks/requestMethod'

import { MarkWord } from '@src/types/WordType'

export const fetchWords = async () => {
  return await publicRequest.get('dictionary/list')
}

export const fetchMarkWord = async (data: MarkWord) => {
  return await publicRequest.post('dictionary/like', null, {
    params: data,
  })
}

export const fetchUnmarkWord = async (data: MarkWord) => {
  return await publicRequest.delete('dictionary/like/delete', {
    params: data,
  })
}

export const fetchMarkedWords = async (userEmail: string) => {
  return await publicRequest.get('dictionary/like/list', {
    params: {
      email: userEmail,
    },
  })
}
