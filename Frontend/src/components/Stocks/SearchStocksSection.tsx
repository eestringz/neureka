import React, { useState } from 'react'
import { useAtom } from 'jotai'
import { CompanyType } from '@src/types/CompanyType'
import { selectedCompanyAtom } from '@src/stores/stockAtom'
import * as s from '@src/components/styles/Stocks/SearchStocksSectionStyle'

const SearchStocksSection = (props: { data: CompanyType[] }) => {
  const { data } = props // 종목 전체 리스트

  const [searchBy, setSearchBy] = useState<string>('name') // select 분류
  const [searchTerm, setSearchTerm] = useState<string>('') // 검색어 입력
  const [showDropdown, setShowDropdown] = useState<boolean>(false) // 필터링 결과 드롭다운 여부
  const [, setSelectedStock] = useAtom(selectedCompanyAtom) // select 한 종목

  const handleSearchByChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSearchBy(event.target.value)
  }

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchTerm(event.target.value)
    setShowDropdown(true)
  }

  const handleSelectStock = (stock: CompanyType) => {
    setSelectedStock(stock)
    setSearchTerm(stock.companyName)
    setShowDropdown(false)
  }

  const filteredStocks = data.filter(stock =>
    searchBy === 'name'
      ? stock.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      : stock.code.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <s.Container>
      <s.Title>Search</s.Title>
      <s.Wrap>
        <s.SelectBox
          className="selectNorm"
          value={searchBy}
          onChange={handleSearchByChange}
        >
          <option value="name">종목명</option>
          <option value="code">종목코드</option>
        </s.SelectBox>
        <s.SearchBox className="search">
          <s.SearchInput
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <s.SearchIcon onClick={() => setShowDropdown(true)} />
        </s.SearchBox>
        {showDropdown && (
          <s.ResultWrap>
            {filteredStocks.length === 0 && searchTerm.trim() !== '' ? (
              <s.ResultItem>
                <span>검색어가 없습니다.</span>
              </s.ResultItem>
            ) : (
              filteredStocks.map(stock => (
                <s.ResultItem
                  key={stock.code}
                  onClick={() => handleSelectStock(stock)}
                >
                  <span>
                    {stock.companyName} ({stock.code})
                  </span>
                  <s.ArrowIcon />
                </s.ResultItem>
              ))
            )}
          </s.ResultWrap>
        )}
      </s.Wrap>
    </s.Container>
  )
}

export default SearchStocksSection
