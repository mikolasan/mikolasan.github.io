import React from 'react'

export default function DraftAlert({ linkPath }) {
  const alertAboutDraftStatus = `This article is not finished and not reviewed thoroughly.
    If for some reason you want to continue reading, do it at your own risk, 
    but do not forget to come back later to enjoy the final version.`
  return (
    <div className="draftalert">
      <img src="/draft.png" alt="Drawing a whale with a pencil in sketch book"/>
      <p>{alertAboutDraftStatus}</p>
    </div>
  )
}