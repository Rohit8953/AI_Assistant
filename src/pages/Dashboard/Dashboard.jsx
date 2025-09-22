import { Protect, useAuth, useUser } from '@clerk/clerk-react';
import { Gem } from 'lucide-react';
import React, { useEffect } from 'react'
import CreationItem from '../../components/Dashboard/CreationItem.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoryCount, getUsersCreation } from '../../Redux/apiSlice.js';

const Dashboard = () => {
    const { user } = useUser();
    const { getToken } = useAuth();
    const dispatch = useDispatch();
  
    const { isLoadingAllCreations, userCreations, counts, isCountLoading } = useSelector((state) => state.api);
    console.log("publishedImage::", counts);
    
    const fetchAllUsersCreations = async () => {
      const token = await getToken();
      dispatch(getUsersCreation({ token }));
      dispatch(getAllCategoryCount({ token }));
    };
    
    useEffect(() => {
      if (user) {
        fetchAllUsersCreations();
      }
    }, [user]);
  // Temporary mock data for demonstration
  const creations = [{ prompt: "Creation 1", type: "Type A", createdAt: new Date() }, { prompt: "Creation 2", type: "Type B", createdAt: new Date() }, { prompt: "Creation 3", type: "Type C", createdAt: new Date() }]; // Replace with your actual data
  // Dummy Sparkles component for demonstration
  const Sparkles = (props) => <span {...props}>✨</span>;
  
  return (
    <div>
      <div className='h-full p-6'>
        <div className='flex justify-start gap-4 flex-wrap'>
          {/* Total Creations Card */}
          <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>
            <div className='text-slate-600'>
              <p className='text-sm'>Total Creations</p>
              <h2 className='text-xl text-start font-semibold'>{userCreations?.length}</h2>
            </div>
            <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
              <Sparkles className='w-5 text-white' />
            </div>
          </div>
          
          {/* Active Plan Card */}
          <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>
            <div className='text-slate-600'>
              <p className='text-sm'>Active Plan</p>
              <h2 className='text-xl text-start font-semibold'>
                <Protect plan={'premium'} fallback="Free">Premium</Protect>
              </h2>
            </div>
            <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
              <Gem className='w-5 text-white' />
            </div>
          </div>

            {
              counts?.map((item, index)=>{
                return (
                   <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>
                    <div className='text-slate-600'>
                      <p className='text-sm text-start'>{item?.type}</p>
                      <p className='text-sm text-start'>{item?.count}</p>
                    </div>
                    <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
                      <Gem className='w-5 text-white' />
                    </div>
                  </div>
                )
              })
            }
          <div className='w-full'>
            <h2 className='mt-6 mb-4 text-slate-700 text-[22px] font-semibold'>Recent Plans</h2>
            { isLoadingAllCreations ? (
               <div className="flex items-center justify-center h-[500px]">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                </div>
          ) : (
            <div className='w-full flex flex-col gap-2 h-[500px] overflow-y-scroll ' >
              {
                userCreations?.map((creation, index) => <CreationItem key={index} item={creation} />)
              }
            </div>
          )
          }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

