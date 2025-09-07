import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import BlogTitle from './pages/Dashboard/BlogTitle'
import WriteArticle from './pages/Dashboard/WriteArticle'
import ReviewResume from './pages/Dashboard/ReviewResume'
import RemoveObject from './pages/Dashboard/RemoveObject'
import RemoveBackground from './pages/Dashboard/RemoveBackground'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
         <Route path="/" element={<div>Home Page</div>} />
         <Route path='ai' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="blog-titles" element={<BlogTitle />} />
            <Route path="write-article" element={<WriteArticle />} />
            <Route path="remove-background" element={<RemoveBackground />} />
            <Route path="remove-object" element={<RemoveObject />} />
            <Route path="review-resume" element={<ReviewResume />} />
              
         </Route>
      </Routes>
    </div>
  )
}

export default App
