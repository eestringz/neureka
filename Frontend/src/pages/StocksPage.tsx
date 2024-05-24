import StocksContainer from '@src/containers/StocksContainer'
import TokenChecker from '@src/utils/TokenChecker'

const StocksPage = () => {
  return (
    <>
      <TokenChecker />
      <StocksContainer />
    </>
  )
}

export default StocksPage
