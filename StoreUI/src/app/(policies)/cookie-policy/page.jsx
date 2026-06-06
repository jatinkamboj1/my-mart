import styles from "./page.module.scss";

export default function CookiePolicyPage() {
  return (
    <div className={styles.page}>
      {/* HERO */}
      <div className={styles.pageHero}>
        <h1 className={styles.heroTitle}>Cookie Policy</h1>

        <div className={styles.heroSubtitle}>
          How MYMARTS Uses Cookies
        </div>

        <div className={styles.heroSub2}>
          Security, authentication and payment protection
        </div>

        <small className={styles.heroSmall}>
          Last Updated: June 2026
        </small>
      </div>

      {/* QUICK LINKS */}
      <nav className={styles.quickLinks}>
        <a
          href="#what_are_cookies"
          className={styles.quickLink}
        >
          About Cookies
        </a>

        <a
          href="#cookie_categories"
          className={styles.quickLink}
        >
          Cookie Categories
        </a>

        <a
          href="#cookie_table"
          className={styles.quickLink}
        >
          Cookies We Use
        </a>

        <a
          href="#cookie_faqs"
          className={styles.quickLink}
        >
          Cookie FAQs
        </a>
      </nav>

      {/* OVERVIEW */}
      <section className={styles.goodToKnow}>
        <div className={styles.container}>
          <h2
            className={`${styles.sectionHeading} ${styles.noPaddingTop}`}
          >
            Cookie Policy Overview
          </h2>

          <div className={styles.cardsGrid}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                Website Security
              </h3>

              <p className={styles.cardText}>
                We use cookies to protect our website,
                customers and systems from fraudulent
                activity, unauthorised access attempts
                and malicious requests.
              </p>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                Account Access
              </h3>

              <p className={styles.cardText}>
                Authentication cookies help users
                securely sign in and remain logged into
                their accounts while using our website.
              </p>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                Payment Protection
              </h3>

              <p className={styles.cardText}>
                Payment-related cookies assist with
                fraud detection and help ensure secure
                payment processing through trusted
                payment providers.
              </p>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                Your Control
              </h3>

              <p className={styles.cardText}>
                Most browsers allow you to review,
                manage, block or delete cookies through
                browser privacy settings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section
        className={styles.accordionSection}
        id="what_are_cookies"
      >
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Introduction
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              This Cookie Policy explains how Shipping
              Mart (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) uses cookies
              and similar technologies when you visit
              our website.
            </p>

            <p className={styles.accParagraph}>
              Cookies are small text files that are
              stored on your computer, tablet, mobile
              phone or other device when you visit a
              website. They help websites function
              correctly, improve security, remember
              preferences and enhance the overall user
              experience.
            </p>

            <p className={styles.accParagraph}>
              By continuing to use our website, you
              agree to the use of cookies as described
              in this Cookie Policy, subject to any
              preferences you may choose through our
              cookie settings.
            </p>

            <p className={styles.accParagraph}>
              This Cookie Policy should be read
              alongside our Privacy Policy, which
              explains how we collect, use and protect
              your personal information.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT ARE COOKIES */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            What Are Cookies?
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Cookies are small data files placed on
              your device when you visit a website.
              Cookies allow websites to recognise your
              device and store information about your
              preferences or previous actions.
            </p>

            <p className={styles.accParagraph}>
              Cookies may be:
            </p>

            <h6 className={styles.accSubHeading}>
              Session Cookies
            </h6>

            <p className={styles.accParagraph}>
              These cookies are temporary and are
              deleted when you close your browser.
            </p>

            <h6 className={styles.accSubHeading}>
              Persistent Cookies
            </h6>

            <p className={styles.accParagraph}>
              These remain on your device until they
              expire or are manually deleted.
            </p>

            <h6 className={styles.accSubHeading}>
              First-Party Cookies
            </h6>

            <p className={styles.accParagraph}>
              Cookies set directly by our website.
            </p>

            <h6 className={styles.accSubHeading}>
              Third-Party Cookies
            </h6>

            <p className={styles.accParagraph}>
              Cookies set by external service providers
              that assist with website functionality,
              payment processing, security or other
              services.
            </p>
          </div>
        </div>
      </section>

      {/* WHY WE USE COOKIES */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Why We Use Cookies
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              We use cookies for a variety of reasons,
              including:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Maintaining secure user sessions
              </li>

              <li className={styles.accListItem}>
                Protecting against fraud and
                unauthorised access
              </li>

              <li className={styles.accListItem}>
                Remembering login status
              </li>

              <li className={styles.accListItem}>
                Enabling secure checkout and payment
                functionality
              </li>

              <li className={styles.accListItem}>
                Improving website performance and
                security
              </li>

              <li className={styles.accListItem}>
                Providing essential website
                functionality
              </li>
            </ul>

            <p className={styles.accParagraph}>
              Without certain cookies, some parts of
              our website may not function correctly.
            </p>
          </div>
        </div>
      </section>

      {/* COOKIE CATEGORIES */}
      <section
        className={styles.accordionSection}
        id="cookie_categories"
      >
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Cookie Categories
          </h2>

          <div className={styles.accBody}>
            <h6 className={styles.accSubHeading}>
              Essential Cookies
            </h6>

            <p className={styles.accParagraph}>
              Essential cookies are necessary for the
              operation of the website and cannot be
              switched off in our systems. They are
              usually only set in response to actions
              made by you which amount to a request
              for services, such as logging in,
              completing forms or making purchases.
            </p>

            <p className={styles.accParagraph}>
              These cookies are used for:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Website security
              </li>

              <li className={styles.accListItem}>
                User authentication
              </li>

              <li className={styles.accListItem}>
                Shopping basket functionality
              </li>

              <li className={styles.accListItem}>
                Checkout processes
              </li>

              <li className={styles.accListItem}>
                Fraud prevention
              </li>
            </ul>

            <h6 className={styles.accSubHeading}>
              Functional Cookies
            </h6>

            <p className={styles.accParagraph}>
              Functional cookies allow websites to
              remember choices you make and provide
              enhanced functionality and
              personalisation.
            </p>

            <p className={styles.accParagraph}>
              Examples may include remembering:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Language preferences
              </li>

              <li className={styles.accListItem}>
                Regional settings
              </li>

              <li className={styles.accListItem}>
                Saved preferences
              </li>

              <li className={styles.accListItem}>
                User account settings
              </li>
            </ul>
                        <h6 className={styles.accSubHeading}>
              Performance and Analytics Cookies
            </h6>

            <p className={styles.accParagraph}>
              Performance and analytics cookies help
              website owners understand how visitors
              interact with their websites by collecting
              information anonymously.
            </p>

            <p className={styles.accParagraph}>
              These cookies can provide information
              such as:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Number of website visitors
              </li>

              <li className={styles.accListItem}>
                Most visited pages
              </li>

              <li className={styles.accListItem}>
                Time spent on pages
              </li>

              <li className={styles.accListItem}>
                Website performance metrics
              </li>

              <li className={styles.accListItem}>
                User navigation paths
              </li>
            </ul>

            <p className={styles.accParagraph}>
              At the time of this review, no analytics
              cookies were detected from services such
              as Google Analytics, Microsoft Clarity
              or Hotjar.
            </p>

            <h6 className={styles.accSubHeading}>
              Marketing and Advertising Cookies
            </h6>

            <p className={styles.accParagraph}>
              Marketing cookies are used to track
              visitors across websites and help
              advertisers display relevant advertising.
            </p>

            <p className={styles.accParagraph}>
              These cookies may be used to:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Measure advertising effectiveness
              </li>

              <li className={styles.accListItem}>
                Build audience profiles
              </li>

              <li className={styles.accListItem}>
                Deliver personalised advertisements
              </li>

              <li className={styles.accListItem}>
                Track conversions
              </li>
            </ul>

            <p className={styles.accParagraph}>
              At the time of this review, no advertising
              or marketing cookies were detected.
            </p>
          </div>
        </div>
      </section>

      {/* COOKIE TABLE */}
      <section
        className={styles.postcodeSection}
        id="cookie_table"
      >
        <div className={styles.container}>
          <h2 className={styles.postcodeHeading}>
            Cookies Currently Used On Our Website
          </h2>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.tableHeadCell}>
                    Cookie Name
                  </th>

                  <th className={styles.tableHeadCell}>
                    Provider
                  </th>

                  <th className={styles.tableHeadCell}>
                    Purpose
                  </th>

                  <th className={styles.tableHeadCell}>
                    Duration
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className={styles.tableCellFirst}>
                    Host-next-auth.csrf-token
                  </td>

                  <td className={styles.tableCell}>
                    MYMARTS
                  </td>

                  <td className={styles.tableCell}>
                    Provides Cross-Site Request Forgery
                    (CSRF) protection during
                    authentication and account-related
                    actions. Helps prevent malicious
                    requests being submitted on behalf
                    of users.
                  </td>

                  <td className={styles.tableCellLast}>
                    Session
                  </td>
                </tr>

                <tr className={styles.tableBodyRowEven}>
                  <td className={styles.tableCellFirst}>
                    __Secure-next-auth.callback-url
                  </td>

                  <td className={styles.tableCell}>
                    MYMARTS
                  </td>

                  <td className={styles.tableCell}>
                    Stores the URL a user should be
                    redirected to after successfully
                    signing in.
                  </td>

                  <td className={styles.tableCellLast}>
                    Session
                  </td>
                </tr>

                <tr>
                  <td className={styles.tableCellFirst}>
                    __Secure-next-auth.session-token
                  </td>

                  <td className={styles.tableCell}>
                    MYMARTS
                  </td>

                  <td className={styles.tableCell}>
                    Maintains authenticated user
                    sessions and keeps users logged
                    into their accounts securely.
                  </td>

                  <td className={styles.tableCellLast}>
                    Persistent
                  </td>
                </tr>

                <tr className={styles.tableBodyRowEven}>
                  <td className={styles.tableCellFirst}>
                    __stripe_mid
                  </td>

                  <td className={styles.tableCell}>
                    Stripe
                  </td>

                  <td className={styles.tableCell}>
                    Used by Stripe&apos;s fraud prevention
                    and security systems to detect
                    fraudulent payment activity and
                    improve payment security.
                  </td>

                  <td className={styles.tableCellLast}>
                    Approximately 1 Year
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* AUTHENTICATION COOKIES */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Authentication Cookies
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Our website uses authentication
              technology to provide secure account
              access and protect customer accounts.
            </p>

            <p className={styles.accParagraph}>
              Authentication cookies are required to:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Sign users into their accounts
              </li>

              <li className={styles.accListItem}>
                Maintain active sessions
              </li>

              <li className={styles.accListItem}>
                Protect account security
              </li>

              <li className={styles.accListItem}>
                Manage secure authentication workflows
              </li>

              <li className={styles.accListItem}>
                Prevent unauthorised access
              </li>
            </ul>

            <p className={styles.accParagraph}>
              Without these cookies, users may not be
              able to log in or access account-specific
              functionality.
            </p>

            <p className={styles.accParagraph}>
              Authentication cookies currently used on
              our website include:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Host-next-auth.csrf-token
              </li>

              <li className={styles.accListItem}>
                __Secure-next-auth.callback-url
              </li>

              <li className={styles.accListItem}>
                __Secure-next-auth.session-token
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* PAYMENT SECURITY */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Payment Security Cookies
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              To process payments securely, we use
              Stripe.
            </p>

            <p className={styles.accParagraph}>
              Stripe may place security-related cookies
              on your device to:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Detect fraudulent transactions
              </li>

              <li className={styles.accListItem}>
                Prevent abuse of payment systems
              </li>

              <li className={styles.accListItem}>
                Improve payment security
              </li>

              <li className={styles.accListItem}>
                Validate legitimate payment activity
              </li>
            </ul>

            <p className={styles.accParagraph}>
              The payment-related cookie currently
              detected on our website is:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                __stripe_mid
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* THIRD PARTY COOKIES */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Third-Party Cookies
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Some cookies may be placed by trusted
              third-party providers that support
              website functionality and payment
              processing.
            </p>

            <p className={styles.accParagraph}>
              Current third-party services used on our
              website may include Stripe for secure
              payment processing and fraud prevention.
            </p>

            <p className={styles.accParagraph}>
              These cookies are controlled by the
              relevant third-party provider and are
              subject to that provider&apos;s own privacy
              and cookie policies.
            </p>
          </div>
        </div>
      </section>
            {/* COOKIE FAQS */}
      <section
        className={styles.accordionSection}
        id="cookie_faqs"
      >
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Frequently Asked Questions
          </h2>

          <details className={styles.details} open>
            <summary className={styles.summary}>
              Why do we use cookies?
            </summary>

            <div className={styles.accBody}>
              <p className={styles.accParagraph}>
                Cookies help us provide a secure,
                reliable and functional website.
                They allow users to authenticate,
                remain logged into their accounts,
                complete purchases securely and
                protect against fraudulent activity.
              </p>

              <p className={styles.accParagraph}>
                Without certain cookies, some areas
                of our website may not function
                correctly.
              </p>
            </div>
          </details>

          <details className={styles.details}>
            <summary className={styles.summary}>
              Are these cookies necessary?
            </summary>

            <div className={styles.accBody}>
              <p className={styles.accParagraph}>
                The cookies currently detected on
                our website are considered strictly
                necessary because they support
                authentication, account security
                and payment protection.
              </p>

              <p className={styles.accParagraph}>
                Disabling these cookies may prevent
                users from signing in, maintaining
                secure sessions or completing
                purchases.
              </p>
            </div>
          </details>

          <details className={styles.details}>
            <summary className={styles.summary}>
              Do we use analytics cookies?
            </summary>

            <div className={styles.accBody}>
              <p className={styles.accParagraph}>
                At the time of this review, no
                analytics cookies were detected
                from services such as Google
                Analytics, Microsoft Clarity or
                Hotjar.
              </p>

              <p className={styles.accParagraph}>
                If analytics technologies are
                introduced in the future, this
                Cookie Policy will be updated
                accordingly.
              </p>
            </div>
          </details>

          <details className={styles.details}>
            <summary className={styles.summary}>
              Do we use advertising cookies?
            </summary>

            <div className={styles.accBody}>
              <p className={styles.accParagraph}>
                At the time of this review, no
                advertising or marketing cookies
                were detected.
              </p>

              <p className={styles.accParagraph}>
                This includes cookies commonly
                associated with Google Ads,
                Facebook (Meta) Pixel, LinkedIn
                Insight Tag and similar advertising
                platforms.
              </p>
            </div>
          </details>

          <details className={styles.details}>
            <summary className={styles.summary}>
              How can I manage cookies?
            </summary>

            <div className={styles.accBody}>
              <p className={styles.accParagraph}>
                Most browsers allow you to control
                cookies through browser settings.
              </p>

              <p className={styles.accParagraph}>
                You can usually:
              </p>

              <ul className={styles.accList}>
                <li className={styles.accListItem}>
                  View cookies stored on your device
                </li>

                <li className={styles.accListItem}>
                  Delete existing cookies
                </li>

                <li className={styles.accListItem}>
                  Block specific cookies
                </li>

                <li className={styles.accListItem}>
                  Block all cookies
                </li>

                <li className={styles.accListItem}>
                  Receive notifications when cookies
                  are being set
                </li>
              </ul>

              <p className={styles.accParagraph}>
                Please note that disabling essential
                cookies may affect website
                functionality and prevent certain
                services from working correctly.
              </p>
            </div>
          </details>

          <details className={styles.details}>
            <summary className={styles.summary}>
              How do I disable cookies?
            </summary>

            <div className={styles.accBody}>
              <p className={styles.accParagraph}>
                You can manage cookies through your
                browser settings.
              </p>

              <p className={styles.accParagraph}>
                Common browsers provide cookie
                controls within their privacy
                settings, including:
              </p>

              <ul className={styles.accList}>
                <li className={styles.accListItem}>
                  Google Chrome
                </li>

                <li className={styles.accListItem}>
                  Microsoft Edge
                </li>

                <li className={styles.accListItem}>
                  Mozilla Firefox
                </li>

                <li className={styles.accListItem}>
                  Safari
                </li>
              </ul>

              <p className={styles.accParagraph}>
                For detailed instructions, please
                refer to your browser&apos;s help
                documentation.
              </p>
            </div>
          </details>

          <details className={styles.details}>
            <summary className={styles.summary}>
              Will this Cookie Policy change?
            </summary>

            <div className={styles.accBody}>
              <p className={styles.accParagraph}>
                We may update this Cookie Policy from
                time to time to reflect changes in
                legal requirements, technologies,
                services or the cookies used on our
                website.
              </p>

              <p className={styles.accParagraph}>
                Any updates will be published on
                this page together with a revised
                &quot;Last Updated&quot; date.
              </p>
            </div>
          </details>
        </div>
      </section>

      {/* CONTACT */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Contact Us
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              If you have any questions about this
              Cookie Policy or how cookies are used
              on our website, please contact us using
              the contact details provided on our
              website.
            </p>

            <p className={styles.accParagraph}>
              We will make every effort to respond to
              privacy and cookie-related enquiries as
              quickly as possible.
            </p>
          </div>
        </div>
      </section>

      {/* COOKIE AUDIT SUMMARY */}
      <section className={styles.postcodeSection}>
        <div className={styles.container}>
          <h2 className={styles.postcodeHeading}>
            Current Cookie Audit Summary
          </h2>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.tableHeadCell}>
                    Category
                  </th>

                  <th className={styles.tableHeadCell}>
                    Cookies Found
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className={styles.tableCellFirst}>
                    Essential Authentication
                  </td>

                  <td className={styles.tableCellLast}>
                    Host-next-auth.csrf-token,
                    __Secure-next-auth.callback-url,
                    __Secure-next-auth.session-token
                  </td>
                </tr>

                <tr className={styles.tableBodyRowEven}>
                  <td className={styles.tableCellFirst}>
                    Payment Security
                  </td>

                  <td className={styles.tableCellLast}>
                    __stripe_mid
                  </td>
                </tr>

                <tr>
                  <td className={styles.tableCellFirst}>
                    Analytics
                  </td>

                  <td className={styles.tableCellLast}>
                    None Detected
                  </td>
                </tr>

                <tr className={styles.tableBodyRowEven}>
                  <td className={styles.tableCellFirst}>
                    Marketing
                  </td>

                  <td className={styles.tableCellLast}>
                    None Detected
                  </td>
                </tr>

                <tr>
                  <td className={styles.tableCellFirst}>
                    Preference Cookies
                  </td>

                  <td className={styles.tableCellLast}>
                    None Detected
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            className={styles.addressBlock}
            style={{ marginTop: "24px" }}
          >
            Based on the cookies identified during
            review, MYMARTS currently uses
            essential authentication cookies and
            payment-security cookies. No analytics,
            advertising or marketing cookies were
            detected at the time this policy was
            prepared.
          </div>
        </div>
      </section>
    </div>
  );
}