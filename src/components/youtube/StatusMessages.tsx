import React from 'react';

export const LoadingState = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal"></div>
  </div>
);

export const ErrorMessage = ({ message }: { message: string | null }) =>
  message ? <div className="text-yellow text-center mb-6">{message}</div> : null;
