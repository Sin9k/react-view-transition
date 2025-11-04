# View Transition Псевдоэлементы - Подробное объяснение

## Что происходит при View Transition?

Когда браузер выполняет view transition, он делает следующее:

1. **Создает снимок** старого состояния (`::view-transition-old`)
2. **Применяет изменения** к DOM
3. **Создает снимок** нового состояния (`::view-transition-new`)
4. **Анимирует переход** между двумя снимками

## Иерархия псевдоэлементов

```
::view-transition
│
└─── ::view-transition-group(name)
     │
     └─── ::view-transition-image-pair(name)
          │
          ├─── ::view-transition-old(name)  ← СТАРОЕ состояние
          │
          └─── ::view-transition-new(name)  ← НОВОЕ состояние
```

---

## 🎯 `::view-transition-old(name)`

### Описание
Это **снимок элемента ДО изменения**. Браузер делает "фотографию" элемента перед тем, как изменения произойдут.

### Когда создается?

#### 1. **Удаление элемента**
```jsx
// Нажимаем кнопку "❌"
removeItem(id)
```
- ✅ Создается `::view-transition-old(item-1)` (снимок удаляемого элемента)
- ❌ НЕ создается `::view-transition-new` (элемента больше нет)

#### 2. **Изменение элемента**
```jsx
// Меняем статус с "todo" на "done"
toggleStatus(id)
```
- ✅ Создается `::view-transition-old(item-1)` (элемент с статусом "todo")
- ✅ Создается `::view-transition-new(item-1)` (элемент с статусом "done")

#### 3. **Перемещение элемента**
```jsx
// Переключаем Grid → List
toggleViewMode()
```
- ✅ Создается `::view-transition-old(item-1)` (элемент в старой позиции Grid)
- ✅ Создается `::view-transition-new(item-1)` (элемент в новой позиции List)

### CSS Стилизация

```css
/* Базовый пример */
::view-transition-old(item-*) {
  animation: fade-out 300ms ease-out;
}

/* С дополнительными свойствами */
::view-transition-old(item-*) {
  animation: slide-out 300ms ease-out;
  opacity: 1;
  transform-origin: center;
  mix-blend-mode: normal;
}

/* Можно использовать любые CSS свойства для анимации */
@keyframes fade-out {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0);
  }
  to {
    opacity: 0;
    transform: scale(0.8) translateY(-20px);
    filter: blur(4px);
  }
}
```

---

## 🎯 `::view-transition-new(name)`

### Описание
Это **снимок элемента ПОСЛЕ изменения**. Браузер делает "фотографию" элемента в новом состоянии.

### Когда создается?

#### 1. **Добавление элемента**
```jsx
// Нажимаем кнопку "➕ Add Task"
addItem()
```
- ❌ НЕ создается `::view-transition-old` (элемента раньше не было)
- ✅ Создается `::view-transition-new(item-4)` (снимок нового элемента)

#### 2. **Изменение элемента**
```jsx
// Меняем статус с "todo" на "done"
toggleStatus(id)
```
- ✅ Создается `::view-transition-old(item-1)` (было: "todo")
- ✅ Создается `::view-transition-new(item-1)` (стало: "done")

#### 3. **Перемещение элемента**
```jsx
// Переключаем Grid → List
toggleViewMode()
```
- ✅ Создается `::view-transition-old(item-1)` (старая позиция)
- ✅ Создается `::view-transition-new(item-1)` (новая позиция)

### CSS Стилизация

```css
/* Базовый пример */
::view-transition-new(item-*) {
  animation: fade-in 300ms ease-in;
}

/* С дополнительными свойствами */
::view-transition-new(item-*) {
  animation: slide-in 300ms ease-in;
  opacity: 0;
  transform-origin: center;
  mix-blend-mode: normal;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0);
  }
}
```

---

## 📊 Таблица: Когда что создается

| Действие | `::view-transition-old` | `::view-transition-new` | Описание |
|----------|------------------------|------------------------|----------|
| ➕ **Добавление** | ❌ Нет | ✅ Есть | Только новый снимок |
| ❌ **Удаление** | ✅ Есть | ❌ Нет | Только старый снимок |
| 🔄 **Изменение** | ✅ Есть | ✅ Есть | Оба снимка (crossfade) |
| 📦 **Перемещение** | ✅ Есть | ✅ Есть | Оба снимка (move) |

---

## 🎨 Практические примеры

### Пример 1: Разные анимации для разных действий

