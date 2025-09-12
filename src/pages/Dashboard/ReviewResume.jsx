
import React from 'react'
import { Edit, Eraser, FileText, Hash, Sparkles } from 'lucide-react';

const ReviewResume = () => {

 const [input, setInput] = React.useState('');

 const onSubmitHandler = (e) => {
  e.preventDefault(); 
 }
  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start gap-4 text-slate-700'>
      {/* Left col */}
      <form onSubmit={onSubmitHandler} className='w-full  max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          {/* Replace with your Sparkles icon if available */}
          <Sparkles className='w-6 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Resume Review</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload Image</p>
        <input
          type="file"
          accept='application/pdf'
          onChange={(e) => setInput(e.target.files[0])}
          className='w-full p-2 rounded-md border border-gray-300'
          placeholder="intelligence is..."
          required
        />
        <p className='mt-4 text-sm font-medium'>supports <span className='font-semibold'>PDF format</span></p>
        <br />
        <button type="submit" className='mt-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition w-full flex items-center justify-center'> <FileText className="w-5" />Review Resume</button>
      </form>
 
      {/* Right col */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <Edit className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Analysis Results</h1>
        </div>
        <div className=' flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
            <FileText className='w-9 h-9' />
            <p>Upload a resume and click "Review Resume" to get started</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewResume