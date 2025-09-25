import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import BlogTitle from './pages/Dashboard/BlogTitle'
import WriteArticle from './pages/Dashboard/WriteArticle'
import ReviewResume from './pages/Dashboard/ReviewResume'
import RemoveObject from './pages/Dashboard/RemoveObject'
import RemoveBackground from './pages/Dashboard/RemoveBackground'
import Home from './pages/Home.jsx'
import Layout from './pages/Layout.jsx'
import GenerateImages from './pages/Dashboard/GenerateImages.jsx'
import Community from './pages/Dashboard/Community.jsx'
import {Toaster} from 'react-hot-toast'

function App() {

  return (
    <div>
      <Toaster /> 
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path='/ai' element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="blog-titles" element={<BlogTitle />} />
            <Route path="write-article" element={<WriteArticle />} />
            <Route path="generate-images" element={<GenerateImages />} />
            <Route path="remove-background" element={<RemoveBackground />} />
            <Route path="remove-object" element={<RemoveObject />} />
            <Route path="review-resume" element={<ReviewResume />} />
            <Route path="community" element={<Community />} />
         </Route>
      </Routes>
    </div>
  )
}

export default App
