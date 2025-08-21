import TutorialGrid from "../common/grid";
import MainSearch from "../common/main-search";
import VideoTranscriptPlayer from "../common/video-transcript-player";
import { useAuth } from "../hooks/useAuth";
import { useSearchParams } from 'react-router-dom';

export default function Home() {
    const { isAuthed } = useAuth()

    const [searchParams] = useSearchParams();

    // Get the 'id' param from the query string
    const id = searchParams.get('id');

    console.log('ID from query:', id); // Use it as needed


    return (
        <div className="w-full h-full bg-white rounded-xl shadow-md border" >
            {id ? <VideoTranscriptPlayer /> : <MainSearch />}
        </div>

    )
}