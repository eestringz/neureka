import Category from '@src/components/Main/Category'
import CategoryCarousel from '@src/components/Main/CategoryCarousel'
import * as bc from '@src/components/styles/Main/BubbleCategory'
import { isLoginAtom } from '@src/stores/authAtom'
import { categoriesAtom, categoryToggleAtom } from '@src/stores/mainAtom'
import { useAtom } from 'jotai'

const BubbleCategory = () => {
  const [isLogin, setIsLogin] = useAtom(isLoginAtom)
  // const [categoryToggle, setCategoryToggle] = useAtom(categoryToggleAtom)
  const [selectedCategories, setCategories] = useAtom(categoriesAtom)
  // const handleToggleCategory = () => setCategoryToggle(prev => !prev)

  return (
    <bc.Container>
      <bc.InfoWrapper>
        {/* <bc.CategoryInfo1
          className="CategoryToggle"
          >
          카테고리 선택
        </bc.CategoryInfo1> */}
        <bc.CategoryInfo2>
          ※ 카테고리는 최대 3개까지 선택할 수 있습니다.
        </bc.CategoryInfo2>
      </bc.InfoWrapper>
      <bc.CategoryWrapper className="CategoryList">
        <CategoryCarousel />
      </bc.CategoryWrapper>
      <bc.CategoryWrapper className="SelectedCategories">
        {selectedCategories.map((element, key) => (
          <Category
            key={key}
            name={element.name}
            image={element.image}
            imageStatic={element.imageStatic}
          />
        ))}
      </bc.CategoryWrapper>
    </bc.Container>
  )
}

export default BubbleCategory