```css
/* Удаление - исчезает вверх */
::view-transition-old(item-*) {
  animation: exit-up 300ms ease-out;
}

/* Добавление - появляется снизу */
::view-transition-new(item-*) {
  animation: enter-from-bottom 300ms ease-in;
}

@keyframes exit-up {
  to { 
    opacity: 0;
    transform: translateY(-50px) scale(0.5);
  }
}

@keyframes enter-from-bottom {
  from { 
    opacity: 0;
    transform: translateY(50px) scale(0.5);
  }
}
```

### Пример 2: Эффект размытия при переходе

```css
::view-transition-old(container) {
  animation: blur-out 400ms ease-out;
}

::view-transition-new(container) {
  animation: blur-in 400ms ease-in;
}

@keyframes blur-out {
  from {
    opacity: 1;
    filter: blur(0px);
  }
  to {
    opacity: 0;
    filter: blur(20px);
  }
}

@keyframes blur-in {
  from {
    opacity: 0;
    filter: blur(20px);
  }
  to {
    opacity: 1;
    filter: blur(0px);
  }
}
```

### Пример 3: 3D эффект флипа

```css
::view-transition-old(card) {
  animation: flip-out 600ms ease-in;
  backface-visibility: hidden;
}

::view-transition-new(card) {
  animation: flip-in 600ms ease-out;
  backface-visibility: hidden;
}

@keyframes flip-out {
  from {
    transform: rotateY(0deg);
    opacity: 1;
  }
  to {
    transform: rotateY(90deg);
    opacity: 0;
  }
}

@keyframes flip-in {
  from {
    transform: rotateY(-90deg);
    opacity: 0;
  }
  to {
    transform: rotateY(0deg);
    opacity: 1;
  }
}
```

### Пример 4: Эффект "взрыва"

```css
::view-transition-old(item-*) {
  animation: explode 500ms cubic-bezier(0.36, 0, 0.66, -0.56);
}

@keyframes explode {
  0% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.5) rotate(180deg);
  }
  100% {
    opacity: 0;
    transform: scale(0) rotate(360deg);
  }
}
```

---

## 🔍 Отладка View Transitions

### Chrome DevTools
1. Откройте DevTools (F12)
2. Перейдите в **Elements** → **Computed**
3. Включите "Show all" чтобы увидеть псевдоэлементы
4. Найдите `::view-transition-*` элементы

### Консоль браузера
Откройте консоль и смотрите логи из вашего примера:
```javascript
onEnter={(instance, types) => {
  console.log('Element entered:', instance.name, types)
}}
```

---

## ⚠️ Важные моменты

### 1. Wildcard selector `*`
```css
/* Применяется ко всем элементам с именем начинающимся на "item-" */
::view-transition-old(item-*)

/* Эквивалентно */
::view-transition-old(item-1)
::view-transition-old(item-2)
::view-transition-old(item-3)
```

### 2. Порядок наложения
По умолчанию:
- `::view-transition-old` находится **под** `::view-transition-new`
- Можно изменить через `z-index` на `::view-transition-group`

### 3. Производительность
- Браузер создает **растровые изображения** (snapshots)
- Анимируются только `opacity` и `transform` (GPU-ускоренные)
- Другие свойства работают, но медленнее

### 4. Когда НЕ создаются снимки
- Если элемент `display: none`
- Если элемент `visibility: hidden`
- Если не используется `startTransition`

---

## 🚀 Продвинутые техники

### Условные анимации по типу перехода

```css
/* Разные анимации для разных типов */
::view-transition-old(item-*):only-child {
  /* Применяется только при удалении (нет new) */
  animation: delete-animation 300ms;
}

::view-transition-new(item-*):only-child {
  /* Применяется только при добавлении (нет old) */
  animation: add-animation 300ms;
}
```

### Анимация с задержкой

```css
::view-transition-old(item-*) {
  animation: fade-out 300ms ease-out;
  animation-delay: 100ms;
}

::view-transition-new(item-*) {
  animation: fade-in 300ms ease-in;
  animation-delay: 200ms; /* Новый появляется после старого */
}
```

---

## 📚 Дополнительные ресурсы

- [MDN: View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)
- [Chrome Developers: Smooth transitions](https://developer.chrome.com/docs/web-platform/view-transitions/)
- [React Documentation: ViewTransition](https://react.dev/reference/react/ViewTransition)

---

## 🎓 Резюме

| Псевдоэлемент | Когда | Использование |
|---------------|-------|---------------|
| `::view-transition-old` | До изменения | Анимация выхода/исчезновения |
| `::view-transition-new` | После изменения | Анимация входа/появления |
| Оба вместе | При изменении | Crossfade, morph, перемещение |

**Главное правило**: `old` уходит, `new` появляется, вместе они создают плавный переход! 🎨

