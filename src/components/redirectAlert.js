import React from 'react'

export default function RedirectAlert({ linkPath }) {
  const alertMessage = (
    <p>Just for SEO purposes I keep this page. But I found a proper location for this content,
      so you should go to <a href={linkPath}>its current location</a>.
    </p>
  )
  return (
    <div className="draftalert">
      {alertMessage}
    </div>
  )
}