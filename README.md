# RSSchool

## Perfomance

# Отчет о производительности

---

## Тестируемая операция

**Ввод текста в поле поиска: "A"**

- **Commit Duration**: 2.3 с
- **Render Duration**: 8.8 мс
- **Время рендеринга компонентов**:
  - `App`: <0.1 мс
  - `Search`: 0.2 мс
  - `CardList`: 8.6 мс
  - `Cards`: <0.1 – 0.2 мс

## Графики профилирования

- **Flame Graph**:
  ![Flame Graph](./src/assets/before/flame1.png)

- **Ranked Chart**:
  ![Ranked Chart](./src/assets/before/ranked1.png)

---

## Тестируемая операция

**Ввод текста в поле поиска: "AS"**

- **Commit Duration**: 5.7 с
- **Render Duration**: 0.6 мс
- **Время рендеринга компонентов**:
  - `App`: 0.1 мс
  - `Search`: <0.1 мс
  - `CardList`: 0.4 мс
  - `Cards`: <0.1 – 0.1 мс

## Графики профилирования

- **Flame Graph**:
  ![Flame Graph](./src/assets/before/flame2.png)

- **Ranked Chart**:
  ![Ranked Chart](./src/assets/before/ranked2.png)

---

## Тестируемая операция

**Ввод текста в поле поиска: "ASD"**

- **Commit Duration**: 7.7 с
- **Render Duration**: 1 мс
- **Время рендеринга компонентов**:
  - `App`: 0.3 мс
  - `Search`: 0.4 мс
  - `CardList`: 0.3 мс
  - `Cards`: <0.1 – 0.1 мс

## Графики профилирования

- **Flame Graph**:
  ![Flame Graph](./src/assets/before/flame3.png)

- **Ranked Chart**:
  ![Ranked Chart](./src/assets/before/ranked3.png)

---

## Тестируемая операция

**Фильтрация по региону: All → Americans**

- **Commit Duration**: 11.2 с
- **Render Duration**: 15.1 мс
- **Время рендеринга компонентов**:
  - `App`: 0.1 мс
  - `Search`: 0.2 мс
  - `CardList`: 14.8 мс
  - `Cards`: <0.1 – 0.5 мс

## Графики профилирования

- **Flame Graph**:
  ![Flame Graph](./src/assets/before/flame4.png)

- **Ranked Chart**:
  ![Ranked Chart](./src/assets/before/ranked4.png)

---

## Тестируемая операция

**Сортировка по имени (ASC)**

- **Commit Duration**: 14.1 с
- **Render Duration**: 5.4 мс
- **Время рендеринга компонентов**:
  - `App`: 0.1 мс
  - `Search`: 0.2 мс
  - `CardList`: 5.1 мс
  - `Cards`: <0.1 – 0.2 мс

## Графики профилирования

- **Flame Graph**:
  ![Flame Graph](./src/assets/before/flame5.png)

- **Ranked Chart**:
  ![Ranked Chart](./src/assets/before/ranked5.png)

---

## Тестируемая операция

**Сортировка по населению (DESC)**

- **Commit Duration**: 17.7 с
- **Render Duration**: 3 мс
- **Время рендеринга компонентов**:

  - `App`: <0.1 мс
  - `Search`: 0.2 мс
  - `CardList`: 2.8 мс
  - `Cards`: 0.1 мс

  ## Графики профилирования

- **Flame Graph**:
  ![Flame Graph](./src/assets/before/flame6.png)

- **Ranked Chart**:
  ![Ranked Chart](./src/assets/before/ranked6.png)



# Отчет об улучшении производительности(memo, UseMemo, UseCallback)

---

## Тестируемая операция

**Ввод текста в поле поиска: "A"**

- **Commit Duration**: 1.5 с
- **Render Duration**: 2 мс
- **Время рендеринга компонентов**:
  - `App`: 0.5 мс
  - `Search`: 0.5 мс
  - `CardList`: 1 мс
  - `Cards`: Memo

## Графики профилирования

- **Flame Graph**:
  ![Flame Graph](./src/assets/after/flame1up.png)

- **Ranked Chart**:
  ![Ranked Chart](./src/assets/after/ranked1up.png)

---

## Тестируемая операция

**Ввод текста в поле поиска: "AS"**

- **Commit Duration**: 2.2 с
- **Render Duration**: 1.3 мс
- **Время рендеринга компонентов**:
  - `App`: 0.4 мс
  - `Search`: 0.6 мс
  - `CardList`: 0.3 мс
  - `Cards`: Memo

## Графики профилирования

- **Flame Graph**:
  ![Flame Graph](./src/assets/after/flame2up.png/)

- **Ranked Chart**:
  ![Ranked Chart](./src/assets/after/ranked2up.png)

---

## Тестируемая операция

**Ввод текста в поле поиска: "ASD"**

- **Commit Duration**: 3.1 с
- **Render Duration**: 1.9 мс
- **Время рендеринга компонентов**:
  - `App`: 0.8 мс
  - `Search`: 0.6 мс
  - `CardList`: 0.4 мс
  - `Cards`: Memo

## Графики профилирования

- **Flame Graph**:
  ![Flame Graph](./src/assets/after/flame3up.png)

- **Ranked Chart**:
  ![Ranked Chart](./src/assets/after/ranked3up.png)

---

## Тестируемая операция

**Фильтрация по региону: All → Americans**

- **Commit Duration**: 5.1 с
- **Render Duration**: 11.4 мс
- **Время рендеринга компонентов**:
  - `App`: 0.2 мс
  - `Search`: 0.2 мс
  - `CardList`: 11 мс
  - `Cards`: Memo

## Графики профилирования

- **Flame Graph**:
  ![Flame Graph](./src/assets/after/flame4up.png)

- **Ranked Chart**:
  ![Ranked Chart](./src/assets/after/ranked4up.png)

---

## Тестируемая операция

**Сортировка по имени (ASC)**

- **Commit Duration**: 9.5 с
- **Render Duration**: 2.4 мс
- **Время рендеринга компонентов**:
  - `App`: 1 мс
  - `Search`: 0.8 мс
  - `CardList`: 0.6 мс
  - `Cards`: Memo

## Графики профилирования

- **Flame Graph**:
  ![Flame Graph](./src/assets/after/flame5up.png)

- **Ranked Chart**:
  ![Ranked Chart](./src/assets/after/ranked5up.png)

---

## Тестируемая операция

**Сортировка по населению (DESC)**

- **Commit Duration**: 11.9 с
- **Render Duration**: 1.2 мс
- **Время рендеринга компонентов**:

  - `App`: 0.2 мс
  - `Search`: 0.5 мс
  - `CardList`: 0.4 мс
  - `Cards`: Memo

  ## Графики профилирования

- **Flame Graph**:
  ![Flame Graph](./src/assets/after/flame6up.png)

- **Ranked Chart**:
  ![Ranked Chart](./src/assets/after/ranked6up.png)
