import { useAuth, useUser } from "@clerk/clerk-react";
import React, { useState, useEffect } from "react";
import { dummyPublishedCreationData } from "../../assets/assets";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { community, likeDislike } from "../../Redux/apiSlice";

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();
  const { getToken } = useAuth();
  const dispatch = useDispatch();

  const { publishedImage, isLoading } = useSelector((state) => state.api);
  console.log("publishedImage::", publishedImage);
  
  const fetchCreations = async () => {
    const token = await getToken();
    dispatch(community({ token }));
  };
  
  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);
  
  const handleClickEvent = async(creationId) => {
    const token = await getToken();
     dispatch(likeDislike({userId: user?.id, creationId, token}));
  }

  return (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      Creations
      <div className="bg-white text-start h-full w-full rounded-xl overflow-y-scroll">
        {publishedImage?.map((creation, index) => (
          <div
            key={index}
            className="relative text-start group inline-block p-3 pt-3 w-full sm:max-w-1/2 lg:max-w-1/3"
          >
            <img
              src={creation.content}
              alt=""
              className="w-full h-full text-start object-cover rounded-lg"
            />
            <div className="absolute bottom-0 top-0 right-0 left-0 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg">
              <p className="text-sm hidden group-hover:block">
                {creation.prompt}
              </p>
              <div className="flex gap-1 items-center">
                <p>{creation.likes.length}</p>
                <Heart
                  onClick={()=>handleClickEvent(creation?.id)}
                  className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${
                    creation.likes.includes(user.id)
                      ? "fill-red-500 text-red-500"
                      : ""
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
