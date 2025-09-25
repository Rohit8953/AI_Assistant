import { Protect, useAuth, useUser } from '@clerk/clerk-react';
import { Gem, Sparkles, FileText, ImageIcon, Edit, Users, TrendingUp, Clock, Zap, ArrowUpRight, Calendar, BarChart3 } from 'lucide-react';
import React, { useEffect } from 'react'
import CreationItem from '../../components/Dashboard/CreationItem.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoryCount, getUsersCreation } from '../../Redux/apiSlice.js';

const Dashboard = () => {
    const { user } = useUser();
    const { getToken } = useAuth();
    const dispatch = useDispatch();
  
    const { isLoadingAllCreations, userCreations, counts, isCountLoading } = useSelector((state) => state.api);

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

    // Get icon based on creation type
    const getTypeIcon = (type) => {
      switch (type) {
        case 'article': return <Edit className="w-4 h-4 text-white" />;
        case 'blog-title': return <FileText className="w-4 h-4 text-white" />;
        case 'image': return <ImageIcon className="w-4 h-4 text-white" />;
        case 'resume-review': return <Users className="w-4 h-4 text-white" />;
        default: return <Sparkles className="w-4 h-4 text-white" />;
      }
    };

    // Get gradient colors based on type
    const getTypeGradient = (type) => {
      switch (type) {
        case 'article': return 'from-blue-500 to-cyan-500';
        case 'blog-title': return 'from-pink-400 to-pink-500';
        case 'image': return 'from-green-500 to-emerald-500';
        case 'resume-review': return 'from-orange-500 to-red-500';
        default: return 'from-gray-500 to-slate-500';
      }
    };

    const getTotalCreations = () => {
      return counts?.reduce((total, item) => total + Number(item.count || 0), 0) || userCreations?.length || 0;
    };

    console.log('Counts:', getTotalCreations());
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50/50 to-blue-50/30 p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600">Welcome back, {user?.fullName || 'Creator'}! 👋</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>Today, {new Date().toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Creations Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100/50 p-6 group hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Creations</p>
                            <h3 className="text-2xl pl-1 font-bold text-start text-gray-900">{getTotalCreations()}</h3>
                        </div>
                        <div className={`p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 group-hover:scale-110 transition-transform duration-200`}>
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                        <TrendingUp className="w-4 h-4" />
                        <span>+12% this month</span>
                    </div>
                </div>

                {/* Active Plan Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100/50 p-6 group hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-start font-medium text-gray-600">Active Plan</p>
                            <h3 className="text-2xl font-bold pl-1 text-gray-900">
                                <Protect plan={'premium'} fallback="Free">Premium</Protect>
                            </h3>
                        </div>
                        <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 group-hover:scale-110 transition-transform duration-200">
                            <Gem className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <Protect plan={'premium'} fallback={
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                            Upgrade <ArrowUpRight className="w-4 h-4" />
                        </button>
                    }>
                        <div className="flex items-center gap-1 text-sm text-amber-600">
                            <Zap className="w-4 h-4" />
                            <span>Premium benefits active</span>
                        </div>
                    </Protect>
                </div>

                {/* Creation Types Stats */}
                {counts?.slice(0, 2).map((item, index) => (
                    <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100/50 p-6 group hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-sm text-start font-medium text-gray-600 capitalize">{item?.type?.replace('-', ' ')}</p>
                                <h3 className="text-2xl pl-1 text-start font-bold text-gray-900">{item?.count || 0}</h3>
                            </div>
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${getTypeGradient(item.type)} group-hover:scale-110 transition-transform duration-200`}>
                                {getTypeIcon(item.type)}
                            </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className={`h-2 rounded-full bg-gradient-to-r ${getTypeGradient(item.type)}`}
                                style={{ width: `${((item.count || 0) / getTotalCreations()) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detailed Stats Section */}
            {counts && counts.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100/50 p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5" />
                            Creation Statistics
                        </h3>
                        <span className="text-sm text-gray-500">All time</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {counts.map((item, index) => (
                            <div key={index} className="text-center p-4 rounded-xl bg-gray-100/50">
                                <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${getTypeGradient(item.type)} mb-2`}>
                                    {getTypeIcon(item.type)}
                                </div>
                                <p className="text-sm font-medium text-gray-600 capitalize mb-1">
                                    {item?.type?.replace('-', ' ')}
                                </p>
                                <p className="text-2xl font-bold text-gray-900">{item?.count || 0}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {((item.count || 0) / getTotalCreations() * 100).toFixed(1)}% of total
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Recent Creations Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100/50 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Recent Creations
                    </h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {userCreations?.length || 0} total
                    </span>
                </div>

                {isLoadingAllCreations ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="relative mb-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                                <Sparkles className="w-8 h-8 text-blue-500 animate-spin" />
                            </div>
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-20 animate-ping"></div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Loading Creations</h3>
                        <p className="text-gray-500">Fetching your amazing work...</p>
                    </div>
                ) : userCreations?.length > 0 ? (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {userCreations?.map((creation, index) => (
                            <CreationItem key={index} item={creation} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Sparkles className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Creations Yet</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            Start creating amazing content with our AI tools! Your recent creations will appear here.
                        </p>
                        <button className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
                            Start Creating
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;