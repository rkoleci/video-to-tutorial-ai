import { Search } from "lucide-react";
import React, { useState } from "react";
import TutorialGrid from "./grid";
import { useAuth } from "../hooks/useAuth";
import { useTutorialStore } from "../store/useTutorial";
import { useNavigate } from "react-router-dom";

interface IProps {
}

export default function MainSearch({ }: IProps) {
  const [query, setQuery] = useState('');
  const { isAuthed } = useAuth()
  const { createTutorial } = useTutorialStore()
  const naviate = useNavigate()

  const onSearch = (q: string) => {
    createTutorial(q, (id: string) => {
      naviate(`/home?id=${id}`)
    })
  }

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="p-4 w-full  bg-white rounded-xl shadow-md border flex flex-col ">
      <div className="w-full  flex   items-center justify-center  min-h-[20vh]">
        <div className="flex-1 w-full md:max-w-2xl mx-8 md:ps-8">
          <div className="relative flex items-center border-2 border-blue-400 rounded-xl overflow-hidden shadow-xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Paste youtube video url here..."
              className="w-full pl-4 pr-16 py-2 md:py-4 bg-white text-gray-600 placeholder-gray-400 focus:outline-none border-0"
            />

            <div
              onClick={handleSearch}
              className="absolute right-1 top-1 bottom-1 px-4 bg-red-400 hover:bg-red-500 text-white cursor-pointer rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <Search className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      <TutorialGrid tutorials={[
        {
          title: "Attend Nischal’s Birthday Party",
          description: "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)",
          priority: "Moderate",
          status: "Not Started",
          createdAt: "20/06/2023",
          imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=60",
        },
        {
          title: "Attend Nischal’s Birthday Party",
          description: "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)",
          priority: "Moderate",
          status: "Not Started",
          createdAt: "20/06/2023",
          imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=60",
        },
        {
          title: "Attend Nischal’s Birthday Party",
          description: "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)",
          priority: "Moderate",
          status: "Not Started",
          createdAt: "20/06/2023",
          imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=60",
        },
        {
          title: "Attend Nischal’s Birthday Party",
          description: "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)",
          priority: "Moderate",
          status: "Not Started",
          createdAt: "20/06/2023",
          imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=60",
        },
        {
          title: "Attend Nischal’s Birthday Party",
          description: "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)",
          priority: "Moderate",
          status: "Not Started",
          createdAt: "20/06/2023",
          imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=60",
        },
        {
          title: "Attend Nischal’s Birthday Party",
          description: "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)",
          priority: "Moderate",
          status: "Not Started",
          createdAt: "20/06/2023",
          imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=60",
        },
      ]} skeleton={isAuthed ? 3: 6}/>

    </div>
  )
}