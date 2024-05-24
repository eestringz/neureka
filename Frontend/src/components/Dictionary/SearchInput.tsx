import React, { useState } from 'react'

import * as s from '@src/components/styles/Dictionary/SearchInputStyle'

type Props = {
  search: boolean
  setSearch: (search: boolean) => void
  question: string | null
  setQuestion: (question: string | null) => void
}

const SearchInput = ({ search, setSearch, question, setQuestion }: Props) => {
  const [content, SetContent] = useState('')

  const clearSearch = () => {
    setSearch(false)
    SetContent('')
    setQuestion(null)
  }

  const goSearch = () => {
    setSearch(true)
    setQuestion(content)
  }

  const goSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSearch(true)
    setQuestion(content)
  }

  return (
    <s.SearchBox>
      <s.SearchBar onSubmit={goSubmit} className="searchBar">
        <s.SearchInput
          value={content}
          onChange={event => SetContent(event.target.value)}
        />
        {search ? (
          <s.ClearButton onClick={clearSearch} />
        ) : (
          <s.SearchButton onClick={goSearch} />
        )}
      </s.SearchBar>
    </s.SearchBox>
  )
}

export default SearchInput
