import TutorialGrid from "../common/grid";

;

export default function Tutorials() {

  return (
    <div className="w-full h-full bg-white rounded-xl shadow-md border" >
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
      ]} skeleton={6} />
    </div>
  )
}