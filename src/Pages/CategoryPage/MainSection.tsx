import { useParams } from "react-router-dom";
import menImage from "../../assets/images/image 12.png"
import womenImage from "../../assets/images/womenImage.png"
import boyImage from "../../assets/images/boyImage.png"
import girlImage from "../../assets/images/girlImage.png"
import apiBaseUrl from "../../config/axiosConfig";
import { useEffect, useState } from "react";
const MainSection = () => {
  const {id} = useParams();
  const [categoryName,setCategoryName] = useState<string>("");
  // Fetch subcategories if not already fetched
  useEffect(()=>{
    const fetchCategoryName = async()=>{
      try {
        const response = await apiBaseUrl.get(`/categories/${id}/subcategories`);
        setCategoryName(response.data.result.CategoryName);
    } catch (error) {
        console.log(error);
    }
    }
    fetchCategoryName();
  },[id])

  // Function to render different content based on categoryName
  const renderImageBasedOnCategory = () => {
    if (typeof categoryName === 'string') {
      switch (categoryName.toLowerCase()) {
        case "men":
          return (
            <img 
              src={menImage} 
              alt="Men's collection" 
              className='w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] sm:scale-125 object-contain mx-auto' 
            />
          );
        case "women":
          return (
            <img 
              src={womenImage} 
              alt="Women's collection" 
              className='w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] sm:scale-125 object-contain mx-auto' 
            />
          );
          case "girl":
          return (
            <img 
              src={girlImage}
              alt="Girl's collection" 
              className='w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] sm:scale-125 object-contain mx-auto' 
            />
          );
          case "boy":
          return (
            <img 
              src={boyImage} 
              alt="Boy's collection" 
              className='w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] sm:scale-125 object-contain mx-auto' 
            />
          );
      }
    }
    return null;
  };
    

  return (
    <div className="w-4/5 mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold mt-16">{categoryName}</h1>
       <div className=' bg-[#EAEAEA] shadow-xl  dark:bg-gray-700 dark:text-white px-6 rounded-md mt-10 grid grid-cols-1 sm:grid-cols-2 py-20'>
            {/* Text content section */}
            <div className='flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative'>
             <h1 className="text-xl sm:text-3xl font-bold">Best {categoryName}</h1>   
            <h2 className='text-3xl sm:text-5xl font-bold '>Collection</h2>
            <p className='text-sm'>Great Material and sleek look for all genders.</p>
            {/* <div>
              <button className='bg-customBlue hover:scale-105 duration-200 text-white py-2 px-8 rounded-md'>Shop Now</button>
            </div> */}
            </div>
            {/* image section */}
            <div className='order-1 sm:order-2'>
              <div className='relative'>
                {renderImageBasedOnCategory()}
              </div>
            </div>
            </div> 
    </div>
  )
}

export default MainSection
