import React, { useRef, useState, useEffect } from 'react';
import { useTutorialStore } from '../store/useTutorial';

interface TranscriptSentence {
  time: number; // in seconds
  text: string;
}

const transcriptData: TranscriptSentence[] = [
  { time: 0, text: "Welcome to the tutorial. In this video, we'll walk through how to use our platform." },
  { time: 10, text: "First, let's look at how to set up your account and profile." },
  { time: 22, text: "Next, we’ll explore the dashboard and its key features." },
  { time: 35, text: "Finally, we’ll discuss how to manage your tasks and stay productive." },
];

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

export default function VideoTranscriptPlayer() {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);

  // Simulate data loading (replace with real fetch logic)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds loading
    return () => clearTimeout(timer);
  }, []);

  const seekToTime = (seconds: number) => {
    const iframe = videoRef.current;
    if (!iframe) return;

    iframe.contentWindow?.postMessage(
      JSON.stringify({
        event: 'command',
        func: 'seekTo',
        args: [seconds, true],
      }),
      '*'
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Title */}
      <h3 className="text-xl font-bold mb-4 mx-auto text-[#1a1a1a]">Video Title Goes Here</h3>

      {/* Video or Video Skeleton */}
      {loading ? (
        <div className="w-full mx-auto aspect-video rounded-xl bg-gray-300 animate-pulse border border-gray-300 w-[560px] sm:w-full sm:max-w-md"></div>
      ) : (
        <div className="w-full mx-auto aspect-video rounded-xl overflow-hidden border border-gray-300 w-[560px] sm:w-full sm:max-w-md">
          <iframe
            ref={videoRef}
            id="youtube-player"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      )}

      {/* Transcript Section */}
      <div className="bg-white rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Transcript</h2>

        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-5 bg-gray-300 rounded animate-pulse"
                style={{ width: i === 2 ? '80%' : i === 1 ? '95%' : '90%' }}
              ></div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {transcriptData.map((sentence, index) => (
              <div
                key={index}
                onClick={() => seekToTime(sentence.time)}
                className="cursor-pointer hover:bg-gray-100 p-2 rounded transition"
              >
                <span className="text-blue-500 font-mono text-sm mr-3">
                  [{formatTime(sentence.time)}]
                </span>
                <span className="text-gray-800">{sentence.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
