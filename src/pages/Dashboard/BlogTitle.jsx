import React from 'react'
import { Edit, Hash } from 'lucide-react';
import { createBlogTitle } from '../../Redux/apiSlice';
import { useAuth } from '@clerk/clerk-react';
import { useDispatch, useSelector } from 'react-redux';
import Markdown from 'react-markdown';
import CreationItem from '../../components/Dashboard/CreationItem';

const BlogTitle = () => {

   const blogCategories = [
    'General', 'Technology', 'Health', 'Finance', 'Travel', 'Food', 'Lifestyle', 'Education', 'Entertainment', 'Business'
   ];

 const [selectedCategory, setSelectedCategory] = React.useState(blogCategories[0]);
 const [input, setInput] = React.useState('');
 const {getToken} = useAuth();
 const dispatch = useDispatch();
 const {isBlogTitleLoading, blogTitle, userCreations} = useSelector(state=>state.api);

 const onSubmitHandler = async(e) => {
  e.preventDefault(); 
  const token = await getToken();
  dispatch(createBlogTitle({input, selectedCategory, token}));
 }

  return (
    <div className='flex flex-col'>
      <div className='h-full grid grid-cols-2 gap-2 overflow-y-scroll p-6  items-start text-slate-700'>
        {/* Left col */}
        <form onSubmit={onSubmitHandler} className='w-full min-h-96 max-h-[600px] text-start p-4 bg-white rounded-lg border border-gray-200'>
          <div className='flex items-center gap-3'>
            {/* Replace with your Sparkles icon if available */}
            <span className='w-6 text-[#4A7AFF]'>✨</span>
            <h1 className='text-xl font-semibold'>AI Blog Title Generator</h1>
          </div>
          <p className='mt-6 text-sm font-medium'>Article Topic</p>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='w-full p-2 rounded-md border border-gray-300'
            placeholder="intelligence is..."
            required
          />
          {/* Add more form fields as needed */}
          <p className='mt-4 text-sm font-medium'>Blog Categories</p>
          <div className='flex flex-wrap gap-2'>
            {blogCategories.map((item, index) => (
              <span onClick={() => setSelectedCategory(item)} key={index}
                className={`text-xs px-4 py-1 rounded-full cursor-pointer ${selectedCategory === item ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >{item}</span>
            ))}
          </div>
          <br />
          <button type="submit" className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition w-full flex items-center justify-center'> 
          {
            isBlogTitleLoading ? ('loading...'):(
              <><Edit className="w-5" />Generate Title</> 
            )
          } 
          </button>
        </form>
  
        {/* Right col */}
        <div className='w-full  p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
          <div className='flex items-center gap-3'>
            <Edit className='w-5 h-5 text-[#4A7AFF]' />
            <h1 className='text-xl font-semibold' >Generated title</h1>
          </div>
          {
            isBlogTitleLoading ? (
              <div className=' flex justify-center items-center'>
                <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                  <Hash className='w-9 h-9' />
                  Full screen (f)
                  <p>Enter a topic and click "Generate title" to get started</p>
                </div>
              </div>
            ):(
            <div className='text-start mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
              <div className='reset-tw'>
                <Markdown>
                  {blogTitle}
                </Markdown>
              </div>
            </div>
            )
          }
        </div>

      </div>
      <div className='w-full h-full px-6'>
          {/* <h2 className='my-2 text-slate-700 text-[22px] font-semibold'>Recent Plans</h2> */}
          <div className='w-full flex flex-col gap-2 h-[500px] overflow-y-scroll'>
            {
              userCreations?.map((creation, index) => creation.type == 'blog-title' && <CreationItem key={index} item={creation} />)
            }
          </div>
      </div>
    </div>
  )
}

export default BlogTitle