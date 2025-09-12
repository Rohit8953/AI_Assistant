import { Edit, Hash } from "lucide-react";
import React from "react";

const GenerateImages = () => {
  const blogCategories = [
    "Reactlistic",
    "Ghibli style",
    "Anime style",
    "Cartoon style",
    "Fantacy",
    "Realistic style",
    "3D style",
    "Portrait style",
  ];

  const [selectedStyle, setSelectedStyle] = React.useState(blogCategories[0]);
  const [input, setInput] = React.useState("");
  const [enabled, setEnabled] = React.useState(false);
  
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start gap-4 text-slate-700">
      {/* Left col */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full  max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          {/* Replace with your Sparkles icon if available */}
          <span className="w-6 text-[#4A7AFF]">✨</span>
          <h1 className="text-xl font-semibold">AI Image Generator</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Describe Your Image</p>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 rounded-md border border-gray-300"
          placeholder="Describe the image you want to generate..."
          rows={4}
          required
        />
        {/* Add more form fields as needed */}
        <p className="mt-4 text-sm font-medium">Blog Categories</p>
        <div>
          {blogCategories.map((item, index) => (
            <span
              onClick={() => setSelectedStyle(item)}
              key={index}
              className={`text-xs px-4 py-1 rounded-full cursor-pointer ${
                selectedStyle === item
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {item}
            </span>
          ))}
        </div>

    <div className="flex items-center space-x-2 my-6">
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
          enabled ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
      <p className="text-sm">
        {enabled ? "Image is Public" : "Make this image Public"}
      </p>
    </div>


        <br />
        <button
          type="submit"
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition w-full flex items-center justify-center"
        >
          {" "}
          <Edit className="w-5" />
          Generate Image
        </button>
      </form>

      {/* Right col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <Edit className="w-5 h-5 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Generated Image</h1>
        </div>
        <div className=" flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Hash className="w-9 h-9" />
            Full screen (f)
            <p>Enter a topic and click "Generate image" to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GenerateImages;
