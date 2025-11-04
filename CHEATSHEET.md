# ViewTransition Шпаргалка ⚡

## Быстрый старт

```jsx
import { ViewTransition, startTransition } from 'react'

// ✅ Правильно - с startTransition
const handleClick = () => {
  startTransition(() => {
    setState(newValue)
  })
}

// ❌ Неправильно - без startTransition
const handleClick = () => {
  setState(newValue) // ViewTransition не сработает!
}
```

## Базовое использование

```jsx
<ViewTransition name="unique-name">
  <div>Content</div>
</ViewTransition>
```

## Props

| Prop | Тип | Описание |
|------|-----|----------|
| `name` | `string` | Уникальное имя (default: "auto") |
| `children` | `ReactNode` | Содержимое |
| `enter` | `ViewTransitionClass` | Классы CSS при появлении |
| `exit` | `ViewTransitionClass` | Классы CSS при исчезновении |
| `share` | `ViewTransitionClass` | Классы CSS при перемещении |
| `update` | `ViewTransitionClass` | Классы CSS при обновлении |
| `onEnter` | `(instance, types) => void` | Коллбэк при появлении |
| `onExit` | `(instance, types) => void` | Коллбэк при исчезновении |
| `onShare` | `(instance, types) => void` | Коллбэк при перемещении |
| `onUpdate` | `(instance, types) => void` | Коллбэк при обновлении |
| `ref` | `Ref` | React ref |

## CSS Псевдоэлементы

### Иерархия
```
::view-transition
  └─ ::view-transition-group(name)
      └─ ::view-transition-image-pair(name)
          ├─ ::view-transition-old(name)  ← Старое состояние
          └─ ::view-transition-new(name)  ← Новое состояние
```

### Базовые стили

```css
/* Элемент исчезает */
::view-transition-old(my-element) {
  animation: fade-out 300ms ease-out;
}

/* Элемент появляется */
::view-transition-new(my-element) {
  animation: fade-in 300ms ease-in;
}

@keyframes fade-out {
  to { opacity: 0; }
}

@keyframes fade-in {
  from { opacity: 0; }
}
```

## Wildcard селектор

```css
/* Применяется ко всем элементам вида item-1, item-2, item-3 */
::view-transition-old(item-*)
::view-transition-new(item-*)
```

## Популярные анимации

### Fade + Scale
```css
::view-transition-old(element) {
  animation: scale-out 300ms ease-out;
}
@keyframes scale-out {
  to { 
    opacity: 0;
    transform: scale(0.8);
  }
}
```

### Slide
```css
::view-transition-new(element) {
  animation: slide-in 300ms ease-in;
}
@keyframes slide-in {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
}
```

### Rotate
```css
::view-transition-old(element) {
  animation: rotate-out 500ms ease-out;
}
@keyframes rotate-out {
  to { 
    opacity: 0;
    transform: rotate(90deg) scale(0.5);
  }
}
```

### Blur
```css
::view-transition-old(element) {
  animation: blur-out 400ms ease-out;
}
@keyframes blur-out {
  to { 
    opacity: 0;
    filter: blur(10px);
  }
}
```

## Когда создаются снимки

| Действие | old | new |
|----------|-----|-----|
| Добавление | ❌ | ✅ |
| Удаление | ✅ | ❌ |
| Изменение | ✅ | ✅ |
| Перемещение | ✅ | ✅ |

## Примеры из реального кода

### Список элементов
```jsx
{items.map(item => (
  <ViewTransition key={item.id} name={`item-${item.id}`}>
    <div>{item.title}</div>
  </ViewTransition>
))}
```

```css
::view-transition-old(item-*) {
  animation: item-exit 300ms;
}
::view-transition-new(item-*) {
  animation: item-enter 300ms;
}
```

### Модальное окно
```jsx
{isOpen && (
  <ViewTransition name="modal">
    <Modal />
  </ViewTransition>
)}
```

```css
::view-transition-new(modal) {
  animation: modal-enter 300ms ease-out;
}
@keyframes modal-enter {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
}
```

### Табы
```jsx
<ViewTransition name="tab-content">
  {activeTab === 'home' && <HomeTab />}
  {activeTab === 'profile' && <ProfileTab />}
</ViewTransition>
```

### Карточки
```jsx
<ViewTransition 
  name={`card-${id}`}
  onEnter={(instance) => console.log('Card appeared!')}
>
  <Card />
</ViewTransition>
```

## Отладка

### Проверка поддержки браузера
```javascript
if ('startViewTransition' in document) {
  console.log('✅ View Transitions supported')
} else {
  console.log('❌ Not supported')
}
```

### Логирование переходов
```jsx
<ViewTransition 
  name="element"
  onEnter={(instance, types) => {
    console.log('Entered:', instance.name, types)
  }}
  onExit={(instance, types) => {
    console.log('Exited:', instance.name, types)
  }}
>
```

### Chrome DevTools
1. F12 → Elements
2. Computed → Show all
3. Найдите `::view-transition-*`

## Производительность

### ✅ Быстрые свойства (GPU)
- `opacity`
- `transform`

### ⚠️ Медленные свойства
- `width`, `height`
- `background`
- `color`

## Частые ошибки

### ❌ Забыли startTransition
```jsx
// НЕ РАБОТАЕТ
setState(newValue)
```

### ✅ С startTransition
```jsx
// РАБОТАЕТ
startTransition(() => {
  setState(newValue)
})
```

### ❌ Одинаковые имена
```jsx
// КОНФЛИКТ! Два элемента с одним именем
<ViewTransition name="item">...</ViewTransition>
<ViewTransition name="item">...</ViewTransition>
```

### ✅ Уникальные имена
```jsx
<ViewTransition name="item-1">...</ViewTransition>
<ViewTransition name="item-2">...</ViewTransition>
```

## Поддержка браузеров

| Браузер | Минимальная версия |
|---------|-------------------|
| Chrome | 111+ ✅ |
| Edge | 111+ ✅ |
| Safari | 18+ ✅ |
| Firefox | ⏳ В разработке |

## Полезные ссылки

- [React Docs](https://react.dev/reference/react/ViewTransition)
- [MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)
- [Chrome Guide](https://developer.chrome.com/docs/web-platform/view-transitions/)

---

**Копируйте примеры и адаптируйте под свои задачи!** 🚀

