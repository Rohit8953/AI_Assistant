import { Edit } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import { createArticle } from '../../Redux/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import Markdown from 'react-markdown';
import CreationItem from '../../components/Dashboard/CreationItem';

const WriteArticle = () => {

  const articleLengths = [
    {length: 800, text: 'Short (500-800 words)'},
    {length: 1200, text: 'Medium (800-1200 words)'},
    {length: 1600, text: 'Long (1200+ words)'}
  ];
  
 const [selectedLength, setSelectedLength] = React.useState(articleLengths[0]);
 const [input, setInput] = React.useState('');
 const [loading, setLoading] = useState(false);
 const [recentCreation, setRecentCreation] = useState('');
 const {getToken} = useAuth();
 const dispatch = useDispatch();

 const {isArticleLoading, article, userCreations} = useSelector(state=>state.api);

 const onSubmitHandler =async(e) => {
  e.preventDefault(); 
  const token = await getToken();
  dispatch(createArticle({input, selectedLength, token}));
 }

  return (
    <div className='w-full '>
      <div className='h-full grid grid-cols-2 gap-4 p-6 items-start text-slate-700'>
        {/* Left col */}
        <form onSubmit={onSubmitHandler} className='w-full min-h-96 max-h-[600px] text-start p-4 bg-white rounded-lg border border-gray-200'>
          <div className='flex items-center gap-3'>
            {/* Replace with your Sparkles icon if available */}
            <span className='w-6 text-[#4A7AFF]'>✨</span>
            <h1 className='text-xl font-semibold'>Article Generation</h1>
          </div>
          <p className='mt-6 text-sm font-medium'>Prompt</p>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='w-full p-2 rounded-md border border-gray-300'
            placeholder="Intelligence is..."
            required
          />
          {/* Add more form fields as needed */}
          <p className='mt-4 text-sm font-medium'>Article Lengths</p>
          <div>
            {articleLengths.map((item, index) => (
              <span onClick={() => setSelectedLength(item)} key={index}
                className={`text-xs px-4 py-1 rounded-full cursor-pointer ${selectedLength.text === item.text ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >{item.text}</span>
            ))}
          </div>
          <br />
          <button type="submit" className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition w-full flex items-center justify-center'> <Edit className="w-5" />
            {isArticleLoading ? 'Loading...':'Generate Article'}
          </button>
        </form>

        {/* Right col */}
        <div className='w-full p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
          <div className='flex items-center gap-3'>
            <Edit className='w-5 h-5 text-[#4A7AFF]' />
            <h1 className='text-xl font-semibold' >Generated article</h1>
          </div>

          {
            isArticleLoading ? (
              <div className=' flex justify-center items-center'>
                <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                  <Edit className='w-9 h-9' />
                  Full screen (f)
                  <p>Enter a topic and click "Generate article" to get started</p>
                </div>
              </div>
            ):(
            <div className='text-start mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
                <div className='reset-tw'>
                  <Markdown>{article}</Markdown>
                </div>
            </div>
            )
          }


        </div>

      </div>
      
      <div className='w-full'>
          {/* <h2 className='my-2 text-slate-700 text-[22px] font-semibold'>Recent Plans</h2> */}
          <div className='w-full flex flex-col gap-2 h-[500px] overflow-y-scroll'>
            {
              userCreations?.map((creation, index) => creation.type == 'article' && <CreationItem key={index} item={creation} />)
            }
          </div>
      </div>
    </div>
  )
}

export default WriteArticle