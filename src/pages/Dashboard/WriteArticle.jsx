import { Edit, Sparkles, Zap, Clock, Copy, CheckCircle, FileText, RotateCw } from 'lucide-react';
import React, { useState } from 'react'
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
  
  const [selectedLength, setSelectedLength] = useState(articleLengths[0]);
  const [input, setInput] = useState('');
  const [copiedContent, setCopiedContent] = useState(null);
  const {getToken} = useAuth();
  const dispatch = useDispatch();

  const {isArticleLoading, article, userCreations} = useSelector(state=>state.api);

  const onSubmitHandler = async(e) => {
    e.preventDefault(); 
    const token = await getToken();
    dispatch(createArticle({input, selectedLength, token}));
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedContent(text);
    setTimeout(() => setCopiedContent(null), 2000);
  };

  const copyFullArticle = () => {
    copyToClipboard(article);
  };

  return (
    <div className='w-full h-full text-start bg-gradient-to-br from-gray-50/50 to-blue-50/30'>
      {/* Main Content Grid */}
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 p-6 h-full'>
        {/* Left Column - Input Form */}
        <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100/50 p-6'>
          {/* Header */}
          <div className='flex items-center gap-3 mb-6'>
            <div className='p-2 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl'>
              <Edit className='w-6 h-6 text-white' />
            </div>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>AI Article Writer</h1>
              <p className='text-gray-600'>Generate high-quality articles in seconds</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className='space-y-6'>
            {/* Topic Input */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Article Topic or Prompt
              </label>
              <div className='relative'>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className='w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder-gray-400 resize-none min-h-[100px]'
                  placeholder="Describe the article you want to create. Be specific for better results..."
                  required
                  rows={3}
                />
                <Zap className='absolute right-3 top-3 w-5 h-5 text-gray-400' />
              </div>
            </div>

            {/* Article Lengths */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-3'>
                Article Length
              </label>
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                {articleLengths.map((item, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => setSelectedLength(item)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 border-2 ${
                      selectedLength.text === item.text 
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-500 text-blue-700 shadow-md' 
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className='text-center'>
                      <FileText className='w-4 h-4 mx-auto mb-1' />
                      <span>{item.text.split(' ')[0]}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button 
              type="submit" 
              disabled={isArticleLoading}
              className='w-full bg-gradient-to-r from-blue-500 to-blue-400 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl flex items-center justify-center gap-2'
            >
              {isArticleLoading ? (
                <>
                  <RotateCw className="w-5 h-5 animate-spin" />
                  Generating Article...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Article
                </>
              )}
            </button>
          </form>

          {/* Tips */}
          <div className='mt-6 p-4 bg-blue-50/50 rounded-xl border border-blue-100'>
            <div className='flex items-center gap-2 text-blue-700 mb-2'>
              <Zap className='w-4 h-4' />
              <span className='font-semibold text-sm'>Writing Tips</span>
            </div>
            <ul className='text-blue-600 text-sm space-y-1'>
              <li>• Be specific about your topic and target audience</li>
              <li>• Include keywords you want to focus on</li>
              <li>• Mention the article's purpose (inform, persuade, etc.)</li>
            </ul>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100/50 p-6 flex flex-col'>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl'>
                <FileText className='w-6 h-6 text-white' />
              </div>
              <div>
                <h2 className='text-2xl font-bold text-gray-900'>Generated Article</h2>
                <p className='text-gray-600'>{selectedLength.text}</p>
              </div>
            </div>
              {
            article ? (
                <div className='flex flex-col justify-center items-center mb-4 gap-0.5'>
                  <button
                    onClick={copyFullArticle}
                    className='flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium'
                  >
                    {copiedContent === article ? (
                      <>
                        <CheckCircle className='w-4 h-4 text-green-500' />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className='w-4 h-4' />
                        Copy Article
                      </>
                    )}
                  </button>

                  {/* <div className='flex items-center gap-2 text-sm text-gray-500'>
                    <Clock className='w-4 h-4' />
                    <span>Just now</span>
                  </div> */}
                </div>
            ) : null
            }
          </div>

          {/* Results Content */}
          <div className='flex-1 overflow-hidden'>
            {isArticleLoading ? (
              <div className='h-full flex flex-col items-center justify-center text-center py-12'>
                <div className='relative mb-4'>
                  <div className='w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center'>
                    <RotateCw className='w-8 h-8 text-blue-500 animate-spin' />
                  </div>
                  <div className='absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-20 animate-ping'></div>
                </div>
                <h3 className='text-lg font-semibold text-gray-700 mb-2'>Crafting Your Article</h3>
                <p className='text-gray-500 text-sm max-w-xs'>
                  Our AI is writing a {selectedLength.text.toLowerCase()} article for you...
                </p>
              </div>
            ) : article ? (
              <div className='h-full flex flex-col'>
                {/* Article Content */}
                <div className='max-h-[400px] overflow-y-scroll'>
                  <div className='reset-tw'>
                    <Markdown
                      components={{
                        h1: ({node, ...props}) => (
                          <h1 className='text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2' {...props} />
                        ),
                        h2: ({node, ...props}) => (
                          <h2 className='text-xl font-semibold text-gray-800 mb-3 mt-6' {...props} />
                        ),
                        h3: ({node, ...props}) => (
                          <h3 className='text-lg font-medium text-gray-700 mb-2 mt-4' {...props} />
                        ),
                        p: ({node, ...props}) => (
                          <p className='text-gray-600 leading-relaxed mb-4' {...props} />
                        ),
                        ul: ({node, ...props}) => (
                          <ul className='list-disc list-inside text-gray-600 mb-4 space-y-1' {...props} />
                        ),
                        ol: ({node, ...props}) => (
                          <ol className='list-decimal list-inside text-gray-600 mb-4 space-y-1' {...props} />
                        ),
                        li: ({node, ...props}) => (
                          <li className='text-gray-600' {...props} />
                        ),
                        strong: ({node, ...props}) => (
                          <strong className='font-semibold text-gray-700' {...props} />
                        )
                      }}
                    >
                      {article}
                    </Markdown>
                  </div>
                </div>
              </div>
            ) : (
              <div className='h-full flex flex-col items-center justify-center text-center py-12'>
                <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
                  <FileText className='w-8 h-8 text-gray-400' />
                </div>
                <h3 className='text-lg font-semibold text-gray-700 mb-2'>No Article Generated Yet</h3>
                <p className='text-gray-500 text-sm max-w-xs'>
                  Enter a prompt and click "Generate Article" to create your content.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Articles Section */}
      <div className='px-6 pb-6'>
        <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100/50 p-6'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl font-bold text-gray-900'>Recent Articles</h2>
            <span className='text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full'>
              {userCreations?.filter(creation => creation.type === 'article').length || 0} generated
            </span>
          </div>
          
          <div className='max-h-80 overflow-y-auto'>
            <div className='grid gap-3'>
              {userCreations?.filter(creation => creation.type === 'article').map((creation, index) => (
                <CreationItem key={index} item={creation} />
              ))}
              
              {(!userCreations || userCreations.filter(creation => creation.type === 'article').length === 0) && (
                <div className='text-center py-8 text-gray-500'>
                  <FileText className='w-12 h-12 mx-auto mb-3 opacity-50' />
                  <p>No articles generated yet. Your recent creations will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WriteArticle;