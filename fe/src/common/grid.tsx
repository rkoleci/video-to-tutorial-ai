import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import TutorialCard from './card-ui';
import { useNavigate } from 'react-router-dom';

export interface Tutorial {
  title: string;
  description: string;
  priority: string;
  status: string;
  createdAt: string;
  imageUrl: string;
}



// Skeleton version of TutorialCard
function TutorialCardSkeleton() {
  return (
    <div className="border rounded-lg shadow p-4 animate-pulse flex flex-col space-y-4 bg-white">
      <div className="h-40 bg-gray-300 rounded-md" />
      <div className="h-6 bg-gray-300 rounded w-3/4" />
      <div className="h-4 bg-gray-300 rounded w-full" />
      <div className="h-4 bg-gray-300 rounded w-5/6" />
      <div className="flex justify-between mt-auto">
        <div className="h-4 bg-gray-300 rounded w-16" />
        <div className="h-4 bg-gray-300 rounded w-20" />
      </div>
    </div>
  );
}

interface IProps {
  tutorials: Tutorial[],
  skeleton?: number
}

export default function TutorialGrid({ tutorials, skeleton = 3 }: IProps) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  // Simulate data loading (replace with real fetch logic)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2 sec loading
    return () => clearTimeout(timer);
  }, []);

  const isEmpty = tutorials.length === 0;

  const onClick = (id: string) => {
    navigate(`/home?id=${id}`)
  }

  return (
    <div className="px-4 py-4 min-h-[20vh]">
      {loading ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {[...Array(skeleton)].map((_, i) => (
            <TutorialCardSkeleton key={i} />
          ))}
        </div>
      ) : isEmpty ? (
        <div className="flex flex-col items-center justify-center text-center text-gray-400 h-full">
          <AlertCircle className="w-16 h-16 mb-4 text-gray-300" />
          <p className="text-xl font-semibold">No tutorials found</p>
          <p className="text-sm mt-1">Create a new tutorial to get started</p>
        </div>
      ) : (
        <div
          className={`grid gap-6 ${
            tutorials.length === 1
              ? 'grid-cols-1'
              : 'grid-cols-1 md:grid-cols-3'
          }`}
        >
          {tutorials.map((tutorial, index) => (
            <TutorialCard key={index} {...tutorial} onClick={() => onClick('1234')} />
          ))}
        </div>
      )}
    </div>
  );
}
