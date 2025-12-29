import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex items-baseline gap-3">
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
        {text1}{" "}
        <span className="text-amber-700">
          {text2}
        </span>
      </h2>
    </div>
  );
};

export default Title;