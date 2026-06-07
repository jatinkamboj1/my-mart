"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { getNavCategory } from "@/app/api/homepage";
import { useSession, signOut } from "next-auth/react";
import useWishlistStore from "@/store/wishlistStore";
import useCartStore from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { ChevronDown, Phone, Facebook, Instagram, Twitter, MapPin } from "lucide-react";
import { fetchSettingsByKeys } from "@/app/api/siteSettings";
import { safeSanitize } from "@/lib/utils";


const Header = () => {
  const router = useRouter();

  const { data: session, status } = useSession();
  const [settings, setSettings] = useState({});

  const isLoggedIn = status === "authenticated";
  const token = session?.accessToken;
  const fetchWishlist = useWishlistStore(s => s.fetchWishlist);
  const wishlist = useWishlistStore(s => s.wishlist);

  const fetchCart = useCartStore(s => s.fetchCart);
  const cartCount = useCartStore(s => s.cartCount);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
  async function load() {
    try {
      const [settingsData, categoryData] = await Promise.all([
        fetchSettingsByKeys(["search.heading"]),
        getNavCategory(),
      ]);

      setSettings(settingsData);
      setCategories(categoryData || []);
    } catch (err) {
      console.error(err);
    }
  }
  load();
}, []);
  /* -------------------- AUTH DEPENDENT DATA -------------------- */
  useEffect(() => {
    if (isLoggedIn && token) {
      fetchWishlist(token);
      fetchCart(token);
    }
  }, [isLoggedIn, token, fetchWishlist, fetchCart]);

  /* ------------------------ SCROLL ------------------------ */
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 49);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------------- SEARCH ---------------------- */
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search/${search}`);
    }
  }, [search, router]);


  /* ----------------------- LOGOUT ----------------------- */
  const handleLogout = useCallback(async () => {
    await signOut({ callbackUrl: "/" });
  }, []);

  const splitIntoColumns = useCallback((items, cols = 3) => {
    const perCol = Math.ceil(items.length / cols);
    return Array.from({ length: cols }, (_, i) =>
      items.slice(i * perCol, (i + 1) * perCol)
    );
  }, []);

  const memoizedColumns = useMemo(() => {
  return categories.map(cat => ({
    id: cat.id,
    columns: splitIntoColumns(cat.subCategories || [], 3)
  }));
}, [categories, splitIntoColumns]);

  return (
    <header className="header-area header-wide">
      <div style={{ backgroundColor: "var(--theme-active-color)", color: "#fff", padding: "8px 0", fontSize: "14px" }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-3 align-items-center">
              <a href="#" style={{ color: "#fff", display: "flex", alignItems: "center" }}><Facebook size={16} /></a>
              <a href="#" style={{ color: "#fff", display: "flex", alignItems: "center" }}><Instagram size={16} /></a>
              <a href="#" style={{ color: "#fff", display: "flex", alignItems: "center" }}><Twitter size={16} /></a>
            </div>
            <div className="text-center flex-grow-1">
              Free Shipping Anywhere in India for orders above Rs 499
            </div>
            <div>
              <a href="/stores" style={{ color: "#fff", display: "flex", alignItems: "center", gap: "4px" }}>
                <MapPin size={16} /> Locate Stores
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className=" main-header d-none d-lg-block">
        <div className={`header-main-area sticky`}>
          <div className="container">
            <div
              className="row align-items-center justify-content-between position-relative"
              style={{ width: "100%" }}
            >
              <div className="col-md-2 col-lg-2 col-xl-3">
                <div className="logo">
                  <a href="/">
                    <div style={{
                      maskImage: 'url(/logo.png)',
                      WebkitMaskImage: 'url(/logo.png)',
                      maskSize: 'contain',
                      WebkitMaskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                      maskPosition: 'left center',
                      WebkitMaskPosition: 'left center',
                      backgroundColor: 'var(--theme-active-color)',
                      height: '45px',
                      width: '160px',
                      display: 'inline-block'
                    }} role="img" aria-label="Brand Logo"></div>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-xl-5">
                {settings["search.heading"] && <div className="promo-unit mb-3">
                  <span className="promo-unit__text-group">
                    <div
                      className="promo-unit__text"
                      dangerouslySetInnerHTML={{
                        __html: safeSanitize(settings["search.heading"]),
                      }}
                    />
                  </span>
                </div>}
                <div className="header-search-container">
                  <form className="header-search-box" onSubmit={handleSearch}>
                    <input
                      type="text"
                      name="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="header-search-field"
                      placeholder="Search Here..."
                    />
                    <button type="submit" className="header-search-btn">
                      <i className="pe-7s-search"></i>
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-md-4 col-lg-4 col-xl-3">
                <div className="header-configure-area mb-3">
                  <ul className="nav justify-content-end">
                    <li className="user-hover">
                      <span className="priceTxt">
                        Ex. VAT
                        {/* {incVat ? "Inc. VAT " : "Ex. VAT "} */}
                        {/* <ChevronDown size={"0.9rem"} /> */}
                      </span>
                      {/* <ul className="dropdown-list" style={{ width: "90px", padding: "10px 6px" }}>
                        <li>
                          <a onClick={() => handleVat(true)}>Inc. VAT</a>
                        </li>
                        <li>
                          <a onClick={() => handleVat(false)}>Ex. VAT</a>
                        </li>
                      </ul> */}
                    </li>
                  </ul>
                </div>
                <div className="header-right d-flex align-items-center justify-content-end">
                  <div className="header-configure-area">
                    {isLoggedIn ? (
                      <ul className="nav justify-content-end">
                        <li>
                          <a href="/cart" className="minicart-btn">
                            <i className="pe-7s-cart"></i>
                            <div className="notification">{cartCount ?? 0}</div>
                          </a>
                          <span className="helpTxt">Basket</span>
                        </li>
                        <li>
                          <a href="/wishlist">
                            <i className="pe-7s-like"></i>
                            <div className="notification">
                              {wishlist.length ?? 0}
                            </div>
                          </a>
                          <span className="helpTxt">Wishlist</span>
                        </li>
                        <li className="user-hover">
                          <a href="/my-account">
                            <i className="pe-7s-user"></i>
                          </a>
                          <span className="helpTxt">Account</span>
                        </li>
                      </ul>
                    ) : (
                      <ul className="nav justify-content-end">
                        <li>
                          <a href="/signin" className="minicart-btn">
                            <i className="pe-7s-cart"></i>
                            <div className="notification">{0}</div>
                          </a>
                          <span className="helpTxt">Basket</span>
                        </li>
                        <li>
                          <a href="/signin">
                            <i className="pe-7s-like"></i>
                            <div className="notification">
                              {0}
                            </div>
                          </a>
                          <span className="helpTxt">Wishlist</span>
                        </li>
                        <li className="user-hover">
                          <a href="/signin">
                            <i className="pe-7s-user"></i>
                          </a>
                          <span className="helpTxt">Account</span>
                          <ul className="dropdown-list">
                            <li>
                              <a href="/signin">login</a>
                            </li>
                            <li>
                              <a href="/signup">register</a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`mobile-header d-lg-none d-md-block sticky ${!isScrolled ? "" : "is-sticky"
          }`}
      >
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-12">
              <div className="mobile-main-header">
                <div className="mobile-logo">
                  <a href="/">
                    <div style={{
                      maskImage: 'url(/logo.png)',
                      WebkitMaskImage: 'url(/logo.png)',
                      maskSize: 'contain',
                      WebkitMaskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                      maskPosition: 'left center',
                      WebkitMaskPosition: 'left center',
                      backgroundColor: 'var(--theme-active-color)',
                      height: '35px',
                      width: '120px',
                      display: 'inline-block'
                    }} role="img" aria-label="Brand Logo"></div>
                  </a>
                </div>
                <div className="mobile-menu-toggler">
                  {isLoggedIn ? (
                    <>
                      <div className="mini-cart-wrap mx-2">
                        <a href="/cart">
                          <i className="pe-7s-cart"></i>
                          <div className="notification">{cartCount ?? 0}</div>
                        </a>
                      </div>
                      <div className="mini-cart-wrap mx-2 d-none d-md-block">
                        <a href="/wishlist">
                          <i className="pe-7s-like"></i>
                          <div className="notification">
                            {wishlist.length ?? 0}
                          </div>
                        </a>
                      </div>
                      <div className="mini-cart-wrap mx-2 d-none d-md-block">
                        <a href="/my-account">
                          <i className="pe-7s-user"></i>
                        </a>
                      </div>
                    </>
                  ) : (
                    <div className="mini-cart-wrap">
                      <a href="/signin">
                        <i className="pe-7s-user"></i>
                      </a>
                    </div>
                  )}
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="mobile-menu-btn"
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {categories?.length > 0 && (
        <navbar
          className={`Navbar d-lg-flex d-none sticky ${!isScrolled ? "" : "is-sticky"
            }`}
        >
          <ul className="NavbarLinks">
            {categories.map((category) => (
              <li key={category.id} className="NavbarLinksItem">

                {/* TOP MENU ITEM */}
                <a href={`/category/${category.slug}`} className="NavbarLinksItemText">
                  {category.categoryName}
                  {category.menuType === "mega" && category.subCategories?.length > 0 && (<ChevronDown size={"1rem"} />)}
                </a>

                {/* ONLY SHOW MEGA MENU IF TYPE = MEGA */}
                {category.menuType === "mega" && category.subCategories?.length > 0 && (() => {

                  const columns = memoizedColumns.find(c => c.id === category.id);

                  return (
                    <div className="NavbarMegaMenu">
                      <div className="row w-full">

                        {/* ✅ 3 DYNAMIC COLUMNS */}
                        {columns.columns.map((colGroup, index) => (
                          <div key={index} className="col col-lg-3">

                            {colGroup.map((col) => (
                              <div key={col.id} className="NavbarMegaBlock">

                                <a
                                  href={`/category/${col.slug}`}
                                  className="NavbarMegaTitle subHeading"
                                >
                                  {col.categoryName}
                                </a>

                                <ul>
                                  {col.subCategories?.map((item) => (
                                    <li key={item.id}>
                                      <a href={`/category/${item.slug}`}>
                                        {item.categoryName}
                                      </a>
                                    </li>
                                  ))}
                                </ul>

                              </div>
                            ))}

                          </div>
                        ))}

                        {/* ✅ IMAGE COLUMN */}
                        <div className="col col-lg-3">
                          <div className="NavbarMegaImages">

                            {category.subCategories
                              .filter((col) => col.images?.length)
                              .slice(0, 3) // like screenshot
                              .map((col) => (
                                <img
                                  key={col.id}
                                  src={col.images[0]?.url}
                                  alt={col.categoryName}
                                />
                              ))}

                          </div>
                        </div>

                      </div>
                    </div>
                  );

                })()}

              </li>
            ))}
          </ul>
        </navbar>
      )}

      <aside className={`off-canvas-wrapper ${isMenuOpen ? "open" : ""}`}>
        <div
          className="off-canvas-overlay"
          onClick={() => setIsMenuOpen(false)}
        ></div>
        <div className="off-canvas-inner-content">
          <div
            className="btn-close-off-canvas"
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="pe-7s-close"></i>
          </div>
          <div className="off-canvas-inner">
            {isLoggedIn && (
              <div
                className="header-configure-area"
                style={{ padding: "12px 0", borderBottom: "1px solid #eee" }}
              >
                <ul className="nav justify-content-evenly">
                  <li>
                    <a href="/cart" className="minicart-btn">
                      <i className="pe-7s-cart"></i>
                      <div className="notification">{cartCount ?? 0}</div>
                    </a>
                  </li>
                  <li>
                    <a href="/wishlist">
                      <i className="pe-7s-like"></i>
                      <div className="notification">{wishlist.length ?? 0}</div>
                    </a>
                  </li>
                  <li className="user-hover">
                    <a href="/my-account">
                      <i className="pe-7s-user"></i>
                    </a>
                  </li>
                </ul>
              </div>
            )}
            <div className="search-box-offcanvas">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Here..."
                />
                <button type="submit" className="search-btn">
                  <i className="pe-7s-search"></i>
                </button>
              </form>
            </div>
            <div className="mobile-navigation">
              {categories?.length > 0 && (
                <ul className="mobile-menu">
                  {categories.map((category) => (
                    <MobileSubCategory key={category.id} category={category} />
                  ))}
                </ul>
              )}
            </div>

            <div className="offcanvas-widget-area">
              {isLoggedIn && (
                <div
                  style={{
                    padding: "15px 0",
                    borderBottom: "1px solid #eee",
                    display: "flex",
                    justifyContent: "center", // centers horizontally
                    alignItems: "center" // centers vertically
                  }}
                >
                  <button
                    onClick={handleLogout}
                    className="NavbarIconsLink"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      textAlign: "center"
                    }}
                  >
                    <i className="pe-7s-power" style={{ fontSize: "24px" }}></i>
                    <span>Logout</span>
                  </button>
                </div>
              )}

              <div className="NavbarIcons">
                <a href="#" title="Catalogues" className="NavbarIconsLink">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlSpace="preserve"
                  >
                    <path d="M16.854 16.087 24 9.298l-4.457-4.691zm5.53-6.83-3.545 3.367 1.333-5.694zm-3.551-5.13-.025-.006-6.332-1.483-.023.099 3.874 12.094zm-4.712.071 3.338.782-1.304 5.568zm-8.784.355.228.712 10.07 10.07.006-.019-4.086-12.755zm1.768.634 3.711-1.189 2.309 7.209zm9.021 11.673.034-.035-.018-.018L4.617 5.281l-.011.011L0 9.898l11.543 11.543zM4.617 6.898l9.926 9.926-3 3-9.926-9.926z" />
                    <path d="M11.579 15.895a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>
                  <span>Catalogues</span>
                </a>
                <a href="#" title="Contact us" className="NavbarIconsLink">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 15.36 15.36"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.672 6.515C12.474 4.48 11.27 1.28 7.552 1.28s-4.922 3.2-5.12 5.235A1.785 1.785 0 0 0 1.28 8.192v.896a1.792 1.792 0 1 0 3.584 0v-.896a1.8 1.8 0 0 0-1.12-1.658c.128-1.178.755-3.974 3.808-3.974s3.674 2.797 3.802 3.974a1.79 1.79 0 0 0-1.114 1.658v.896a1.8 1.8 0 0 0 1.018 1.613c-.269.506-.954 1.19-2.637 1.395a1.28 1.28 0 1 0-1.069 1.984 1.28 1.28 0 0 0 1.139-.71c2.746-.314 3.622-1.728 3.898-2.56a1.785 1.785 0 0 0 1.235-1.722v-.896a1.79 1.79 0 0 0-1.152-1.677M3.584 9.088a.512.512 0 1 1-1.024 0v-.896a.512.512 0 1 1 1.024 0zm7.936-.896a.512.512 0 1 1 1.024 0v.896a.512.512 0 1 1-1.024 0z"
                      fillRule="evenodd"
                    />
                  </svg>
                  <span>Contact us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </header>
  );
};

export default Header;

const SubCategory = ({ subCategory }) => {
  const abc = subCategory.subCategories.length;
  return (
    <>
      <a
        className={`NavbarSubCategoryItemText ${abc > 0 ? "NavbarSubCategoryItemTextBold" : ""
          }`}
        href={`/category/${subCategory.slug}`}
      >
        {subCategory.categoryName}
      </a>
      {subCategory.subCategories.map((sub) => (
        <SubCategory key={sub.id} subCategory={sub} />
      ))}
    </>
  );
};

const MobileSubCategoryComponent = ({ category, level = 0 }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = category?.subCategories?.length > 0;

  const toggle = useCallback(() => {
    if (hasChildren) setOpen(prev => !prev);
  }, [hasChildren]);

  return (
    <li className={`mobile-item level-${level}`}>
      <div
        className={`mobile-header ${open ? "open" : ""}`}
        onClick={toggle}
      >
        <span className="mobile-title">{category.categoryName}</span>
        {hasChildren && <span className={`arrow ${open ? "open" : ""}`} />}
      </div>

      {hasChildren && (
        <div className={`mobile-children ${open ? "open" : ""}`}>
          <a href={`/category/${category.slug}`} className="view-all">
            View all {category.categoryName}
          </a>

          {category.subCategories.map((sub) => (
            <MobileSubCategory
              key={sub.id}
              category={sub}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </li>
  );
};

export const MobileSubCategory = React.memo(MobileSubCategoryComponent);