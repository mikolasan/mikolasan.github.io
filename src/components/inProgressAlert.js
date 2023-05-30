import React from 'react'

export default function InProgressAlert() {
  return (
    <div className="__in_progress_alert">
      <img src="/developing.png" alt="smiling gear above the conveyor"/>
      <p>There is an ongoing investigation about this topic.
        This article will be properly formatted, thoughtfully completed, proofread and will be more pictures if you will.
        It shouldn&apos;t take long, but usually there are a few projects happening in parallel, 
        so you can track how I handle the load <a href="https://twitter.com/mikolasan">on Twitter</a>.</p>
    </div>
  )
}