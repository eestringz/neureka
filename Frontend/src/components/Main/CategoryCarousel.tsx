import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Categories, Category } from '@src/types/MainType'
import * as c from '@src/components/styles/Main/CategoryCarousel'
import { Navigation } from 'swiper/modules'
import { categoriesAtom } from '@src/stores/mainAtom'
import { useAtom } from 'jotai'
import { useRef, useState } from 'react'
import alertIcon from '/image/alert.png'

const CategoryCarousel = () => {
  const [categories, setCategories] = useAtom(categoriesAtom)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [error, setError] = useState(false)
  const errorRef = useRef<HTMLDivElement>(null)

  const handleCategories = (selectedCategory: Category) => {
    setCategories(prev => {
      // 선택된 카테고리가 이미 리스트에 있는지 확인
      const isExisting = prev.some(
        category => category.name === selectedCategory.name,
      )
      if (isExisting) {
        if (prev.length <= 3) {
          setError(false)
        }
        // 이미 존재하는 경우, 해당 카테고리를 제거
        return prev.filter(category => category.name !== selectedCategory.name)
      } else {
        // 존재하지 않는 경우, 카테고리 추가
        if (prev.length >= 3) {
          // alert('카테고리는 최대 3개까지 선택가능합니다.')
          setError(true)
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

  const handleMouseEnter = (name: string) => {
    setHoveredCategory(name)
  }

  const handleMouseLeave = () => {
    setHoveredCategory(null)
  }

  return (
    <c.CarouselWrapper>
      <c.ErrorAlert className={error ? 'error' : 'none'} ref={errorRef}>
        <c.AlertIcon src={alertIcon} />
        카테고리는 최대 3개까지 선택 가능합니다.
        <c.Clear onClick={() => setError(false)}>dd</c.Clear>
      </c.ErrorAlert>
      <Swiper
        modules={[Navigation]} // 모듈 활성화
        slidesPerView={9}
        initialSlide={4}
        loop={true}
        breakpoints={{
          360: { slidesPerView: 3, initialSlide: 1 },
          640: { slidesPerView: 5, initialSlide: 2 },
          840: { slidesPerView: 7, initialSlide: 3 },
        }}
        navigation={true}
        centeredSlides={true}
      >
        {Categories.map((category, index) => (
          <SwiperSlide
            key={index}
            onClick={() =>
              handleCategories({
                name: category.name,
                image: category.image,
                imageStatic: category.imageStatic,
              })
            }
            onMouseEnter={() => handleMouseEnter(category.name)}
            onMouseLeave={handleMouseLeave}
          >
            <c.Icon
              src={
                hoveredCategory === category.name
                  ? category.image
                  : category.imageStatic
              }
              alt={category.name}
            />
            <c.Category>{category.name}</c.Category>
          </SwiperSlide>
        ))}
      </Swiper>
    </c.CarouselWrapper>
  )
}

export default CategoryCarousel
