import { useAuth, useUser } from "@clerk/clerk-react";
import React, { useState, useEffect } from "react";
import { Heart, MessageCircle, Share, Eye, Sparkles, Users, Filter, Search, Zap } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { community, likeDislike } from "../../Redux/apiSlice";

const Community = () => {
  const [creations, setCreations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const { user } = useUser();
  const { getToken } = useAuth();
  const dispatch = useDispatch();

  const { publishedImage, isLoading } = useSelector((state) => state.api);

  const fetchCreations = async () => {
    const token = await getToken();
    dispatch(community({ token }));
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  const handleLike = async (creationId) => {
    const token = await getToken();
    dispatch(likeDislike({ userId: user?.id, creationId, token }));
  };

  const filteredCreations = publishedImage?.filter(creation => {
    const matchesSearch = creation.prompt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || creation.style === filter;
    return matchesSearch && matchesFilter;
  });

  const getUniqueStyles = () => {
    const styles = publishedImage?.map(creation => creation.style).filter(Boolean);
    return ['all', ...new Set(styles)];
  };

  return (
    <div className="flex-1 h-full flex flex-col bg-gradient-to-br from-gray-50/50 to-purple-50/30 p-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100/50 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-pink-500 to-pink-400 rounded-xl">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-start text-gray-900">Creative Community</h1>
              <p className="text-gray-600">Discover amazing AI creations from our community</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1 rounded-full">
              <Sparkles className="w-4 h-4" />
              <span>{publishedImage?.length || 0} Creations</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
              <Eye className="w-4 h-4" />
              <span>1.2K Views</span>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search creations by prompt..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
            />
          </div>
          
          <div className="flex gap-2">
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
            >
              {getUniqueStyles().map(style => (
                <option key={style} value={style}>
                  {style === 'all' ? 'All Styles' : style}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex-1 flex items-center min-h-96 justify-center">
          <div className="flex flex-col items-center">
            <div className="relative text-center mb-4">
              <div className="w-16 h-16 text-center bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-pink-500 mx-auto animate-pulse" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-pink-400 rounded-full blur opacity-20 animate-ping"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Loading Community</h3>
            <p className="text-gray-500">Discovering amazing creations...</p>
          </div>
        </div>
      ) : (
        <div className="flex-1">
          {filteredCreations?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Creations Found</h3>
              <p className="text-gray-500 max-w-md">
                {searchTerm || filter !== 'all' 
                  ? 'Try adjusting your search terms or filters to see more results.' 
                  : 'Be the first to share your creation with the community!'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCreations?.map((creation, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={creation.content}
                      alt={creation.prompt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <p className="text-sm line-clamp-2 mb-3 leading-relaxed">
                          {creation.prompt}
                        </p>
                        
                        {/* Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleLike(creation?.id)}
                              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                                creation.likes?.includes(user.id)
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-white/20 text-white hover:bg-white/30"
                              }`}
                            >
                              <Heart 
                                className={`w-4 h-4 ${creation.likes?.includes(user.id) ? "fill-current" : ""}`}
                              />
                              <span>{creation.likes?.length || 0}</span>
                            </button>
                            
                            <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-white text-sm hover:bg-white/30 transition-all duration-200">
                              <MessageCircle className="w-4 h-4" />
                              <span>0</span>
                            </button>
                          </div>
                          
                          <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-200">
                            <Share className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Style Badge */}
                    {creation.style && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-black/50 text-white text-xs rounded-full backdrop-blur-sm">
                          {creation.style}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                        <span className="text-xs text-gray-600 font-medium">
                          {creation.user?.fullName || 'Anonymous'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Eye className="w-3 h-3" />
                        <span>1.2k</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{new Date(creation.createdAt).toLocaleDateString()}</span>
                      {creation.public && (
                        <span className="text-green-600 font-medium">Public</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 flex items-center justify-center z-10">
        <Sparkles className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Community;