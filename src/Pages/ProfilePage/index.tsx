import { useState } from "react"
import Footer from "../HomePage/Footer/Footer"
import Navbar from "../HomePage/Navbar/Navbar"
import ProfileDetails from "./ProfileDetails"
import YourWishlist from "./YourWishlist"
import SearchResultsWithFilters from "../HomePage/Search/SearchResultsWithFilters"
import SearchByImageResultsWithFilters from "../HomePage/Search/SearchByImageResultsWithFilters"

const ProfilePage = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [query, setQuery] = useState('');
  const [imageQuery, setImageQuery] = useState<File | null>(null);
  return (
    <div>
<Navbar 
        onDebouncedSearch={setQuery}
        showCategories={showCategories}
        setShowCategories={setShowCategories}
        onImageUpload={setImageQuery}
      />
      {query.trim() !== '' && <SearchResultsWithFilters query={query} />}
      {imageQuery && <SearchByImageResultsWithFilters imageQuery={imageQuery} />}      <ProfileDetails />
      <YourWishlist />
      <Footer />
    </div>
  )
}

export default ProfilePage
