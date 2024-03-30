import Category from '@src/components/Main/Category'
import CategoryCarousel from '@src/components/Main/CategoryCarousel'
import * as bc from '@src/components/styles/Main/BubbleCategory'
import { isLoginAtom } from '@src/stores/authAtom'
import { categoriesAtom, categoryToggleAtom } from '@src/stores/mainAtom'
import { useAtom } from 'jotai'

const BubbleCategory = () => {
  const [isLogin, setIsLogin] = useAtom(isLoginAtom)
  const [categoryToggle, setCategoryToggle] = useAtom(categoryToggleAtom)
  const [selectedCategories, setCategories] = useAtom(categoriesAtom)
  const handleToggleCategory = () => setCategoryToggle(prev => !prev)

  return (
    <bc.Container>
      <bc.ToggleWrapper>
        <bc.CategoryToggle
          className="CategoryToggle"
          onClick={handleToggleCategory}
        >
          카테고리 선택
        </bc.CategoryToggle>
      </bc.ToggleWrapper>
      <bc.CategoryWrapper className="CategoryList" $show={categoryToggle}>
        <CategoryCarousel show={categoryToggle} />
      </bc.CategoryWrapper>

      <bc.CategoryWrapper
        className="SelectedCategories"
        $show={categoryToggle}
      >
        {selectedCategories.map((element, key) => (
          <Category
            key={key}
            name={element.name}
            image={element.image}
            imageStatic={element.imageStatic}
            show={categoryToggle}
          />
        ))}
      </bc.CategoryWrapper>

    </bc.Container>
  )
}

export default BubbleCategory
