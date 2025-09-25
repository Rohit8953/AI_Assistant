import { useAuth } from "@clerk/clerk-react";
import { Edit, Hash, ImageIcon, Sparkles, Palette, Zap, Download, Share, CheckCircle, RotateCw } from "lucide-react";
import React, { useState } from "react";
import { generateImage } from "../../Redux/apiSlice";
import { useDispatch, useSelector } from "react-redux";

const GenerateImages = () => {
  const imageStyles = [
    { name: "Realistic", icon: "🎨", description: "Photorealistic images" },
    { name: "Anime style", icon: "🌸", description: "Japanese anime aesthetic" },
    { name: "Ghibli style", icon: "🐉", description: "Studio Ghibli inspired" },
    { name: "Cartoon style", icon: "📺", description: "Western cartoon style" },
    { name: "Fantasy", icon: "✨", description: "Magical and fantasy themes" },
    { name: "3D style", icon: "🔷", description: "3D rendered graphics" },
    { name: "Portrait style", icon: "👤", description: "Character portraits" },
    { name: "Abstract", icon: "🎭", description: "Abstract and artistic" },
  ];

  const [selectedStyle, setSelectedStyle] = useState(imageStyles[0]);
  const [input, setInput] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [copied, setCopied] = useState(false);
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const { isImageGenerating, image } = useSelector(state => state.api);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const token = await getToken();
    dispatch(generateImage({ input, selectedStyle: selectedStyle.name, publish: enabled, token }));
  };

  const downloadImage = () => {
    if (image) {
      const link = document.createElement('a');
      link.href = image;
      link.download = `ai-generated-${Date.now()}.png`;
      link.click();
    }
  };

  const copyImageLink = () => {
    if (image) {
      navigator.clipboard.writeText(image);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50/50 to-green-50/30">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 p-6 h-full">
        {/* Left Column - Input Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-green-500 to-green-400 rounded-xl">
              <ImageIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Image Generator</h1>
              <p className="text-gray-600">Create stunning images with AI</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="space-y-6">
            {/* Prompt Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Describe Your Image
                <span className="text-green-500 ml-1">*</span>
              </label>
              <div className="relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 placeholder-gray-400 resize-none min-h-[120px]"
                  placeholder="A majestic dragon flying over a medieval castle at sunset, highly detailed, epic fantasy art..."
                  rows={4}
                  required
                />
                <Zap className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mt-1">Be descriptive for better results</p>
            </div>

            {/* Style Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Image Style
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {imageStyles.map((style, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => setSelectedStyle(style)}
                    className={`p-3 rounded-xl text-center transition-all duration-200 transform hover:scale-105 border-2 ${
                      selectedStyle.name === style.name
                        ? 'bg-gradient-to-r from-green-50 to-blue-50 border-green-500 shadow-md'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{style.icon}</div>
                    <div className="text-xs font-medium text-gray-700">{style.name}</div>
                    <div className="text-[10px] text-gray-500 mt-1">{style.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Privacy Toggle */}
            <div className="flex items-center text-start justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-200">
              <div>
                <p className="font-medium text-gray-700">Make Image Public</p>
                <p className="text-sm text-gray-500">Share your creation with the community</p>
              </div>
              <button
                type="button"
                onClick={() => setEnabled(!enabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  enabled ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-200 shadow-lg ${
                    enabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Generate Button */}
            <button
              type="submit"
              disabled={isImageGenerating}
              className="w-full cursor-pointer bg-gradient-to-r from-green-500 to-green-400 text-white py-3 rounded-xl font-semibold hover:from-green-500 hover:to-green-600 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {isImageGenerating ? (
                <>
                  <RotateCw className="w-5 h-5 animate-spin" />
                  Generating Image...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Image
                </>
              )}
            </button>
          </form>

          {/* Tips */}
          <div className="mt-6 p-4 bg-green-50/50 text-start rounded-xl border border-green-100">
            <div className="flex items-center gap-2 text-green-700 mb-2">
              <Palette className="w-4 h-4" />
              <span className="font-semibold text-sm">Pro Tips</span>
            </div>
            <ul className="text-green-600 text-sm space-y-1">
              <li>• Include details about lighting, colors, and mood</li>
              <li>• Specify the composition and perspective</li>
              <li>• Mention artistic influences or specific styles</li>
            </ul>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex text-start items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-green-400 rounded-xl">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Generated Image</h2>
                <p className="text-gray-600">{selectedStyle.name} style</p>
              </div>
            </div>
            {image && (
              <div className="flex gap-2">
                <button
                  onClick={downloadImage}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  title="Download Image"
                >
                  <Download className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={copyImageLink}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  title="Copy Image Link"
                >
                  {copied ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Share className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Results Content */}
          <div className="flex-1 flex items-center justify-center">
            {isImageGenerating ? (
              <div className="flex flex-col items-center py-12">
                <div className="relative text-center mb-4">
                  <div className="w-20 text-center h-20 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                    <RotateCw className="w-8 h-8 text-green-500 animate-spin" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full blur opacity-20 animate-ping"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Creating Your Image</h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  Generating a {selectedStyle.name.toLowerCase()} image...
                </p>
              </div>
            ) : image ? (
              <div className="w-full h-full flex flex-col items-center">
                <div className="relative w-full max-w-md h-64 bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-200">
                  <img 
                    src={image} 
                    alt="AI Generated" 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">Style: {selectedStyle.name}</p>
                  {enabled && (
                    <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full mt-1">
                      Public Image
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No Image Generated Yet</h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  Describe your vision and click "Generate Image" to create amazing artwork.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateImages;