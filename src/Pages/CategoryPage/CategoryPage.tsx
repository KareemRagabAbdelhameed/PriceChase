import { useState } from "react"
import Footer from "../HomePage/Footer/Footer"
import MainSection from "./MainSection"
import MenShirts from "./MenShirts"
import SearchResults from "../HomePage/Search/SearchResults"
import SearchByImageResults from "../HomePage/Search/SearchByImageResults"
import Navbar from "../HomePage/Navbar/Navbar"

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
      {query.trim() !== '' && <SearchResults query={query} />}
      {imageQuery && <SearchByImageResults imageQuery={imageQuery} />}


      <MainSection />
      <MenShirts />
      <Footer />
      </div>
    
  )
}

export default CategoryPage
