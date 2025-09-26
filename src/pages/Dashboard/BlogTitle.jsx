import React, { useState } from 'react'
import { Edit, Hash, Sparkles, Zap, Clock, Copy, CheckCircle, RotateCw } from 'lucide-react';
import { createBlogTitle } from '../../Redux/apiSlice';
import { useAuth } from '@clerk/clerk-react';
import { useDispatch, useSelector } from 'react-redux';
import Markdown from 'react-markdown';
import CreationItem from '../../components/Dashboard/CreationItem';
import VoiceToText from '../../components/VoiceToText';

const BlogTitle = () => {
   const blogCategories = [
    'General', 'Technology', 'Health', 'Finance', 'Travel', 'Food', 'Lifestyle', 'Education', 'Entertainment', 'Business'
   ];

 const [selectedCategory, setSelectedCategory] = React.useState(blogCategories[0]);
 const [input, setInput] = React.useState('');
 const [copiedTitle, setCopiedTitle] = React.useState(null);
 const {getToken} = useAuth();
 const dispatch = useDispatch();
 const {isBlogTitleLoading, blogTitle, userCreations} = useSelector(state=>state.api);
 const [isOpen, setIsOpen] = useState(false);

 const onSubmitHandler = async(e) => {
  e.preventDefault(); 
  const token = await getToken();
  dispatch(createBlogTitle({input, selectedCategory, token}));
 }

 const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  setCopiedTitle(text);
  setTimeout(() => setCopiedTitle(null), 2000);
 };

  return (
    <div className='flex flex-col h-full text-start bg-gradient-to-br from-gray-50/50 to-blue-50/30'>
      {/* Main Content Grid */}
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 p-6 h-full'>
        {/* Left Column - Input Form */}
        <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100/50 p-6'>
          {/* Header */}
          <div className='flex items-center gap-3 mb-6'>
            <div className='p-2 bg-gradient-to-r from-purple-500 to-purple-400 rounded-xl'>
              <Sparkles className='w-6 h-6 text-white' />
            </div>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>AI Blog Title Generator</h1>
              <p className='text-gray-600'>Generate catchy blog titles in seconds</p>
            </div>

            <div className='flex-1 flex justify-end'>
                {/* Voice Input Button */}
                <button 
                  onClick={() => setIsOpen(true)}
                  className="flex items-center justify-center w-10 h-10 bg-purple-500 hover:bg-purple-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
                  title="Voice Input"
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z" 
                    />
                  </svg>
              
                </button>
                
                {
                  isOpen && (
                    <VoiceToText isOpen={isOpen} setIsOpen={setIsOpen} input={input} setInput={setInput} color={'purple'}/>
                  )
                }
              </div>
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className='space-y-6'>
            {/* Topic Input */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Article Topic
              </label>
              <div className='relative'>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className='w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder-gray-400'
                  placeholder="Enter your blog topic or keyword..."
                  required
                />
                <Zap className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-3'>
                Blog Category
              </label>
              <div className='flex flex-wrap gap-2'>
                {blogCategories.map((item, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => setSelectedCategory(item)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                      selectedCategory === item 
                        ? 'bg-gradient-to-r from-purple-500 to-purple-400 text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button 
              type="submit" 
              disabled={isBlogTitleLoading}
              className='w-full bg-gradient-to-r from-purple-500 to-purple-400 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-500 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl flex items-center justify-center gap-2'
            >
              {isBlogTitleLoading ? (
                <>
                  <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                  Generating Titles...
                </>
              ) : (
                <>
                  <Edit className="w-5 h-5" />
                  Generate Blog Titles
                </>
              )}
            </button>
          </form>

          {/* Tips */}
          <div className='mt-6 p-4 bg-blue-50/50 rounded-xl border border-blue-100'>
            <div className='flex items-center gap-2 text-blue-700 mb-2'>
              <Zap className='w-4 h-4' />
              <span className='font-semibold text-sm'>Pro Tip</span>
            </div>
            <p className='text-blue-600 text-sm'>
              Be specific with your topic for more relevant and engaging title suggestions.
            </p>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100/50 p-6 flex flex-col'>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-gradient-to-r from-purple-500 to-purple-400 rounded-xl'>
                <Hash className='w-6 h-6 text-white' />
              </div>
              <div>
                <h2 className='text-2xl font-bold text-gray-900'>Generated Titles</h2>
                <p className='text-gray-600'>Your AI-powered blog titles</p>
              </div>
            </div>
            <div className='flex items-center gap-2 text-sm text-gray-500'>
              <Clock className='w-4 h-4' />
              <span>Just now</span>
            </div>
          </div>

          {/* Results Content */}
          <div className='flex-1 overflow-hidden'>
            {isBlogTitleLoading ? (
              <div className='h-full flex flex-col items-center justify-center text-center py-12'>
                <div className='relative mb-4'>
                  <div className='w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center'>
                    <RotateCw className='w-8 h-8 text-blue-500 animate-spin' />
                  </div>
                  <div className='absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-20 animate-ping'></div>
                </div>
                <h3 className='text-lg font-semibold text-gray-700 mb-2'>Generating Titles</h3>
                <p className='text-gray-500 text-sm max-w-xs'>
                  Our AI is crafting the perfect blog titles for your topic...
                </p>
              </div>
            ) : blogTitle ? (
              <div className='h-full overflow-y-auto'>
                <div className='reset-tw space-y-4'>
                  <Markdown
                    components={{
                      h1: ({node, ...props}) => (
                        <div className='group relative'>
                          <h1 className='text-lg font-semibold text-gray-900 bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-blue-300 transition-colors duration-200' {...props} />
                          <button
                            onClick={() => copyToClipboard(props.children)}
                            className='absolute top-3 right-3 p-2 bg-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md hover:shadow-lg'
                          >
                            {copiedTitle === props.children ? (
                              <CheckCircle className='w-4 h-4 text-green-500' />
                            ) : (
                              <Copy className='w-4 h-4 text-gray-400 hover:text-gray-600' />
                            )}
                          </button>
                        </div>
                      ),
                      h2: ({node, ...props}) => (
                        <div className='group relative'>
                          <h2 className='text-base font-medium text-gray-800 bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-blue-300 transition-colors duration-200' {...props} />
                          <button
                            onClick={() => copyToClipboard(props.children)}
                            className='absolute top-2 right-2 p-1 bg-white rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md hover:shadow-lg'
                          >
                            {copiedTitle === props.children ? (
                              <CheckCircle className='w-3 h-3 text-green-500' />
                            ) : (
                              <Copy className='w-3 h-3 text-gray-400 hover:text-gray-600' />
                            )}
                          </button>
                        </div>
                      ),
                      p: ({node, ...props}) => <p className='text-gray-600 leading-relaxed' {...props} />
                    }}
                  >
                    {blogTitle}
                  </Markdown>
                </div>
              </div>
            ) : (
              <div className='h-full flex flex-col items-center justify-center text-center py-12'>
                <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
                  <Edit className='w-8 h-8 text-gray-400' />
                </div>
                <h3 className='text-lg font-semibold text-gray-700 mb-2'>No Titles Generated Yet</h3>
                <p className='text-gray-500 text-sm max-w-xs'>
                  Enter a topic and click "Generate Blog Titles" to get started with AI-powered title suggestions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Creations Section */}
      <div className='px-6 pb-6'>
        <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100/50 p-6'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl font-bold text-gray-900'>Recent Blog Titles</h2>
            <span className='text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full'>
              {userCreations?.filter(creation => creation.type === 'blog-title').length || 0} generated
            </span>
          </div>
          
          <div className='max-h-80 overflow-y-auto'>
            <div className='grid gap-3'>
              {userCreations?.filter(creation => creation.type === 'blog-title').map((creation, index) => (
                <CreationItem key={index} item={creation} />
              ))}
              
              {(!userCreations || userCreations.filter(creation => creation.type === 'blog-title').length === 0) && (
                <div className='text-center py-8 text-gray-500'>
                  <Edit className='w-12 h-12 mx-auto mb-3 opacity-50' />
                  <p>No blog titles generated yet. Your recent creations will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogTitle