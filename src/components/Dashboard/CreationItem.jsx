import React from "react";
import Markdown from "react-markdown";
import { 
  FileText, 
  ImageIcon, 
  Edit, 
  Hash, 
  Users, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  CheckCircle, 
  Eye,
  Calendar,
  Clock,
  ExternalLink,
  Sparkles
} from "lucide-react";

const CreationItem = ({ item }) => {
  const [expand, setExpand] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'article': return <Edit className="w-4 h-4 text-white" />;
      case 'blog-title': return <Hash className="w-4 h-4 text-white" />;
      case 'image': return <ImageIcon className="w-4 h-4 text-white" />;
      case 'resume-review': return <Users className="w-4 h-4 text-white" />;
      default: return <FileText className="w-4 h-4 text-white" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'article': return 'from-blue-500 to-blue-400';
      case 'blog-title': return 'from-purple-500 to-purple-400';
      case 'image': return 'from-green-500 to-green-400';
      case 'resume-review': return 'from-orange-500 to-orange-400';
      default: return 'from-gray-500 to-gray-400';
    }
  };

  const getTypeLabel = (type) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(item.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  return (
    <div
      onClick={() => setExpand(!expand)}
      className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100/50 p-6 cursor-pointer transition-all duration-300 hover:shadow-md hover:border-gray-200/80"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0 items-center">
          <div className="flex items-start gap-3 mb-2">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${getTypeColor(item.type)}`}>
              {getTypeIcon(item.type)}
            </div>
            <div>
              <span className={`inline-flex items-center mt-1 gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getTypeColor(item.type)} text-white`}>
                {getTypeIcon(item.type)}
                {getTypeLabel(item.type)}
              </span>
            </div>
          </div>
          
          <h3 className="text-lg text-start font-semibold text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors">
            {item.prompt}
          </h3>
          
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(item.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Copy Button */}
          {item.type !== 'image' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard();
              }}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200 opacity-0 group-hover:opacity-100"
              title="Copy content"
            >
              {copied ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          )}
          
          {/* Expand Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpand(!expand);
            }}
            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200 transform group-hover:scale-110"
          >
            {expand ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {expand && (
        <div className="mt-4 pt-4 border-t border-gray-100/50 animate-in fade-in duration-300">
          {item.type === 'image' ? (
            <div className="space-y-4">
              <div className="relative bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-200">
                <img 
                  src={item.content} 
                  alt={item.prompt}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex items-center justify-between">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(item.content, '_blank');
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Full Size
                </button>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  AI Generated Image
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  Generated Content
                </h4>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard();
                  }}
                  className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Text
                    </>
                  )}
                </button>
              </div>
              
              <div className="bg-gray-50/50 rounded-xl p-4 max-h-64 overflow-y-auto">
                <div className="prose prose-sm max-w-none">
                  <Markdown
                    components={{
                      h1: ({node, ...props}) => <h3 className="text-lg text-start font-semibold text-gray-900 mb-3" {...props} />,
                      h2: ({node, ...props}) => <h4 className="text-base text-start font-medium text-gray-800 mb-2" {...props} />,
                      p: ({node, ...props}) => <p className="text-start text-gray-700 leading-relaxed mb-3" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc list-inside text-start text-gray-700 space-y-1 mb-3" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal list-inside text-start text-gray-700 space-y-1 mb-3" {...props} />,
                      li: ({node, ...props}) => <li className="text-start text-gray-700" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
                      em: ({node, ...props}) => <em className="italic text-gray-800" {...props} />
                    }}
                  >
                    {item.content}
                  </Markdown>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;