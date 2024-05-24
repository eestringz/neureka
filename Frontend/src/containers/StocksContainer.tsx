import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { useQuery, useMutation } from 'react-query'
import {
  fetchCompanyList,
  fetchCompanyPrice,
  fetchCompanyLikeList,
  fetchCompanyLike,
  fetchCompanyUnLike,
  fetchCompanyLatestList,
  fetchCompanyLatest,
  fetchCompanyNewsList,
  fetchCompanySubscribe,
} from '@src/apis/StockApi'
import {
  selectedCompanyAtom,
  LikedCompanyListAtom,
  selectedNewsListAtom,
} from '@src/stores/stockAtom'
import SearchStocksSection from '@src/components/Stocks/SearchStocksSection'
import MyStocksSection from '@src/components/Stocks/MyStocksSection'
import LatestStocksSection from '@src/components/Stocks/LatestStocksSection'
import MainTopSection from '@src/components/Stocks/MainTopSection'
import StockPriceSection from '@src/components/Stocks/StockPriceSection'
import StockChartSection from '@src/components/Stocks/StockChartSection'
import StockNewsSection from '@src/components/Stocks/StockNewsSection'
import Loading from '@src/common/Loading'
import StockTutorial from '@src/tutorials/StockTutorial'
import { confetti } from '@src/App'
import * as s from '@src/containers/styles/StocksContainerStyle'
import SlideBar from '@src/components/Main/SlideBar'

const StocksContainer = () => {
  // const userEmail = useAtomValue(isUserEmailAtom) // 유저 이메일
  const userEmail = JSON.parse(localStorage.getItem('useremail') as string)
  const [selectedStock] = useAtom(selectedCompanyAtom) // select 한 기업
  const [, setLikedCompanyList] = useAtom(LikedCompanyListAtom) // 관심 기업 리스트
  const [, setSelectedNewsList] = useAtom(selectedNewsListAtom) // 기업 뉴스 리스트

  // 기업 전체 조회
  const { data: companyList } = useQuery({
    queryKey: ['CompanyList'],
    queryFn: fetchCompanyList,
  })

  // 선택 기업 차트 데이터 조회
  const {
    data: companyPriceList,
    refetch: refetchCompanyPriceList,
    isLoading: isLoadingCompanyPriceList,
  } = useQuery({
    queryKey: ['CompanyPriceList'],
    queryFn: () => fetchCompanyPrice(selectedStock.code),
  })

  // 선택 기업 최근 뉴스 조회
  const { refetch: refetchCompanyNewsList } = useQuery({
    queryKey: ['CompanyNewsList'],
    queryFn: () => fetchCompanyNewsList(selectedStock.companyName),
    onSuccess: data => {
      setSelectedNewsList(data) // 최근 뉴스 업데이트
    },
  })

  // 관심 기업 조회
  const { data: companyLikeList, refetch: refetchCompanyLikeList } = useQuery({
    queryKey: ['CompanyLikeList'],
    queryFn: () => fetchCompanyLikeList(userEmail),
    onSuccess: data => {
      setLikedCompanyList(data) // 관심 기업 업데이트
    },
  })

  // 관심 기업 등록
  const { mutate: likeCompany } = useMutation({
    mutationKey: ['LikeCompany'],
    mutationFn: fetchCompanyLike,
    onSuccess: () => refetchCompanyLikeList(), // 관심 기업 조회 refetch
  })

  const handleAddMyStock = () => {
    const params = {
      email: userEmail,
      code: selectedStock.code,
    }
    likeCompany(params)
  }

  // 관심 기업 등록 취소
  const { mutate: unLikeCompany } = useMutation({
    mutationKey: ['UnLikeCompany'],
    mutationFn: fetchCompanyUnLike,
    onSuccess: () => refetchCompanyLikeList(), // 관심 기업 조회 refetch
  })

  const handleRemoveMyStock = () => {
    const params = {
      email: userEmail,
      code: selectedStock.code,
    }
    unLikeCompany(params)
  }

  // 최근 조회 기업 조회
  const { data: companyLatestList, refetch: refetchCompanyLatestList } =
    useQuery({
      queryKey: ['CompanyLatestList'],
      queryFn: () => fetchCompanyLatestList(userEmail),
    })

  // 최근 조회 기업 등록
  const { mutate: latestCompany } = useMutation({
    mutationKey: ['LatestCompany'],
    mutationFn: fetchCompanyLatest,
    onSuccess: () => refetchCompanyLatestList(), // 최근 조회 기업 조회 refetch
  })

  const handleAddLatestCompany = () => {
    const params = {
      email: userEmail,
      code: selectedStock.code,
    }
    latestCompany(params)
  }

  // 구독 기업 여부 변경
  const { mutate: subscribeCompany } = useMutation({
    mutationKey: ['SubscribeCompany'],
    mutationFn: fetchCompanySubscribe,
    onSuccess: () => refetchCompanyLikeList(), // 관심 기업 조회 refetch
  })

  // 구독
  const handleSubscribeCompany = (code: string) => {
    const params = {
      code,
      email: userEmail,
      isCheck: true,
    }
    subscribeCompany(params)
    handleConfetti()
  }

  // 구독 취소
  const handleUnSubscribeCompany = (code: string) => {
    const params = {
      code,
      email: userEmail,
      isCheck: false,
    }
    subscribeCompany(params)
  }

  // 구독시 꽃가루 이벤트
  const handleConfetti = () => {
    confetti.addConfetti({
      confettiColors: [
        '#ff00ff', // 핑크
        '#ffff00', // 노랑
        '#00ff00', // 녹색
        '#00ffff', // 청록
        '#0000ff', // 파랑
        '#ff0000', // 빨강
        '#800080', // 보라
        '#ffa500', // 주황
        '#008000', // 초록
      ],
      confettiRadius: 5,
      confettiNumber: 800,
    })
  }

  // 선택 기업 변경 시
  useEffect(() => {
    setSelectedNewsList([]) // 최근 뉴스 데이터 초기화
    refetchCompanyPriceList() // 차트 데이터 refetch
    handleAddLatestCompany() // 최근 조회 기업 등록 refetch
    refetchCompanyNewsList() // 최근 뉴스 조회 refetch
  }, [selectedStock])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <SlideBar />
      <s.Container>
        {companyList ? <StockTutorial /> : null}
        <s.SidebarWrap>
          {companyList && <SearchStocksSection data={companyList} />}
          <MyStocksSection
            data={companyLikeList}
            handleSubscribeCompany={handleSubscribeCompany}
            handleUnSubscribeCompany={handleUnSubscribeCompany}
          />
          <LatestStocksSection data={companyLatestList} />
        </s.SidebarWrap>
        <s.MainWrap>
          <MainTopSection
            handleAddMyStock={handleAddMyStock}
            handleRemoveMyStock={handleRemoveMyStock}
            handleSubscribeCompany={handleSubscribeCompany}
            handleUnSubscribeCompany={handleUnSubscribeCompany}
          />
          {isLoadingCompanyPriceList ? (
            <Loading />
          ) : (
            <>
              <StockPriceSection data={companyPriceList} />
              <StockChartSection initialData={companyPriceList} />
            </>
          )}
          <StockNewsSection />
        </s.MainWrap>
      </s.Container>
    </>
  )
}

export default StocksContainer
