import React from 'react';
import { FaShoppingCart, FaChartLine, FaUsers, FaMobileAlt, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import kareemImage from "../assets/images/kareem.jpg"
import mohamedImage from "../assets/images/mohamed.jpg"
import alaaImage from "../assets/images/alaa.jpeg"
import abdlrahmanImage from "../assets/images/abdlrahman.jfif"
import ahmedImage from "../assets/images/ahmed.jpeg"
import abdallahImage from "../assets/images/abdallah.jpeg"
import Footer from './HomePage/Footer/Footer';
const AboutUs: React.FC = () => {
  const features = [
    {
      icon: <FaShoppingCart className="h-8 w-8" />,
      title: "Price Comparison",
      description: "Compare prices across multiple stores to find the best deals and save money on your purchases."
    },
    {
      icon: <FaChartLine className="h-8 w-8" />,
      title: "Price History",
      description: "Track price changes over time to make informed buying decisions and catch the best discounts."
    },
    {
      icon: <FaUsers className="h-8 w-8" />,
      title: "User Community",
      description: "Join our community of smart shoppers to share deals, reviews, and shopping experiences."
    },
    {
      icon: <FaMobileAlt className="h-8 w-8" />,
      title: "Mobile Friendly",
      description: "Access our platform on any device with our responsive and user-friendly design."
    }
  ];

  const teamMembers = [
    {
      name: "Kareem Ragab",
      position: "Frontend Developer",
      image: kareemImage,
      social: {
        linkedin: "https://www.linkedin.com/in/kareem-ragab-17ba222bb",
        github: "https://github.com/KareemRagabAbdelhameed",
        twitter: "https://twitter.com"
      }
    },
    {
      name: "Mohamed Khaled",
      position: "Backend Developer",
      image: mohamedImage,
      social: {
        linkedin: "https://www.linkedin.com/in/mohamed-khaled-75842118a/",
        github: "https://github.com/moh18khaled",
        twitter: "https://twitter.com"
      }
    },
    {
      name: "Ahmed Mustafa",
      position: "Web Scrapping Engineer",
      image: ahmedImage,
      social: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        twitter: "https://twitter.com"
      }
    },
    {
      name: "Abdelrahman Mohamed",
      position: "ِBackend Developer",
      image: abdlrahmanImage,
      social: {
        linkedin: "https://www.linkedin.com/in/abdulrahman-muhammad-361a982ab/",
        github: "https://github.com/Abdlrhman00",
        twitter: "https://twitter.com"
      }
    },
    {
      name: "Alaa Saied",
      position: "AI&ML Engineer",
      image: alaaImage,
      social: {
        linkedin: "https://linkedin.com/in/alaa-saeed-a33633267",
        github: "https://github.com/Alaa0Saeed",
        twitter: "https://twitter.com"
      }
    },
    
    {
      name: "Abdallah Ahmed",
      position: "UI/UX Designer",
      image: abdallahImage,
      social: {
        linkedin: "https://www.linkedin.com/in/abdallah-ahmed-013b6b228",
        github: "https://github.com/Abdallah9oo",
        twitter: "https://twitter.com"
      }
    }
  ];

  return (
    <div>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto text-center mb-20"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to <Link to={"/"}><span className="text-customBlue">PriceChase</span></Link>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Your ultimate destination for smart shopping. We help you find the best deals
          and make informed purchasing decisions.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl 
                     transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-customBlue dark:text-blue-400 mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Mission Statement */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-4xl mx-auto bg-gradient-to-r from-blue-500 to-blue-600 
                 rounded-2xl p-8 sm:p-12 text-white shadow-xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
        <p className="text-lg leading-relaxed text-blue-50 text-center">
          At PriceChase, we're committed to empowering consumers with the tools and information 
          they need to make smart purchasing decisions. Our platform combines advanced price 
          tracking technology with a user-friendly interface to help you save time and money.
        </p>
      </motion.div>
      
      {/* Team Members Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="max-w-7xl mx-auto mt-20"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg"
            >
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                {/* Social Links Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black/80 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col justify-end items-center p-6">
                  <div className="flex space-x-4 mb-4">
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-customBlue transition-colors duration-200"
                    >
                      <FaLinkedin className="h-6 w-6" />
                    </a>
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-customBlue transition-colors duration-200"
                    >
                      <FaGithub className="h-6 w-6" />
                    </a>
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-customBlue transition-colors duration-200"
                    >
                      <FaTwitter className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {member.position}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
    <Footer />
    </div>
  );
};

export default AboutUs;