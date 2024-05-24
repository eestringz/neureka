import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { Word } from '@src/types/WordType'

export const markedWordsAtom = atomWithStorage<Word[] | null>(
  'markedWords',
  null,
)

export const toggleMarkingAtom = atom<boolean>(false)
