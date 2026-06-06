import "@/styles/homepage.scss";
import "@/styles/productCard.scss";
import "@/styles/blogPLP.scss";
import "@/styles/testimonials.scss";
import "@/styles/sliders.scss";
import "@/styles/policies.scss";
// import { getbannerhomepage } from "./api/homepage";
import Slider_Section from "@/components/Slider_Section/Slider_Section";
import SmallBanner from "@/components/SmallBanner/SmallBanner";
import FeaturedProduct from "@/components/FeaturedProduct/FeaturedProduct";
import LatestProduct from "@/components/LatestProduct/LatestProduct";
import FilterCateroy from "@/components/FilterCategory/FilterCateroy";
import Testimonial from "@/components/Testimonial/Testimonial";
import FeaturedCategory from "@/components/FeaturedCategory/FeaturedCategory";
import WelcomeSection from "@/components/WelcomeSection/WelcomeSection";


export default function Home() {

    return (
        <main>
            <section className="slider-area">
                <Slider_Section />
            </section>

            <div className="service-policy section-padding">
                <div className="container">
                    <div className="row mtn-30">
                        <div className="col-6 col-lg-3">
                            <div className="policy-item">
                                <div className="policy-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="28" viewBox="0 0 26 28" fill="none">
                                        <path d="M12.68 2 1 6.7v14.67L12.68 26l11.75-4.63V6.7z" strokeWidth="2" strokeMiterlimit="10"/>
                                        <path d="M12.68 2 1 6.7l11.68 4.7 11.75-4.7z" strokeWidth="2" strokeMiterlimit="10" strokeLinejoin="round"/>
                                        <path d="M7.338 4.137 1 6.7l11.68 4.7 5.91-2.35z" strokeWidth="2" strokeMiterlimit="10" strokeLinejoin="round"/>
                                        <path d="M12.68 11.4V26" strokeWidth="2" strokeMiterlimit="10"/>
                                        <path d="M18.59 9.05v5.77" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div className="policy-content">
                                    <h6>Over 25,000 products</h6>
                                    <p>All available online</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="policy-item">
                                <div className="policy-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 27 24" fill="none">
                                        <path d="M17.527 1H1v17.773h16.527z" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M17.527 14.888H1v3.885h16.527zm0 3.885H25l-.215-5.9-1.94-5.253h-5.318z" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"/>
                                        <path d="M22.844 10.282h-2.37v2.159l3.448.216-.143-.504z" fill="#D20A28"/>
                                        <path d="M3.73 18.99c0 .143-.072.287-.072.503a2.655 2.655 0 0 0 2.66 2.662 2.654 2.654 0 0 0 2.658-2.662c0-.144 0-.288-.072-.504zm14.947 0c0 .143-.072.287-.072.503a2.654 2.654 0 0 0 2.658 2.662 2.654 2.654 0 0 0 2.66-2.662c0-.144 0-.288-.073-.504z" strokeWidth="2" strokeMiterlimit="10"/>
                                    </svg>
                                </div>
                                <div className="policy-content">
                                    <h6>Free Shipping Worldwide*</h6>
                                    <p>For all orders over $350</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="policy-item">
                                <div className="policy-icon">
                                    <svg style={{fill: "var(--theme-active-color)"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 119.27">
                                    <path d="M65.63 6.09A43 43 0 0 0 55.69 9a46.6 46.6 0 0 0-7.61 4.13 42.5 42.5 0 0 0-6.53 5.37 42 42 0 0 0-3.54 4h12.88A100 100 0 0 1 65.63 6.09M6.19 48.92h69.53a5.45 5.45 0 0 1 5.42 5.42v45.85a5.45 5.45 0 0 1-5.42 5.42H38.23c.44-1.2.83-2.44 1.17-3.73h36.32a1.7 1.7 0 0 0 1.18-.5 1.68 1.68 0 0 0 .5-1.19v-25.7H4.51v5.7a35 35 0 0 1-3.74.74V54.34a5.43 5.43 0 0 1 5.42-5.42M53.9 80.63a7.24 7.24 0 0 1 5.83 2.93 7.27 7.27 0 1 1 0 8.68 7.27 7.27 0 1 1-5.83-11.61M4.51 60.11H77.4v-5.77a1.69 1.69 0 0 0-1.68-1.68H6.19a1.67 1.67 0 0 0-1.68 1.68zm107 11.72h.11a49 49 0 0 0 2.29-4.64l.06-.14a42.7 42.7 0 0 0 2.53-8.21 45 45 0 0 0 .78-6.18h-12.36a44.06 44.06 0 0 1-5.68 19.17ZM108 77.34H95.81a72 72 0 0 1-4.65 6V71.83h1.71a40.3 40.3 0 0 0 6.55-19.17h-8.26v-5.52h8.14q-1-9.44-7.15-19.16H75.73v10.26h-5.51V28H53.8a50.5 50.5 0 0 0-5.1 10.26h-5.8A52.6 52.6 0 0 1 47.4 28H34.33A49 49 0 0 0 32 32.62l-.06.13a43 43 0 0 0-1.89 5.49H24.4a49 49 0 0 1 2.51-7.64l.06-.16a52.4 52.4 0 0 1 4.62-8.5A49.3 49.3 0 0 1 45 8.52a52 52 0 0 1 8.5-4.62A49.1 49.1 0 0 1 73 0a51.6 51.6 0 0 1 10 1 48.5 48.5 0 0 1 9.29 2.87l.15.06a52 52 0 0 1 8.5 4.62 49.3 49.3 0 0 1 13.43 13.42 51.6 51.6 0 0 1 4.61 8.5 48.3 48.3 0 0 1 2.94 9.45 52.2 52.2 0 0 1 0 20 48.5 48.5 0 0 1-2.92 9.29l-.07.15a51 51 0 0 1-4.61 8.5 49.1 49.1 0 0 1-13.43 13.43 52 52 0 0 1-8.5 4.61c-.42.18-.84.36-1.27.52v-6a46.7 46.7 0 0 0 6.71-3.73 42 42 0 0 0 6.53-5.38 42 42 0 0 0 3.54-4Zm-3.13-30.2h12.46a45 45 0 0 0-.83-6.14 42.6 42.6 0 0 0-2.58-8.35 50 50 0 0 0-2.3-4.64H98.55a47.3 47.3 0 0 1 6.27 19.16ZM57.72 22.46h12.5V9.36a102.4 102.4 0 0 0-12.5 13.1m18 0h12.5a102.4 102.4 0 0 0-12.5-13.1zm19.33 0H108a42 42 0 0 0-3.54-4 42.5 42.5 0 0 0-6.53-5.37A46 46 0 0 0 90.26 9l-.13-.06a42 42 0 0 0-8.22-2.53c-.52-.1-1-.2-1.58-.28a100 100 0 0 1 14.73 16.33Z"/>
                                    <path d="M34.42 86.91c.88 17.61-5.63 28-17.16 32.36C6.12 115.2-.46 105.25 0 86.64a24.67 24.67 0 0 0 17.16-5.28c4.94 3.13 11.24 6.09 17.23 5.55ZM7.33 98.48a17.7 17.7 0 0 1 3.87 0c.36.21.72.44 1.06.68a12 12 0 0 1 1 .74l.67.61.43.44c.58-.92 1.18-1.8 1.78-2.65a48.2 48.2 0 0 1 7.04-7.85h.06l.35-.13h3.9a.22.22 0 0 1 .22.23.2.2 0 0 1-.07.16l-.76.84q-1.77 2-3.37 4t-3.07 4.15q-1.44 2.08-2.74 4.25c-.87 1.44-1.69 2.92-2.46 4.41l-.48.92a.22.22 0 0 1-.3.1.2.2 0 0 1-.11-.11l-.43-.94a25 25 0 0 0-1.34-2.49 20 20 0 0 0-1.58-2.27 19 19 0 0 0-1.87-2 21 21 0 0 0-2.17-1.74.22.22 0 0 1-.09-.26l.28-.92a.22.22 0 0 1 .22-.16Z" style={{fillRule:"evenodd"}}/>
                                    </svg>
                                </div>
                                <div className="policy-content">
                                    <h6>Secured Online Payment</h6>
                                    <p>Payment protection guaranteed</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="policy-item">
                                <div className="policy-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="11" strokeWidth="2"/>
                                        <path d="M14.855 17.4409H9.90479V9.14209C9.90479 7.75895 10.9967 6.66699 12.3799 6.66699C13.763 6.66699 14.3454 7.32216 14.7822 8.55971" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8.66675 12.6357H12.889" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div className="policy-content">
                                    <h6>Money Back Guarantee</h6>
                                    <p>If goods have problems</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SmallBanner />
            <LatestProduct />
            <FeaturedCategory />
            <FeaturedProduct />
            <WelcomeSection />
            <Testimonial />
        </main>
    );
}
