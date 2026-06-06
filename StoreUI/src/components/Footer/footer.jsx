"use client"
import React, { useEffect, useState } from "react";
import {
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MessageCircle,
  Check,
  Phone,
  MapPin,
} from "lucide-react";
import { fetchAllCategories } from "@/app/api/categories";


export const contactInfo = [
    {
        icon: Phone,
        label: "+44 330 043 2122",
        href: "tel:+443300432122",
    },
    {
        icon: Mail,
        label: "info@mymarts.co.uk",
        href: "mailto:info@mymarts.co.uk",
    },
    {
        icon: MapPin,
        label: "MYMART LTD, UNIT 48, PHOENIX DISTRIBUTION PARK, HESTON, LONDON, TW5 9NB",
    },
];

const Footer = () => {
    const helpInformation = {
        title: "Help & Information",
        links: [
            { label: "Contact Us", href: "/contact-us" },
            // { label: "Catalogue", href: "#" },
            { label: "Cookie Policy", href: "/cookie-policy" },
            { label: "Acceptable Use Policy", href: "/acceptable-use-policy" },
            { label: "Privacy Policy", href: "/privacy-policy" },
        ],
    }
    const buyingFromUs = {
        title: "Buying From Us",
        links: [
            { label: "Delivery & Returns", href: "/delivery-returns" },
            { label: "Terms & Conditions", href: "/terms-and-conditions" },
            { label: "Wishlist", href: "/wishlist" },
            { label: "Basket", href: "/cart" },
        ],
    }
    const bestSeller = {
        title: "Best Sellers",
        links: [
            { label: "Storage Boxes", href: "/category/storage-organisation" },
            { label: "Household Cleaners", href: "/category/household-cleaners" },
            { label: "Cookware Accessories", href: "/category/cookware-accessories" },
            { label: "Stationery Office Supplies", href: "/category/stationery-office-supplies" },
        ],
    }
    const quickLinks = {
        title: "Quick Links",
        links: [
            { label: "Home Storage", href: "#" },
            { label: "Office Storage", href: "#" },
            { label: "School Storage", href: "#" },
            { label: "Craft Storage", href: "#" },
            { label: "Industry Storage", href: "#" },
        ],
    }
    const [featuredCategories, setFeaturedCategory] = useState([]);

    const fetchFeaturedCategory = async () => {
        const response = await fetchAllCategories(0, 4, {
            isHighlighted: "true",
        });
        setFeaturedCategory(response?.categories || []);
    };

    useEffect(() => {
        fetchFeaturedCategory();
    }, []);
    return (
    <>
      <FooterNewsletter />
        <footer className="footer-main">

            {/* MAIN GRID */}
            <div className="container">
                <div className="footer-grid">

                    {/* 4 COLUMNS */}
                    <div className="footer-col">
                        <h4>{helpInformation.title}</h4>

                        <ul>
                            {helpInformation.links.map((link, i) => (
                                <li key={i}>
                                    <a href={link.href}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>{buyingFromUs.title}</h4>

                        <ul>
                            {buyingFromUs.links.map((link, i) => (
                                <li key={i}>
                                    <a href={link.href}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>{bestSeller.title}</h4>

                        <ul>
                            {bestSeller.links.map((link, i) => (
                                <li key={i}>
                                    <a href={link.href}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>{quickLinks.title}</h4>

                        <ul>
                            {featuredCategories.length > 0 ?
                            featuredCategories.map((link, i) => (
                                <li key={i}>
                                    <a href={`/category/${link.slug}`}>{link.categoryName}</a>
                                </li>
                            ))
                            : quickLinks.links.map((link, i) => (
                                <li key={i}>
                                    <a href={`/category/${link.href}`}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CONTACT COLUMN */}
                    <div className="footer-col">
                        <h4>Contact Us</h4>

                        <ul>
                            {contactInfo.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <li key={i} className="contact-item">
                                        <Icon size={16} />
                                        {item.href ? (
                                            <a href={item.href}>{item.label}</a>
                                        ) : (
                                            <span>{item.label}</span>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                </div>
            </div>

            {/* BOTTOM */}
            <div className="container">
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} MyMarts. All Rights Reserved.</p>
                <div className="row footer-payments"><ul className="card-logos no-bullet"><li className="card-logos__logo card-logos__logo--mastercard lazyloaded"></li><li className="card-logos__logo card-logos__logo--visa lazyloaded"></li><li className="card-logos__logo card-logos__logo--maestro lazyloaded"></li><li className="card-logos__logo card-logos__logo--paypal lazyloaded"></li></ul></div>
            </div>
            </div>

        </footer>
    </>
    );
};


import { createNewsletterSubscriber } from "@/app/api/newsletter";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;

    try {
      setLoading(true);

      await createNewsletterSubscriber({
        email: email.trim().toLowerCase(),
        consentGiven: true,
        source: "footer",
      });

      setEmail(""); // clear input on success
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="footer-newsletter-bar">
      <div className="container newsletter-wrapper">

        {/* LEFT */}
        <div className="newsletter-left">
          <Mail size={18} />

          <span className="newsletter-text">
            Join Our Newsletter
          </span>

          <div className="newsletter-input">
            <input
              type="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />

            <button onClick={handleSubmit} disabled={loading}>
              <Check size={16} />
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="newsletter-right">
          <p className="newsletter-note">
            By signing up, you are agreeing to our privacy policy. You may unsubscribe at any time.
          </p>
        </div>

      </div>
    </div>
  );
}
export default Footer;