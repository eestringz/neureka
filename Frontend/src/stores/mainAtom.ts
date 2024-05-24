import { Category, KeywordCount } from "@src/types/MainType"
import { atom } from "jotai"

export const categoryToggleAtom = atom(true)
export const categoriesAtom = atom<Category[]>([])
export const keywordsAtom = atom<KeywordCount[]>([])
export const selectedKeywordAtom = atom<KeywordCount>({keyword: '', count: 0, ids: []})