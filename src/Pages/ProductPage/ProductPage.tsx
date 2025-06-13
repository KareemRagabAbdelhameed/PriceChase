import { useState } from "react"
import Footer from "../HomePage/Footer/Footer"
import ProductDetails from "./ProductDetails"
import ProductDiscription from "./ProductDiscription"
import UserReviews from "./UserReviews"
import Navbar from "../HomePage/Navbar/Navbar"
import SearchResultsWithFilters from "../HomePage/Search/SearchResultsWithFilters"
import SearchByImageResultsWithFilters from "../HomePage/Search/SearchByImageResultsWithFilters"

const ProductPage = () => {
  const [query, setQuery] = useState('');
  const [showCategories, setShowCategories] = useState(false);
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
      <ProductDetails />
      <ProductDiscription />
      <UserReviews />
      {/* <Feedback /> */}
      <Footer />
    </div>
  )
}

export default ProductPage
