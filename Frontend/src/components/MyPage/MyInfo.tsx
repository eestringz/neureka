import React, { useEffect, useState } from 'react'
import * as m from '@src/components/styles/MyPage/MyInfoStyle'

import EditIcon from '@mui/icons-material/Edit'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useAtom, useAtomValue } from 'jotai'
import { isUserAtom, isUserEmailAtom } from '@src/stores/authAtom'
import { selectAtom } from 'jotai/utils'
import { useMutation } from 'react-query'
import { fetchChangeUserInfo } from '@src/apis/AuthApi'
import { User } from '@src/types/UserType'

type Props = {
  userInfoData: User
}

const MyInfo = ({ userInfoData }: Props) => {
  const [edit, SetEdit] = useState(false)
  const [user, setUser] = useAtom(isUserAtom)
  const [userEmail, setUserEmail] = useAtom(isUserEmailAtom)
  const [id, setId] = useState(0)
  const [nickname, setNickname] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [birth, setBirth] = useState('')
  const [gender, setGender] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [nameError, setNameError] = useState(false)

  const goSave = () => {
    if (phone && phone.length < 13) {
      setPhoneError(true)
      return
    }
    if (!name || name.length < 1) {
      setNameError(true)
      return
    }
    SetEdit(!edit)
    setUser({
      userInfoId: id,
      name: name,
      nickname: nickname,
      email: email,
      phone: phone,
      birth: birth,
      gender: gender,
    })
    userInfoMutate({
      userInfoId: id,
      name: name,
      nickname: nickname,
      email: email,
      phone: phone,
      birth: birth,
      gender: gender,
    })
  }

  useEffect(() => {
    setId(userInfoData?.userInfoId as number)
    setNickname(userInfoData?.nickname as string)
    setEmail(userEmail as string)
    setPhone(userInfoData?.phone as string)
    setBirth(userInfoData?.birth as string)
    setGender(userInfoData?.gender as boolean)
    setName(userInfoData?.name as string)
  }, [userInfoData])

  const phoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const onlyNumber = value.replace(/[^0-9]/g, '')
    setPhone(onlyNumber)
  }

  useEffect(() => {
    if (name?.length > 0) {
      setNameError(false)
    }
  }, [name])

  useEffect(() => {
    if (phone?.length === 11) {
      setPhone(phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'))
    }
    if (phone?.length === 13) {
      setPhoneError(false)
    }
  }, [phone])

  // 유저 정보 수정
  const { mutate: userInfoMutate } = useMutation((data: User) =>
    fetchChangeUserInfo(data),
  )

  return (
    <m.InfoBox>
      <m.ErrorAlert className={nameError ? 'error' : ''}>
        이름을 확인하세요! (* 한 글자 이상)
      </m.ErrorAlert>
      <m.ErrorAlert className={phoneError ? 'error' : ''}>
        전화번호를 확인하세요!
      </m.ErrorAlert>
      <m.Category>
        <m.Title>이름</m.Title>
        <m.Content
          value={typeof name == 'string' ? name : '이름을 입력해주세요'}
          onChange={event => {
            setName(event.target.value as string)
          }}
          disabled={edit ? false : true}
          className={edit ? 'edit' : ''}
        />
      </m.Category>

      <m.Category>
        <m.Title>이메일</m.Title>
        <m.Content value={email} disabled={false} className="disabled" />
      </m.Category>

      <m.Category>
        <m.Title>전화번호</m.Title>
        <m.Content
          value={phone}
          onChange={phoneChange}
          disabled={edit ? false : true}
          className={edit ? 'edit' : ''}
          maxLength={11}
        />
      </m.Category>

      <m.Category>
        <m.Title>생년월일</m.Title>
        <m.Content
          value={birth}
          onChange={event => {
            setBirth(event.target.value as string)
          }}
          disabled={edit ? false : true}
          className={edit ? 'edit' : ''}
          type="date"
          max={new Date().toISOString().substring(0, 10)}
        />
      </m.Category>

      <m.Category>
        <m.Title>성별</m.Title>
        <m.GenderLabel>
          남
          <m.Content
            value="남"
            onChange={event => {
              setGender(true)
            }}
            disabled={edit ? false : true}
            className={edit ? 'edit' : ''}
            type="radio"
            name="gender"
            checked={gender ? true : false}
          />
        </m.GenderLabel>
        <m.GenderLabel className="female">
          여
          <m.Content
            value="여"
            onChange={event => {
              setGender(false)
            }}
            disabled={edit ? false : true}
            className={edit ? 'edit' : ''}
            type="radio"
            name="gender"
            checked={gender ? false : true}
          />
        </m.GenderLabel>
      </m.Category>
      {edit ? (
        <m.Btn onClick={goSave} className="save">
          <span>저장</span>
          <CheckCircleIcon />
        </m.Btn>
      ) : (
        <m.Btn onClick={() => SetEdit(!edit)} className="edit">
          <span>수정</span>
          <EditIcon />
        </m.Btn>
      )}
    </m.InfoBox>
  )
}

export default MyInfo
