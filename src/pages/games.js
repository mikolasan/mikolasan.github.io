import React from "react"
import Layout from "../components/layout"

const GamesPage = () => (
  <Layout>
    <h1 class="section-title">Игры</h1>
    <h2>Судоку 16х16</h2>
    <a href="#"><img src="images/user-images/app-3.jpg" alt="Sudoku 16x16"/></a>
    <p>
      И вот одним вечером моя вторая половина заявляет, что на Play Store нет нормального судоку размером 16х16.
      Я говорю, что если найти любой проект на github под android, то сделать его под желаемые требования не займёт больше двух вечеров.
      Надо сказать, что с тех пор прошло месяца три.
    </p>
  </Layout>
)

export default GamesPage
