const LoadingSpinner = ({ size = "medium", message }) => {
    const sizeClasses = {
      small: "w-5 h-5",
      medium: "w-8 h-8",
      large: "w-12 h-12",
    };
  
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <div
          className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-200 border-t-blue-600`}
        ></div>
        {message && <p className="mt-2 text-gray-600">{message}</p>}
      </div>
    );
  };
  
  export default LoadingSpinner;
  