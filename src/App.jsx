import { useEffect, useState } from 'react'

import './App.css'
import supabase from './supabase'

import Loader from './components/Loader'
import Header from './components/Header'
import CategoryFilter from './components/CategoryFilter'
import NewFactForm from './components/NewFactForm'
import FactList from './components/FactList'

const CATEGORIES = [
  { name: 'technology', color: '#3b82f6' },
  { name: 'science', color: '#16a34a' },
  { name: 'finance', color: '#ef4444' },
  { name: 'society', color: '#eab308' },
  { name: 'entertainment', color: '#db2777' },
  { name: 'health', color: '#14b8a6' },
  { name: 'history', color: '#f97316' },
  { name: 'news', color: '#8b5cf6' },
]

function App() {
  const [showForm, setShowForm] = useState(false)
  const [facts, setFacts] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [category, setCurrentCategory] = useState('all')

  useEffect(
    function () {
      async function getFacts() {
        setLoading(true)

        let query = supabase.from('facts').select('*')
        if (category !== 'all') query = query.eq('category', category)

        let { data: facts, error } = await query.order('text', { ascending: true }).limit(20)

        if (!error) setFacts(facts)
        else alert('There was a problem getting data')
        setLoading(false)
      }
      getFacts()
    },
    [category]
  )

  function formHandler() {
    setShowForm(!showForm)
  }

  return (
    <>
      <Header showForm={showForm} handleOpenForm={formHandler} />

      {showForm ? (
        <NewFactForm categories={CATEGORIES} setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}
      <main className='main'>
        <CategoryFilter setCurrentCategory={setCurrentCategory} categories={CATEGORIES} />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList categories={CATEGORIES} facts={facts} setFacts={setFacts} />
        )}
      </main>
    </>
  )
}

export default App
