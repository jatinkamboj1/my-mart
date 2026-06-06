"use client"; 
import React, { useEffect, useState } from "react";
import { getNavCategory } from "@/app/api/homepage";  

const Navbar = () => {   
  const [categories, setCategories] = useState([]);    

  const headerdata = async () => {     
    const response = await getNavCategory();     
    setCategories(response);   
  };

  // Fetch categories from API   
  useEffect(() => {     
    headerdata();   
  }, []);    
  

  const [activeMenu, setActiveMenu] = useState(null);    

  const toggleMenu = (id) => {     
    setActiveMenu(activeMenu === id ? null : id);   
  };    

  return (    
      <navbar className="Navbar">
        <ul className="NavbarLinks">
          <li className="NavbarLinksItem">
            <span className="NavbarLinksItemText">Categories</span>
            <div className="NavbarCategory">
              <ul style={{position:"relative"}}>
                {categories.map((category) => (                                 
                  <li key={category.id} className="NavbarCategoryLinks">
                    <a className="NavbarCategoryLinksText" href={`/category/${category.slug}`}> 
                      <span itemProp="name">{category.categoryName}</span>
                    </a>
                    {category.subCategories.length > 0 && (                                     
                      <div className="NavbarSubCategory">
                          {category.subCategories.map((sub) => (                                                      
                            <SubCategory key={sub.id} subCategory={sub} />  
                          ))}
                      </div>
                    )}
                  </li>
                ))}                           
              </ul>
            </div>
          </li>
          <li className="NavbarLinksItem">
            <span className="NavbarLinksItemText">Special Offers</span>
            <div className="NavbarCategory">
              <ul style={{position:"relative"}}>
                <li className="NavbarCategoryLinks">
                  <a className="NavbarCategoryLinksText" href="/category/essentials"> 
                    <span itemProp="name">Essentials</span>
                  </a>
                </li>
                <li className="NavbarCategoryLinks">
                  <a className="NavbarCategoryLinksText" href="/category/clearance"> 
                    <span itemProp="name">clearance</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div className="NavbarIcons">
          <a href="#" title="Catalogues" className="NavbarIconsLink">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" xmlSpace="preserve">
              <path d="M16.854 16.087 24 9.298l-4.457-4.691zm5.53-6.83-3.545 3.367 1.333-5.694zm-3.551-5.13-.025-.006-6.332-1.483-.023.099 3.874 12.094zm-4.712.071 3.338.782-1.304 5.568zm-8.784.355.228.712 10.07 10.07.006-.019-4.086-12.755zm1.768.634 3.711-1.189 2.309 7.209zm9.021 11.673.034-.035-.018-.018L4.617 5.281l-.011.011L0 9.898l11.543 11.543zM4.617 6.898l9.926 9.926-3 3-9.926-9.926z"/>
              <path d="M11.579 15.895a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
            </svg>
            <span className="">Catalogues</span>
          </a>
          <a href="#" title="Contact us" className="NavbarIconsLink">
            <svg width="24" height="24" viewBox="0 0 15.36 15.36" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.672 6.515C12.474 4.48 11.27 1.28 7.552 1.28s-4.922 3.2-5.12 5.235A1.785 1.785 0 0 0 1.28 8.192v.896a1.792 1.792 0 1 0 3.584 0v-.896a1.8 1.8 0 0 0-1.12-1.658c.128-1.178.755-3.974 3.808-3.974s3.674 2.797 3.802 3.974a1.79 1.79 0 0 0-1.114 1.658v.896a1.8 1.8 0 0 0 1.018 1.613c-.269.506-.954 1.19-2.637 1.395a1.28 1.28 0 1 0-1.069 1.984 1.28 1.28 0 0 0 1.139-.71c2.746-.314 3.622-1.728 3.898-2.56a1.785 1.785 0 0 0 1.235-1.722v-.896a1.79 1.79 0 0 0-1.152-1.677M3.584 9.088a.512.512 0 1 1-1.024 0v-.896a.512.512 0 1 1 1.024 0zm7.936-.896a.512.512 0 1 1 1.024 0v.896a.512.512 0 1 1-1.024 0z" fill-rule="evenodd"/>
            </svg>
            <span className="">Contact us</span>
          </a>  
        </div>
      </navbar>
  ); 
};

const SubCategory = ({ subCategory }) => {   
  const abc = subCategory.subCategories.length;   
  return (
    <>
    {/* <li className="">  */}
      <a className={`NavbarSubCategoryItemText ${abc > 0 ? "NavbarSubCategoryItemTextBold" : ""}`} href={`/category/${subCategory.slug}`}> 
        {subCategory.categoryName}
      </a> 
      {/* {abc > 0 && (           
        <ul className=""> 
          {subCategory.subCategories.map((sub) => (               
            <SubCategory key={sub.id} subCategory={sub} /> 
          ))}           
        </ul> 
      )}      */}
    {/* </li> */}
    {subCategory.subCategories.map((sub) => (               
      <SubCategory key={sub.id} subCategory={sub} /> 
    ))}
    </>
  ); 
};

export default Navbar;
