import Hero from "./Hero/Hero"
import Navbar from "./Navbar/Navbar"
import DicountSection from "./DiscountSection/DicountSection"
import PopularProducts from "./PopularProducts/PopularProducts"
import Footer from "./Footer/Footer"
import { useState } from "react"
import SearchResultsWithFilters from "./Search/SearchResultsWithFilters"
import SearchByImageResultsWithFilters from "./Search/SearchByImageResultsWithFilters"

const HomePage = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [query, setQuery] = useState('');
  const [imageQuery, setImageQuery] = useState<File | null>(null);

  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <Navbar 
        onDebouncedSearch={setQuery}
        showCategories={showCategories}
        setShowCategories={setShowCategories}
        onImageUpload={setImageQuery}
      />
      {query.trim() !== '' && <SearchResultsWithFilters query={query} />}
      {imageQuery && <SearchByImageResultsWithFilters imageQuery={imageQuery} />}
      
        
          <Hero />
          <PopularProducts />
          <DicountSection />
        
      
      <Footer />
    </div>
  )
}

export default HomePage
