import { useState } from "react"
import Footer from "../HomePage/Footer/Footer"
import MainSection from "./MainSection"
import MenShirts from "./MenShirts"
import Navbar from "../HomePage/Navbar/Navbar"
import SearchResultsWithFilters from "../HomePage/Search/SearchResultsWithFilters"
import SearchByImageResultsWithFilters from "../HomePage/Search/SearchByImageResultsWithFilters"

const CategoryPage = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [query, setQuery] = useState('');
  const [imageQuery, setImageQuery] = useState<File | null>(null);  return (
    
      <div className="dark:bg-gray-900 dark:text-white">
        <Navbar 
        onDebouncedSearch={setQuery}
        showCategories={showCategories}
        setShowCategories={setShowCategories}
        onImageUpload={setImageQuery}
      />
      {query.trim() !== '' && <SearchResultsWithFilters query={query} />}
      {imageQuery && <SearchByImageResultsWithFilters imageQuery={imageQuery} />}


      <MainSection />
      <MenShirts />
      <Footer />
      </div>
    
  )
}

export default CategoryPage
