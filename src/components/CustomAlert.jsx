const positionClasses = {
  "bottom-center": "bottom-5 left-1/2 transform -translate-x-1/2",
};

const typeStyles = {
  success: "bg-[#1f2937] border-green-500",
  error: "bg-[#1f2937] border-red-500",
};

const icons = {
  success: "✔",
  error: "✖",
};

const CustomAlert = ({
  show,
  type = "success",
  message,
  position = "bottom-center",
}) => {
  if (!show) return null;

  return (
    <div
      className={`fixed z-50 flex items-center gap-3 p-4 rounded-xl shadow-lg text-white border-l-4
        ${positionClasses[position]}
        ${typeStyles[type]}`}
    >
      <span className="text-lg">
        {icons[type]}
      </span>
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default CustomAlert;