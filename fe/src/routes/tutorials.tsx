import { useEffect } from "react";
import TutorialGrid from "../common/grid";
import { useTutorialStore } from "../store/useTutorial";

export default function Tutorials() {
  const { getMyTutorials,myTutorials, loadingMyTutorials } = useTutorialStore()

  useEffect(() => {
    getMyTutorials()
  }, [])

  return (
    <div className="w-full h-full bg-white rounded-xl shadow-md border" >
      <TutorialGrid loading={loadingMyTutorials} tutorials={myTutorials } skeleton={6} />
    </div>
  )
}


const list = [
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
]