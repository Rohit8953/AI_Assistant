import React from "react";
import Markdown from "react-markdown"
const CreationItem = ({ item }) => {
  const [expand, setExpand] = React.useState(false);
  return (
    <div
     onClick={()=>setExpand(!expand)}  className="p-4 max-w-5x1 text-sm bg-white border border-gray-200 rounded-lg cursor-pointer"
    >
      <div className="flex justify-between items-center gap-4">
        <div>
          <h2>{item.prompt}</h2>
          <p className="text-gray-500 text-start">
            {item.type} - {new Date(item.createdAt).toLocaleDateString()}
          </p>
        </div>
        <button
          className="bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full"
        >
          {item.type}
        </button>
      </div>

       {
        expand && (
          <div>
            {item.type == 'image' ? (
              <div>
                <img src={item.content} alt="image" className="mt-3 w-full max-w-md" />
              </div>
            ):(
              <div className="mt-3 h-full text-start overflow-y-scroll text-sm text-slate-700">
                <div className="text-start">
                  <Markdown>
                    {item.content}
                  </Markdown>
                </div>
              </div>
            )}
          </div>
        )
       }
    </div>
    
  );
};

export default CreationItem;
