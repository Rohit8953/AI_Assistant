import { Edit, Eraser, Scissors } from 'lucide-react';
import React from 'react';

const RemoveObject = () => {

   const blogCategories = [
    'General', 'Technology', 'Health', 'Finance', 'Travel', 'Food', 'Lifestyle', 'Education', 'Entertainment', 'Business'
   ];

 const [selectedCategory, setSelectedCategory] = React.useState(blogCategories[0]);
 const [input, setInput] = React.useState('');
 const [object, setObject] = React.useState('');

 const onSubmitHandler = (e) => {
  e.preventDefault(); 
 }
  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start gap-4 text-slate-700'>
      {/* Left col */}
      <form onSubmit={onSubmitHandler} className='w-full  max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          {/* Replace with your Sparkles icon if available */}
          <span className='w-6 text-[#4A7AFF]'>✨</span>
          <h1 className='text-xl font-semibold'>Object Removal</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload Image</p>
        <input
          type="file"
          accept='image/*'
          onChange={(e) => setInput(e.target.files[0])}
          className='w-full p-2 rounded-md border border-gray-300'
          placeholder="intelligence is..."
          required
        />
         <p className="mt-6 text-sm font-medium">Describe object name to remove from Image</p>
        <textarea
          value={object}
          onChange={(e) => setObject(e.target.value)}
          className="w-full p-2 rounded-md border border-gray-300"
          placeholder="Describe the image you want to generate..."
          rows={4}
          required
        />
        
        <button type="submit" className='mt-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition w-full flex items-center justify-center'> <Scissors className="w-5" />Remove Object</button>
      </form>
 
      {/* Right col */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <Scissors className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold' >Processed Image</h1>
        </div>
        <div className=' flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
            <Scissors className='w-9 h-9' />
            <p>Image will be processed to remove object</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemoveObject