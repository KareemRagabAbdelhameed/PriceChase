import DiscountSlider from "./DiscountSlider"

const DicountSection = () => {
  return (
    <div id="discount-products" className="mb-24">
      <div className='container'>
        {/* header section  */}
        <div className="text-center max-w-[600px] mx-auto">
            <h1 data-aos="fade-up" className="text-3xl font-semibold relative pb-4">
              Discount Section
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-customBlue rounded-full"></div>
            </h1>
        </div>
        {/* body section  */}
        <DiscountSlider />
        
      </div>
    </div>
  )
}

export default DicountSection
