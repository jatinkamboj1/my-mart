"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./page.module.scss";
import { addContact } from "@/app/api/contactUs";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const result = await addContact(formData);

            if (result) {
                toast.success("Message sent successfully!");

                setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    subject: "",
                    message: "",
                });
            }
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            {/* HERO */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <span className={styles.heroTag}>
                            CONTACT MYMART
                        </span>

                        <h1 className={styles.heroTitle}>
                            We&apos;re Here To Help
                        </h1>

                        <p className={styles.heroDescription}>
                            Whether you have questions about
                            products, deliveries, returns,
                            trade enquiries or existing
                            orders, our customer support team
                            is ready to assist.
                        </p>
                    </div>
                </div>
            </section>

            {/* CONTACT CARDS */}
            <section className={styles.contactCards}>
                <div className={styles.container}>
                    <div className={styles.cardsGrid}>
                        <div className={styles.contactCard}>
                            <div className={styles.cardIcon}>
                                📞
                            </div>

                            <h3>Call Us</h3>

                            <p>
                                Speak directly with our
                                customer support team.
                            </p>

                            <a href="tel:03300432122">
                                033 0043 2122
                            </a>
                        </div>

                        <div className={styles.contactCard}>
                            <div className={styles.cardIcon}>
                                ✉️
                            </div>

                            <h3>Email Us</h3>

                            <p>
                                Send us your enquiry and we&apos;ll
                                get back to you as soon as
                                possible.
                            </p>

                            <a href="mailto:info@mymarts.co.uk">
                                info@mymarts.co.uk
                            </a>
                        </div>

                        <div className={styles.contactCard}>
                            <div className={styles.cardIcon}>
                                📍
                            </div>

                            <h3>Visit Us</h3>

                            <p>
                                UNIT 48, PHOENIX
                                DISTRIBUTION PARK,
                                HESTON, LONDON,
                                TW5 9NB
                            </p>
                        </div>

                        <div className={styles.contactCard}>
                            <div className={styles.cardIcon}>
                                🕒
                            </div>

                            <h3>Opening Hours</h3>

                            <p>
                                Monday - Friday
                            </p>

                            <strong>
                                9:00 AM - 5:30 PM
                            </strong>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section className={styles.contactSection}>
                <div className={styles.container}>
                    <div className={styles.contactGrid}>
                        {/* LEFT SIDE */}
                        <div className={styles.contactInfo}>
                            <h2>
                                Contact Information
                            </h2>

                            <p>
                                If you would like to speak
                                with us personally, please
                                use any of the contact
                                methods below. A member of
                                our team will be happy to
                                help with orders, products,
                                deliveries and returns.
                            </p>

                            <div className={styles.infoGroup}>
                                <h4>Phone</h4>

                                <p>
                                    Tel: 033 0043 2122
                                </p>
                            </div>

                            <div className={styles.infoGroup}>
                                <h4>Email</h4>

                                <p>
                                    info@mymarts.co.uk
                                </p>
                            </div>

                            <div className={styles.infoGroup}>
                                <h4>Opening Times</h4>

                                <p>
                                    Monday – Friday
                                </p>

                                <p>
                                    09:00 to 17:30
                                </p>
                            </div>

                            <div className={styles.infoGroup}>
                                <h4>
                                    Registered Address
                                </h4>

                                <address>
                                    MYMART LTD
                                    <br />
                                    UNIT 48
                                    <br />
                                    PHOENIX DISTRIBUTION
                                    PARK
                                    <br />
                                    HESTON
                                    <br />
                                    LONDON
                                    <br />
                                    TW5 9NB
                                </address>
                            </div>
                        </div>
                        {/* RIGHT SIDE */}
                        <div className={styles.contactFormWrapper}>
                            <h2>
                                Send Us A Message
                            </h2>

                            <p className={styles.formIntro}>
                                Enter your information
                                below and a member of
                                our team will get back
                                to you as soon as
                                possible.
                            </p>

                            <form
                                className={styles.contactForm}
                                onSubmit={handleSubmit}
                            >
                                <div className={styles.formGroup}>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name *"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address *"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Telephone *"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <input
                                        type="text"
                                        name="subject"
                                        placeholder="Subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <textarea
                                        name="message"
                                        rows={8}
                                        placeholder="Your Message *"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={
                                        styles.submitBtn
                                    }
                                >
                                    {loading
                                        ? "Sending..."
                                        : "Send Message"}
                                </button>
                            </form>

                            <div
                                className={
                                    styles.supportNotice
                                }
                            >
                                <h4>
                                    Customer Support
                                </h4>

                                <p>
                                    For order enquiries,
                                    returns, delivery
                                    updates and product
                                    questions, please
                                    include as much
                                    information as
                                    possible in your
                                    message.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HELP SECTION */}
            <section className={styles.helpSection}>
                <div className={styles.container}>
                    <div className={styles.helpHeader}>
                        <h2>
                            How Can We Help?
                        </h2>

                        <p>
                            Find answers to common
                            customer enquiries.
                        </p>
                    </div>

                    <div className={styles.helpGrid}>
                        <div className={styles.helpCard}>
                            <h3>
                                Order Tracking
                            </h3>

                            <p>
                                Need an update on your
                                order? Contact our
                                support team with your
                                order reference number.
                            </p>
                        </div>

                        <div className={styles.helpCard}>
                            <h3>
                                Returns & Refunds
                            </h3>

                            <p>
                                Questions regarding
                                returns, exchanges or
                                refunds can be sent via
                                our contact form.
                            </p>
                        </div>

                        <div className={styles.helpCard}>
                            <h3>
                                Product Enquiries
                            </h3>

                            <p>
                                Need more information
                                about a product before
                                purchasing? We&apos;re happy
                                to help.
                            </p>
                        </div>

                        <div className={styles.helpCard}>
                            <h3>
                                Delivery Questions
                            </h3>

                            <p>
                                Contact us regarding
                                delivery schedules,
                                courier issues or
                                delivery restrictions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* MAP SECTION */}
            <section className={styles.mapSection}>
                <div className={styles.container}>
                    <div className={styles.mapHeader}>
                        <h2>
                            Find Us
                        </h2>

                        <p>
                            Visit our office and distribution
                            centre located in Heston,
                            London.
                        </p>
                    </div>

                    <div className={styles.mapWrapper}>
                        <iframe
                            title="MYMART Location"
                            src="https://maps.google.com/maps?q=TW5%209NB&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="450"
                            style={{
                                border: 0,
                            }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </section>

            {/* BUSINESS DETAILS */}
            {/* <section className={styles.businessSection}>
                <div className={styles.container}>
                    <div className={styles.businessCard}>
                        <h2>
                            MYMART LTD
                        </h2>

                        <div
                            className={
                                styles.businessGrid
                            }
                        >
                            <div>
                                <h4>
                                    Registered Address
                                </h4>

                                <p>
                                    UNIT 48
                                    <br />
                                    PHOENIX DISTRIBUTION
                                    PARK
                                    <br />
                                    HESTON
                                    <br />
                                    LONDON
                                    <br />
                                    TW5 9NB
                                </p>
                            </div>

                            <div>
                                <h4>
                                    Contact Details
                                </h4>

                                <p>
                                    Phone:
                                    <br />
                                    033 0043 2122
                                </p>

                                <p>
                                    Email:
                                    <br />
                                    info@mymarts.co.uk
                                </p>
                            </div>

                            <div>
                                <h4>
                                    Opening Hours
                                </h4>

                                <p>
                                    Monday – Friday
                                    <br />
                                    09:00 AM – 05:30 PM
                                </p>

                                <p>
                                    Saturday & Sunday
                                    <br />
                                    Closed
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* CTA */}
            <section className={styles.ctaSection}>
                <div className={styles.container}>
                    <div className={styles.ctaBox}>
                        <h2>
                            Need Assistance?
                        </h2>

                        <p>
                            Our customer service team
                            is available during business
                            hours to help with orders,
                            product enquiries, delivery
                            questions and returns.
                        </p>

                        <div
                            className={
                                styles.ctaButtons
                            }
                        >
                            <a
                                href="tel:03300432122"
                                className={
                                    styles.primaryBtn
                                }
                            >
                                Call Us
                            </a>

                            <a
                                href="mailto:info@mymarts.co.uk"
                                className={
                                    styles.secondaryBtn
                                }
                            >
                                Email Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}