import { useState } from 'react'

function NewFactForm({ setFacts, setShowForm, categories }) {
  const [text, setText] = useState('')
  const [source, setSource] = useState('')
  const [category, setCategory] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const textLength = text.length

  function isValidHttpUrl(string) {
    let url
    try {
      url = new URL(string)
    } catch (error) {
      return false
    }

    return url.protocol === 'http:' || url.protocol === 'https:'
  }

  async function postHandler(event) {
    // prevent browser from reloading
    event.preventDefault()

    // Check if data valid. if so create new fact
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      console.log('data is valid')

      // upload fact to supabase and receive the new fact object
      setIsUploading(true)
      const { data: newFact, error } = await supabase
        .from('facts')
        .insert([{ text, source, category }])
        .select()
      setIsUploading(false)

      // add the new fact to the UI : add the fact to state
      if (!error) setFacts((facts) => [newFact[0], ...facts])

      // clear form
      setText('')
      setSource('')
      setCategory('')

      // close form
      setShowForm(false)
    }
  }

  return (
    <form className='form' onSubmit={postHandler}>
      <input
        type='text'
        placeholder='Share a fact with the world...'
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        type='text'
        placeholder='Thrustworthy Spurce...'
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        name='category'
        id='category'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}>
        <option value=''>Select a category:</option>
        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className='btn btn-large' type='submit'>
        Post
      </button>
    </form>
  )
}

export default NewFactForm
