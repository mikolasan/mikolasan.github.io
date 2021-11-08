import algoliasearch from "algoliasearch/lite"
import { createRef, default as React, useState, useMemo } from "react"
import { InstantSearch } from "react-instantsearch-dom"
import SearchBox from "./search-box"
import SearchResult from "./search-result"
import useClickOutside from "./use-click-outside"
import * as styles from "./search.module.css"

export default function Search({ indices }) {
  const rootRef = createRef()
  const [query, setQuery] = useState()
  const [hasFocus, setFocus] = useState(false)
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  )

  useClickOutside(rootRef, () => setFocus(false))

  return (
    <div className={styles.root}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <SearchBox 
          onFocus={() => setFocus(true)}
          className={[styles.box, hasFocus && styles.hasfocus || ''].join(' ')}
        />
        <SearchResult
          indices={indices}
          className={[styles.result, (query && query.length > 0 && hasFocus) && styles.show || ''].join(' ')}
        />
      </InstantSearch>
    </div>
  )
}