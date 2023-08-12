import algoliasearch from "algoliasearch/lite"
import { default as React, useRef, useState, useMemo } from "react"
import { InstantSearch } from "react-instantsearch-dom"
import SearchBox from "./search-box"
import SearchResult from "./search-result"
import useClickOutside from "./use-click-outside"
import * as styles from "./index.module.css"

export default function Search({ indices, language }) {
  const rootRef = useRef(null)
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
    <div ref={rootRef} className={["search", "language-" + language, styles.root].join(' ')}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <SearchBox 
          onFocus={() => setFocus(true)}
          className={styles.box}
        />
        <SearchResult
          indices={indices}
          className={[styles.result, (query && query.length > 0 && hasFocus) && styles.show || ''].join(' ')}
        />
      </InstantSearch>
    </div>
  )
}