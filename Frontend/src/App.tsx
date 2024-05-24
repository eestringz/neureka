import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import GlobalStyle from '@src/GlobalStyle'
import MainPage from '@src/pages/MainPage'
import Navbar from '@src/common/Navbar'
import NewsPage from '@src/pages/NewsPage'
import NewsDetailPage from '@src/pages/NewsDetailPage'
import StocksPage from '@src/pages/StocksPage'
import Footer from '@src/common/Footer'
import MyPage from './pages/MyPage'
import DictionaryPage from './pages/DictionaryPage'

import { QueryClient, QueryClientProvider } from 'react-query'
import AuthModal from './common/Auth/AuthModal'
import { CookiesProvider } from 'react-cookie'
import JSConfetti from 'js-confetti'
import { useAtomValue } from 'jotai'
import { isLoginAtom } from './stores/authAtom'

const queryClient = new QueryClient()
export const confetti = new JSConfetti()

function App() {
  const isLogin = useAtomValue(isLoginAtom)
  return (
    <>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <BrowserRouter>
            <Navbar />
            <AuthModal />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/newsdetail/:id" element={<NewsDetailPage />} />
              <Route path="/stocks" element={<StocksPage />} />
              <Route
                path="/mypage"
                element={isLogin ? <MyPage /> : <Navigate replace to="/" />}
              />
              <Route path="/dictionary" element={<DictionaryPage />} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </QueryClientProvider>
      </CookiesProvider>
    </>
  )
}

export default App
