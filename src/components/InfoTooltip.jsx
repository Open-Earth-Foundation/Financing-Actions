const InfoTooltip = ({ content }) => (
  <div className="group relative inline-block ml-2">
    <span className="cursor-help text-gray-400 hover:text-gray-600">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    </span>
    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute z-10 w-64 p-2 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 text-sm text-gray-700">
      {content}
    </div>
  </div>
);

export default InfoTooltip;