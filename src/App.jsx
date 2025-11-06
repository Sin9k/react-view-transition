import { useState, startTransition, useCallback } from 'react'
import './App.css'

import { Item } from './Item';
import { ViewTransitionToggle } from './ViewTransitionToggle';

function App() {
  const [items, setItems] = useState([
    { id: 1, title: 'Task 1', status: 'todo', color: '#ff6b6b' },
    { id: 2, title: 'Task 2', status: 'todo', color: '#4ecdc4' },
    { id: 3, title: 'Task 3', status: 'todo', color: '#45b7d1' },
  ])
  const [nextId, setNextId] = useState(4)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [viewTransitionEnabled, setViewTransitionEnabled] = useState(true)

  const addItem = () => {
    startTransition(() => {
      setItems(prev => [...prev, { 
        id: nextId, 
        title: `Task ${nextId}`, 
        status: 'todo',
        color: `hsl(${Math.random() * 360}, 70%, 60%)`
      }])
      setNextId(prev => prev + 1)
    })
  }

  const removeItem = useCallback((id) => {
    startTransition(() => {
      setItems(prev => prev.filter(item => item.id !== id))
    })
  }, [])

  const toggleStatus = useCallback((id) => {
    startTransition(() => {
      setItems(prev => prev.map(item => 
        item.id === id 
          ? { ...item, status: item.status === 'todo' ? 'done' : 'todo' }
          : item
      ))
    })
  }, [])

  const toggleViewMode = () => {
    startTransition(() => {
      setViewMode(prev => prev === 'grid' ? 'list' : 'grid')
    })
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
          React ViewTransition Demo 🎨
        </h1>

      <ViewTransitionToggle 
        enabled={viewTransitionEnabled}
        onChange={setViewTransitionEnabled}
      />

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={addItem} style={{ padding: '0.75rem 1.5rem' }}>
          ➕ Add Task
        </button>
        <button onClick={toggleViewMode} style={{ padding: '0.75rem 1.5rem' }}>
          {viewMode === 'grid' ? '📋 List View' : '🎯 Grid View'}
        </button>
      </div>

        <div 
          className={`items-container ${viewMode}`}
          style={{
            display: viewMode === 'grid' ? 'grid' : 'flex',
            gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(200px, 1fr))' : '1fr',
            flexDirection: viewMode === 'list' ? 'column' : 'row',
            gap: '1rem',
          }}
        >
          {items.map(item => (
            <Item
              key={item.id}
              item={item}
              removeItem={removeItem}
              toggleStatus={toggleStatus}
              viewTransitionEnabled={viewTransitionEnabled}
            />
          ))}
        </div>
    </div>
  )
}


export default App
