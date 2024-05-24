import * as c from '@src/components/styles/Main/Category'
import { categoriesAtom } from '@src/stores/mainAtom'
import { Categories, Category } from '@src/types/MainType'
import { useAtom } from 'jotai'
import { useState } from 'react'

export type CategoryProps = {
  name: string
  image: string
  imageStatic: string
}

const Category = ({ name, image, imageStatic }: CategoryProps) => {
  const [categories, setCategories] = useAtom(categoriesAtom)
  const [isHovered, setIsHovered] = useState(false)
  const handleCategories = (selectedCategory: Category) => {
    setCategories(prev => {
      // 선택된 카테고리가 이미 리스트에 있는지 확인
      const isExisting = prev.some(
        category => category.name === selectedCategory.name,
      )
      if (isExisting) {
        // 이미 존재하는 경우, 해당 카테고리를 제거
        return prev.filter(category => category.name !== selectedCategory.name)
      } else {
        // 존재하지 않는 경우, 카테고리 추가
        if (prev.length >= 3) {
          return prev
        }
        const updatedCategories = [...prev, selectedCategory]
        const categoryNames = Categories.map(category => category.name) // 카테고리 이름만 추출
        const sortedSelectedCategories = updatedCategories.sort((a, b) => {
          const indexA = categoryNames.indexOf(a.name)
          const indexB = categoryNames.indexOf(b.name)
          return indexA - indexB
        })
        return sortedSelectedCategories
      }
    })
  }

  return (
    <>
      <c.categoryWrapper
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => handleCategories({ name, image, imageStatic })}
      >
        <c.Icon src={isHovered ? image : imageStatic} />
        <c.Category>{name}</c.Category>
      </c.categoryWrapper>
    </>
  )
}

export default Category
