import React, { useState } from 'react'
import { Edit, FileText, Sparkles, Upload, Download, CheckCircle, AlertCircle, RotateCw, Star, Zap } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import { useDispatch, useSelector } from 'react-redux';
import { reviewResume } from '../../Redux/apiSlice';
import Markdown from 'react-markdown';
import CreationItem from '../../components/Dashboard/CreationItem';

const ReviewResume = () => {
  const [input, setInput] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const { resume, isReviewingResume, userCreations } = useSelector(state => state.api);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInput(file);
      setFileName(file.name);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setInput(file);
      setFileName(file.name);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input) return;
    
    const formData = new FormData();
    formData.append('resume', input);
    const token = await getToken();
    dispatch(reviewResume({ formData, token }));
  };

  const copyToClipboard = () => {
    if (resume) {
      navigator.clipboard.writeText(resume);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className='w-full h-full bg-gradient-to-br from-gray-50/50 to-amber-50/30'>
      {/* Main Content Grid */}
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 p-6 h-full'>
        {/* Left Column - Upload Form */}
        <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 p-6'>
          {/* Header */}
          <div className='flex items-start gap-3 mb-6'>
            <div className='p-2 bg-gradient-to-r from-amber-500 to-orange-400 rounded-xl'>
              <FileText className='w-6 h-6 text-white' />
            </div>
            <div className='text-start'>
              <h1 className='text-2xl font-bold text-gray-900'>AI Resume Review</h1>
              <p className='text-gray-600'>Get professional feedback on your resume</p>
            </div>
          </div>

          {/* Upload Area */}
          <form onSubmit={onSubmitHandler} className='space-y-6'>
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-3'>
                Upload Your Resume
                <span className='text-red-500 ml-1'>*</span>
              </label>
              
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer ${
                  isDragging 
                    ? 'border-amber-500 bg-amber-50/50' 
                    : input 
                    ? 'border-green-500 bg-green-50/50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input').click()}
              >
                <input
                  id="file-input"
                  type="file"
                  accept='application/pdf'
                  onChange={handleFileChange}
                  className='hidden'
                  required
                />
                
                {input ? (
                  <div className='space-y-3'>
                    <CheckCircle className='w-12 h-12 text-green-500 mx-auto' />
                    <div>
                      <p className='font-medium text-gray-900'>File Selected</p>
                      <p className='text-sm text-gray-600 truncate'>{fileName}</p>
                    </div>
                    <p className='text-xs text-gray-500'>Click to change file</p>
                  </div>
                ) : (
                  <div className='space-y-3'>
                    <Upload className='w-12 h-12 text-gray-400 mx-auto' />
                    <div>
                      <p className='font-medium text-gray-900'>Drop your resume here or click to browse</p>
                      <p className='text-sm text-gray-600'>Supports PDF format only</p>
                    </div>
                    <div className='flex items-center justify-center gap-2 text-xs text-gray-500'>
                      <AlertCircle className='w-4 h-4' />
                      <span>Max file size: 10MB</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Features List */}
            <div className='p-4 bg-amber-50/50 rounded-xl border border-amber-100'>
              <div className='flex items-center gap-2 text-amber-700 mb-3'>
                <Sparkles className='w-4 h-4' />
                <span className='font-semibold text-sm'>What We Analyze</span>
              </div>
              <div className='grid grid-cols-1 gap-2 text-sm'>
                <div className='flex items-center gap-2 text-amber-600'>
                  <Star className='w-3 h-3' />
                  <span>Content quality and relevance</span>
                </div>
                <div className='flex items-center gap-2 text-amber-600'>
                  <Star className='w-3 h-3' />
                  <span>Formatting and structure</span>
                </div>
                <div className='flex items-center gap-2 text-amber-600'>
                  <Star className='w-3 h-3' />
                  <span>Keyword optimization</span>
                </div>
                <div className='flex items-center gap-2 text-amber-600'>
                  <Star className='w-3 h-3' />
                  <span>ATS compatibility</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isReviewingResume || !input}
              className='w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl flex items-center justify-center gap-2'
            >
              {isReviewingResume ? (
                <>
                  <RotateCw className="w-5 h-5 animate-spin" />
                  Analyzing Resume...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Review My Resume
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column - Results */}
        <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 p-6 flex flex-col'>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl'>
                <Edit className='w-6 h-6 text-white' />
              </div>
              <div className='text-start'>
                <h2 className='text-2xl font-bold text-gray-900'>Analysis Results</h2>
                <p className='text-gray-600'>Professional resume feedback</p>
              </div>
            </div>
            {resume && (
              <button
                onClick={copyToClipboard}
                className='flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium'
              >
                {copied ? (
                  <>
                    <CheckCircle className='w-4 h-4 text-green-500' />
                    Copied!
                  </>
                ) : (
                  <>
                    <Download className='w-4 h-4' />
                    Copy Text
                  </>
                )}
              </button>
            )}
          </div>

          {/* Results Content */}
          <div className='flex-1 overflow-hidden'>
            {isReviewingResume ? (
              <div className='h-full flex flex-col items-center justify-center text-center py-12'>
                <div className='relative mb-4'>
                  <div className='w-16 h-16 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full flex items-center justify-center'>
                    <RotateCw className='w-8 h-8 text-amber-500 animate-spin' />
                  </div>
                  <div className='absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur opacity-20 animate-ping'></div>
                </div>
                <h3 className='text-lg font-semibold text-gray-700 mb-2'>Analyzing Your Resume</h3>
                <p className='text-gray-500 text-sm max-w-xs'>
                  Our AI is carefully reviewing your resume for improvements...
                </p>
              </div>
            ) : resume ? (
              <div className='h-full text-start flex flex-col'>
                <div className=' h-[500px] overflow-y-auto'>
                  <div className='reset-tw prose prose-sm max-w-none'>
                    <Markdown
                      components={{
                        h1: ({node, ...props}) => (
                          <h1 className='text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2' {...props} />
                        ),
                        h2: ({node, ...props}) => (
                          <h2 className='text-lg font-semibold text-gray-800 mb-3 mt-6' {...props} />
                        ),
                        h3: ({node, ...props}) => (
                          <h3 className='text-base font-medium text-gray-700 mb-2 mt-4' {...props} />
                        ),
                        p: ({node, ...props}) => (
                          <p className='text-gray-600 leading-relaxed mb-4' {...props} />
                        ),
                        ul: ({node, ...props}) => (
                          <ul className='list-disc list-inside text-gray-600 mb-4 space-y-2' {...props} />
                        ),
                        ol: ({node, ...props}) => (
                          <ol className='list-decimal list-inside text-gray-600 mb-4 space-y-2' {...props} />
                        ),
                        strong: ({node, ...props}) => (
                          <strong className='font-semibold text-gray-700' {...props} />
                        ),
                        em: ({node, ...props}) => (
                          <em className='italic text-gray-600' {...props} />
                        )
                      }}
                    >
                      {resume}
                    </Markdown>
                  </div>
                </div>
              </div>
            ) : (
              <div className='h-full flex flex-col items-center justify-center text-center py-12'>
                <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
                  <FileText className='w-8 h-8 text-gray-400' />
                </div>
                <h3 className='text-lg font-semibold text-gray-700 mb-2'>No Resume Analyzed Yet</h3>
                <p className='text-gray-500 text-sm max-w-xs'>
                  Upload your resume to get professional AI-powered feedback and improvement suggestions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Reviews Section */}
      <div className='px-6 pb-6'>
        <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 p-6'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl font-bold text-gray-900'>Recent Resume Reviews</h2>
            <span className='text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full'>
              {userCreations?.filter(creation => creation.type === 'resume-review').length || 0} reviews
            </span>
          </div>
          
          <div className='max-h-80 overflow-y-auto'>
            <div className='grid gap-3'>
              {userCreations?.filter(creation => creation.type === 'resume-review').map((creation, index) => (
                <CreationItem key={index} item={creation} />
              ))}
              
              {(!userCreations || userCreations.filter(creation => creation.type === 'resume-review').length === 0) && (
                <div className='text-center py-8 text-gray-500'>
                  <FileText className='w-12 h-12 mx-auto mb-3 opacity-50' />
                  <p>No resume reviews yet. Your recent analyses will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewResume