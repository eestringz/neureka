import { publicRequest } from '@src/hooks/requestMethod'
import { User } from '@src/types/UserType'

export const fetchUserInfo = async (email: string) => {
  return await publicRequest.get('user/mypage', {
    params: {
      email: email,
    },
  })
}

export const fetchChangeUserInfo = async (newInfo: User) => {
  return await publicRequest.post('user/mypage', newInfo)
}
