import React from 'react';

const FieldError = ({ fielderror }) => {
  return (
    <>
      {fielderror !== null ? (
        <div className="flex justify-center">
          <p className="font-semibold text-xs sm:text-sm text-red-500">{fielderror}</p>
        </div>
      ) : null}
    </>
  );
};

export default FieldError;