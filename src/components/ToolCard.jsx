function ToolCard({ tool }) {
  return (
    <a
      href={tool.url}
      className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-300 group hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl">{tool.icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {tool.name}
          </h3>
          <p className="mt-1 text-sm text-gray-600">{tool.description}</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {tool.category}
            </span>
          </div>
        </div>
        <svg
          className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </a>
  );
}

export default ToolCard;
