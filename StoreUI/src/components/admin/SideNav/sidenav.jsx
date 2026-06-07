"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { LogoutUser } from "@/utils/auth";

const SideNav = () => {
  const router = useRouter();
  const [activeNo, setActiveNo] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session, status } = useSession();
  const token = session?.user?.token;
  useEffect(() => {
    setIsMenuOpen(false);
  }, [])
  useEffect(() => {
    if (!token && status === "unauthenticated") {
      router.replace("/signin");
    }
  }, [token, router]);

  const handleLogout = (e) => {
    e.preventDefault();
    LogoutUser();
  };

  const pathname = usePathname();

  const links = [
    // {
    //   name: "Application",
    //   isSection: true,
    // },
    {
      id: 0,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"><path d="M2 13.748c0 .138.112.25.25.25h3.749v-3h3v3h3.749a.25.25 0 0 0 .25-.25v-5.75H2zm11.93-7.17-.932-.82V2a1 1 0 1 0-2 0v2L7.681 1.09a.25.25 0 0 0-.353-.011l-.011.011-6.25 5.463a.25.25 0 0 0 .18.42L3 7h10.747a.25.25 0 0 0 .183-.421"/></svg>`,
      name: "Home Page",
      link: "/",
    },
    {
      id: 1,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 13.1c-4.4 0-8 3.4-8-3C0 5.6 3.6 2 8 2s8 3.6 8 8.1c0 6.4-3.6 3-8 3M8 4c-3.3 0-6 2.7-6 6 0 4 2.4.9 5 .2 0-.3.1-.7.4-1l3-2.3c.4-.3 1-.2 1.3.3s.2 1.1-.2 1.4l-2.2 1.7c2.5.9 4.8 3.6 4.8-.2C14 6.7 11.3 4 8 4"/>
                  </svg>`,
      name: "Dashboard",
      link: "/admin",
    },
    {
      id: 2,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path style={{ opacity: "1", fill: "#000", fillOpacity: "1", stroke: "none", strokeWidth: ".49999997", strokeMiterlimit: "4", strokeDasharray: "none", strokeOpacity: "1" }} d="M8 2.128 4.528 7.472h6.928zm-3.472 6.4A2.926 2.926 0 0 0 1.6 11.472a2.928 2.928 0 1 0 2.928 -2.944m4 0V14.4H14.4V8.528z" /></svg>`,
      name: "Site Settings",
      sub: [
        {
          name: "Banners",
          link: "/admin/bannerSection"
        },
        {
          name: "Content",
          link: "/admin/settings"
        }
      ]
    },
    {
      id: 3,
      icon: `<svg width="1em" height="1em" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h16v16H0z"/><path d="M16 12.5a2.5 2.5 0 0 0 -2.5 -2.5h-7A2.5 2.5 0 0 0 4 12.5V15h12zM3 13H0v-2.5A2.5 2.5 0 0 1 2.5 8h4.036c0.218 0.376 0.495 0.714 0.819 1H6.5A3.5 3.5 0 0 0 3 12.5zm7 -10a3.001 3.001 0 0 1 0 6 3.001 3.001 0 0 1 0 -6M6.126 6.997 6 7a3.001 3.001 0 0 1 0 -6c1.026 0 1.932 0.516 2.473 1.302a4.004 4.004 0 0 0 -2.347 4.695"/></svg>`,
      name: "Personnel",
      sub: [
        {
          name: "Admins",
          link: "/admin/users/admins",
        },
        {
          name: "Customers",
          link: "/admin/users/customer",
        },
        // {
        //   name: "Reviews",
        //   link: "/admin/review",
        // },
        {
          name: "Testimonials",
          link: "/admin/testimonials",
        },
        {
          name: "Newsletters",
          link: "/admin/newsletter",
        },
      ],
    },
    {
      id: 4,
      icon: `<svg width="16" height="16" viewBox="0 0 2 2" xmlns="http://www.w3.org/2000/svg"><path d="M1.48.84a.04.04 0 0 1 .04.037v.563a.12.12 0 0 1-.116.12H.6a.12.12 0 0 1-.12-.116V.88A.04.04 0 0 1 .517.84zm-.31.167-.002.002-.229.248-.104-.1a.03.03 0 0 0-.04-.002l-.002.002-.043.038a.024.024 0 0 0-.002.036l.002.002.147.139a.06.06 0 0 0 .043.018.06.06 0 0 0 .043-.018l.117-.125.009-.009.008-.009.011-.012.004-.004.008-.009.112-.119a.03.03 0 0 0 .002-.036l-.002-.002-.043-.038a.03.03 0 0 0-.04-.002M1.48.44a.12.12 0 0 1 .12.12v.12a.04.04 0 0 1-.04.04H.44A.04.04 0 0 1 .4.68V.56A.12.12 0 0 1 .52.44z" /></svg>`,
      name: "Inventory",
      sub: [
        {
          name: "Add Category",
          link: "/admin/category/new",
        },
        {
          name: "All Categories",
          link: "/admin/category",
        },
        {
          name: "Add Product",
          link: "/admin/product/new",
        },
        {
          name: "All Products",
          link: "/admin/product",
        },
      ],
    },
    {
      id: 4,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"><path d="M14.2 10.3c-.1.4-.5.7-.9.7H4.8c-.5 0-.9-.3-1-.8L2.2 4c-.1-.6-.6-1-1.2-1H.4C.2 3 0 2.8 0 2.6V1.4c0-.2.2-.4.4-.4h1.4c1 0 1.9.7 2.1 1.7l1.5 6.1c.1.1.3.2.4.2h6.5c.1 0 .2-.1.3-.2l1.1-3.4c.1-.2 0-.4-.2-.4H7.4c-.2 0-.4-.2-.4-.4V3.4c0-.2.2-.4.4-.4H15c.6 0 1 .4 1 1v1zM4.5 13c.8 0 1.5.7 1.5 1.5S5.3 16 4.5 16 3 15.3 3 14.5 3.7 13 4.5 13m7 0c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5" /></svg>`,
      name: "Orders",
      sub: [
        {
          name: "Add",
          link: "/admin/order/new",
        },
        {
          name: "List",
          link: "/admin/order",
        },
      ],
    },
    {
      id: 5,
      icon: `<svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 248.774 248.774" xml:space="preserve" fill="currentColor"><path d="M219.179 51.502H29.6C13.277 51.502 0 63.539 0 78.335v92.104c0 14.796 13.277 26.833 29.6 26.833h189.577c16.318 0 29.597-12.037 29.597-26.833V78.335c0-14.796-13.279-26.833-29.595-26.833m14.378 118.937c0 6.404-6.455 11.616-14.38 11.616H29.6c-7.931 0-14.383-5.212-14.383-11.616V78.335c0-6.404 6.452-11.616 14.383-11.616h189.577c7.926 0 14.38 5.212 14.38 11.616z"/><path d="M67.622 104.742h15.217v13.097H67.622zm0 52.385h15.217v13.097H67.622zm0-78.579h15.217v13.097H67.622zm0 52.388h15.217v13.094H67.622zm84.404-27.429c0-11.874-9.858-21.611-21.616-21.611-11.874 0-21.613 9.62-21.613 21.611 0 12.115 9.741 21.613 21.613 21.613 11.758 0 21.616-9.617 21.616-21.613m-30.997 0c0-5.225 4.276-9.379 9.379-9.379s9.379 4.157 9.379 9.379c0 5.227-4.276 9.381-9.379 9.381s-9.379-4.157-9.379-9.381m65.16 20.903c-11.874-.043-21.651 9.544-21.697 21.537-.041 12.11 9.665 21.649 21.542 21.695 11.76.043 21.646-9.546 21.692-21.537.041-11.878-9.779-21.655-21.537-21.695m-.081 30.997c-5.103 0-9.376-4.162-9.376-9.384 0-5.227 4.276-9.381 9.376-9.381 5.108 0 9.381 4.157 9.381 9.381.003 5.225-4.273 9.384-9.381 9.384m-57.862 9.352 45.88-86.258 13.434 7.146-45.88 86.258z"/></svg>`,
      name: "Coupons",
      sub: [
        {
          name: "Add",
          link: "/admin/coupon/new",
        },
        {
          name: "List",
          link: "/admin/coupon",
        },
      ],
    },
    {
      id: 5,
      icon: `<svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M5.5 8H6v.5a1 1 0 0 0 2 0V8h.5a1 1 0 0 0 0-2H8v-.5a1 1 0 0 0-2 0V6h-.5a1 1 0 0 0 0 2m-.62 11.12a1 1 0 0 0 1.41 0l.71-.71.71.71a1 1 0 0 0 1.41 0 1 1 0 0 0 0-1.41L8.41 17l.71-.71a1 1 0 0 0-1.41-1.41l-.71.71-.71-.71a1 1 0 0 0-1.41 1.41l.71.71-.71.71a1 1 0 0 0 0 1.41M20 1H4a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3m-9 20H4a1 1 0 0 1-1-1v-7h8Zm0-10H3V4a1 1 0 0 1 1-1h7Zm10 9a1 1 0 0 1-1 1h-7v-8h8Zm0-9h-8V3h7a1 1 0 0 1 1 1Zm-5.5 5.5h3a1 1 0 0 0 0-2h-3a1 1 0 0 0 0 2m3-10.5h-3a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2m-3 13.5h3a1 1 0 0 0 0-2h-3a1 1 0 0 0 0 2"/></svg>`,
      name: "Charges",
      sub: [
        {
          name: "Add",
          link: "/admin/charges/new",
        },
        {
          name: "List",
          link: "/admin/charges",
        },
      ],
    },
    {
      id: 6,
      icon: `<svg width="1em" height="1em" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M6 3h10v7H6zm9 11a2 2 0 1 1-3.999.001A2 2 0 0 1 15 14m-2-3c1.3 0 2.4.8 2.8 2h.2v-2z"/><path d="M5 5H1L0 9v4h1.2c.4-1.2 1.5-2 2.8-2s2.4.8 2.8 2h3.4c.4-1.2 1.5-2 2.8-2H5zM4 9H1l.8-3H4z"/><path d="M6 14a2 2 0 1 1-3.999.001A2 2 0 0 1 6 14"/></svg>`,
      name: "Shipping",
      sub: [
        {
          name: "Add Shipment",
          link: "/admin/shipment/new",
        },
        {
          name: "All Shipments",
          link: "/admin/shipment",
        },
        {
          name: "All Delivery Types",
          link: "/admin/delivery-type",
        },
      ],
    },
  ];
  function handelDrop(value) {
    if (value === activeNo) {
      setActiveNo(0);
    } else {
      setActiveNo(value);
    }
  }
  const handleDropdown = (value) => {
    setActiveNo(activeNo === value ? null : value);
  };

  return (
    <div className="sa-app__sidebar" style={{ width: isMenuOpen ? 240 : "" }}>
      <div className="sa-sidebar">
        <div className="sa-app__sidebar-closeOff" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={isMenuOpen ? "pe-7s-angle-left" : "pe-7s-angle-right"}></i>
        </div>
        <div className="sa-sidebar__header">
          <Link href="/admin">
            <div style={{
              maskImage: 'url(/logo.png)',
              WebkitMaskImage: 'url(/logo.png)',
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'left center',
              WebkitMaskPosition: 'left center',
              backgroundColor: 'var(--sa-scheme-theme--main-color)',
              height: '45px',
              width: '160px',
              display: 'inline-block'
            }} role="img" aria-label="Brand Logo"></div>
          </Link>
        </div>
        <div className="sa-sidebar__body">
          <div className="sa-nav sa-nav--sidebar">
            <div className="sa-nav__section">
              <ul className="sa-nav__menu sa-nav__menu--root">
                {links.map((item, index) => (
                  <li
                    key={`menu-${index}`}
                    className={`sa-nav__menu-item sa-nav__menu-item--has-icon ${activeNo == index ||
                        item.sub?.some((sub) => pathname === sub.link)
                        ? "sa-nav__menu-item--open"
                        : ""
                      }`}
                  >
                    {item.sub && item.sub.length > 0 ? (
                      <>
                        <a
                          onClick={() => handleDropdown(index)}
                          className="sa-nav__link"
                        >
                          <span
                            className="sa-nav__icon"
                            dangerouslySetInnerHTML={{ __html: item.icon }}
                          />
                          <span className="sa-nav__title">{item.name}</span>
                          <span className="sa-nav__arrow">
                            <svg width="20" height="20" viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg"><path d="M3.885 2.822 2.47 1.41a0.25 0.25 0 0 0 -0.355 0 0.25 0.25 0 0 0 0 0.352l1.238 1.25L2.115 4.25a0.25 0.25 0 0 0 0 0.352 0.25 0.25 0 0 0 0.177 0.075 0.25 0.25 0 0 0 0.177 -0.075l1.415 -1.413a0.25 0.25 0 0 0 0 -0.367"/></svg>
                          </span>
                        </a>
                        <ul className="sa-nav__menu sa-nav__menu--sub">
                          {item.sub.map((sub, index) => (
                            <li
                              key={`submenu-${index}`}
                              className="sa-nav__menu-item"
                            >
                              <Link
                                href={sub.link}
                                className={`sa-nav__link ${pathname === sub.link ? 'active' : ''}`}
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <span className="sa-nav__menu-item-padding"></span>
                                <span className="sa-nav__title">
                                  {sub.name}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) :
                      <Link
                        href={item.link}
                        className={`sa-nav__link ${pathname === item.link ? 'active' : ''}`}
                      >
                        <span
                          className="sa-nav__icon"
                          dangerouslySetInnerHTML={{ __html: item.icon }}
                        />
                        <span className="sa-nav__title">{item.name}</span>
                      </Link>
                    }
                  </li>
                ))}
              </ul>
              <ul>
                <li>
                  <p className="sa-nav__link" onClick={(e) => handleLogout(e)}>
                    Logout
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="sa-app__sidebar-shadow"></div>
      <div className="sa-app__sidebar-backdrop"></div>
    </div>
  );
};

export default SideNav;
