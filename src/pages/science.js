import React from "react"
import Layout from "../components/layout"

const SciencePage = () => (
  <Layout>
    <h1>Наука</h1>
    <h2>Нейрон</h2>
    <p>Математики и нейробиологи не первый год ищут подходы к созданию интелектуальной машины,
        способной обучаться и самостоятельно делать прогнозы и принимать решения.
        Наиболее распространенными системами, используемыми в исследованиях, обязательно перечисляющихся
        в монографиях об искусственном интеллекте, являются нейронные и байесовы сети.
        Розенблатт в своей книге отмечает, что &#171;рассмотрение проблем, связанных с механизмом памяти,
        не может быть отделено от рассмотрения того, что именно запоминается, и поэтому перцептрон стал
        моделью некоторой более общей познающей системы, которая включает в себя как память, так и восприятие&#187;.
    </p>

    <h2>Одобряющие закономерности</h2>
    <a href="https://sourceforge.net/projects/boonrules/"><img src="images/user-images/app-2.jpg" alt="Boon Rules"/></a>
    <p>
        Е.Е. Витяев разработал метод классификации, основанный на семантическом вероятностном выводе.
        Метод, который не хранит объекты, но извлекает из них важную информацию достаточную для восстановления этих объектов.
        В этом состоит первое принципиальное отличие активного восприятия:
        &#171;Кроме воспроизводящей деятельности, легко в поведении человека заметить и другой род этой деятельности,
        именно деятельность комбинирующую или творческую&#187;.
    </p>
  </Layout>
)

export default SciencePage