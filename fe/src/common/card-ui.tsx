import React from 'react';
import type { Tutorial } from '../types';

interface TutorialCardProps  extends Tutorial{
  onClick: () => void;
}

// TODO `https://img.youtube.com/vi/${videoId}/${quality}.jpg`
export default function TutorialCard({
  title,
  description,
  priority,
  status,
  createdAt,
  imageUrl,
  onClick
}: TutorialCardProps) {

  return (
    <div onClick={onClick} className="cursor-pointer hover:bg-gray-100 flex justify-between items-start p-4 bg-white border border-gray-300 rounded-2xl shadow-sm max-w-2xl w-full relative">
      {/* Top-right menu */}
      <div className="absolute top-2 right-2 text-gray-400 text-xl">⋯</div>

      {/* Left side content */}
      <div className="flex-1 pr-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 rounded-full border-2 border-red-500" />
          <h2 className="text-lg font-bold text-black">{title}</h2>
        </div>

        <p className="text-gray-500 line-through underline">
          {description}
        </p>

        {/* Footer info */}
        <div className="flex gap-6 mt-4 text-sm text-gray-600">
          {/* <div>
            Priority: <span className="text-sky-500 font-medium">{priority}</span>
          </div> */}
          <div>
            Status: <span className="text-red-500 font-medium">{status}</span>
          </div>
          <div className="text-gray-400">Created on: {createdAt}</div>
        </div>
      </div>

      {/* Thumbnail Image */}
      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={imageUrl}
          alt="Tutorial thumbnail"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
