import React from "react"
import Search from "./search"
const searchIndices = [{ name: `Pages`, title: `Pages` }]

export default function AllPagesSearch() {
  return <Search indices={searchIndices} />
}
