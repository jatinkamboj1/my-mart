import styles from "./page.module.scss";

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.page}>
      {/* HERO */}
      <div className={styles.pageHero}>
        <h1 className={styles.heroTitle}>
          Privacy Policy
        </h1>

        <div className={styles.heroSubtitle}>
          How MYMART LTD Collects, Uses and Protects Your Information
        </div>

        <div className={styles.heroSub2}>
          Your privacy and data protection rights explained
        </div>

        <small className={styles.heroSmall}>
          Last Updated: June 2026
        </small>
      </div>

      {/* QUICK LINKS */}
      <nav className={styles.quickLinks}>
        <a
          href="#introduction"
          className={styles.quickLink}
        >
          Introduction
        </a>

        <a
          href="#data_collection"
          className={styles.quickLink}
        >
          Information We Collect
        </a>

        <a
          href="#data_use"
          className={styles.quickLink}
        >
          How We Use Data
        </a>

        <a
          href="#your_rights"
          className={styles.quickLink}
        >
          Your Rights
        </a>
      </nav>

      {/* OVERVIEW */}
      <section className={styles.goodToKnow}>
        <div className={styles.container}>
          <h2
            className={`${styles.sectionHeading} ${styles.noPaddingTop}`}
          >
            Privacy Policy Overview
          </h2>

          <div className={styles.cardsGrid}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                Transparency
              </h3>

              <p className={styles.cardText}>
                We are committed to being transparent
                about how we collect, use, store and
                protect your personal information.
              </p>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                Security
              </h3>

              <p className={styles.cardText}>
                We implement appropriate technical and
                organisational measures to protect your
                personal information against
                unauthorised access, disclosure or loss.
              </p>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                Your Rights
              </h3>

              <p className={styles.cardText}>
                You have rights regarding the personal
                information we hold about you,
                including access, correction and
                deletion rights.
              </p>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                Compliance
              </h3>

              <p className={styles.cardText}>
                We process personal information in
                accordance with UK data protection laws
                including the UK GDPR and Data
                Protection Act 2018.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section
        className={styles.accordionSection}
        id="introduction"
      >
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Introduction
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              MYMART LTD respects your privacy and is
              committed to protecting your personal
              information.
            </p>

            <p className={styles.accParagraph}>
              This Privacy Policy explains how we
              collect, use, disclose, store and protect
              your personal information when you visit
              our website, purchase products, contact
              us or otherwise interact with our
              business.
            </p>

            <p className={styles.accParagraph}>
              This Privacy Policy applies to all users,
              customers, visitors and other individuals
              who interact with MYMART LTD.
            </p>

            <p className={styles.accParagraph}>
              By using our website and services, you
              acknowledge that your personal
              information may be processed in
              accordance with this Privacy Policy.
            </p>
          </div>
        </div>
      </section>

      {/* DATA CONTROLLER */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Data Controller
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              For the purposes of applicable data
              protection legislation, the data
              controller responsible for your personal
              information is:
            </p>

            <div className={styles.addressBlock}>
              <strong>MYMART LTD</strong>
              <br />
              UNIT 48
              <br />
              PHOENIX DISTRIBUTION PARK
              <br />
              HESTON
              <br />
              LONDON
              <br />
              TW5 9NB
              <br />
              <br />
              Email: info@mymarts.co.uk
              <br />
              Telephone: 033 0043 2122
            </div>

            <p className={styles.accParagraph}>
              If you have questions regarding this
              Privacy Policy or the way your personal
              information is handled, please contact us
              using the details above.
            </p>
          </div>
        </div>
      </section>

      {/* INFORMATION WE COLLECT */}
      <section
        className={styles.accordionSection}
        id="data_collection"
      >
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Information We Collect
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              We may collect, use, store and transfer
              different categories of personal
              information depending on how you interact
              with us.
            </p>

            <h6 className={styles.accSubHeading}>
              Identity Information
            </h6>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                First name
              </li>

              <li className={styles.accListItem}>
                Last name
              </li>

              <li className={styles.accListItem}>
                Username or account details
              </li>

              <li className={styles.accListItem}>
                Business name where applicable
              </li>
            </ul>

            <h6 className={styles.accSubHeading}>
              Contact Information
            </h6>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Billing address
              </li>

              <li className={styles.accListItem}>
                Delivery address
              </li>

              <li className={styles.accListItem}>
                Email address
              </li>

              <li className={styles.accListItem}>
                Telephone number
              </li>
            </ul>

            <h6 className={styles.accSubHeading}>
              Transaction Information
            </h6>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Order history
              </li>

              <li className={styles.accListItem}>
                Purchase information
              </li>

              <li className={styles.accListItem}>
                Payment transaction records
              </li>

              <li className={styles.accListItem}>
                Refund and return information
              </li>
            </ul>

            <h6 className={styles.accSubHeading}>
              Technical Information
            </h6>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                IP address
              </li>

              <li className={styles.accListItem}>
                Browser type and version
              </li>

              <li className={styles.accListItem}>
                Device information
              </li>

              <li className={styles.accListItem}>
                Operating system
              </li>

              <li className={styles.accListItem}>
                Website usage information
              </li>
            </ul>
                        <h6 className={styles.accSubHeading}>
              Profile Information
            </h6>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Account preferences
              </li>

              <li className={styles.accListItem}>
                Communication preferences
              </li>

              <li className={styles.accListItem}>
                Customer service enquiries
              </li>

              <li className={styles.accListItem}>
                Product reviews and feedback
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* INFORMATION COLLECTED AUTOMATICALLY */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Information Collected Automatically
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              When you visit our website, certain
              information may be collected
              automatically through cookies, server
              logs and similar technologies.
            </p>

            <p className={styles.accParagraph}>
              This information may include:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                IP address
              </li>

              <li className={styles.accListItem}>
                Browser type
              </li>

              <li className={styles.accListItem}>
                Device information
              </li>

              <li className={styles.accListItem}>
                Referring website information
              </li>

              <li className={styles.accListItem}>
                Pages viewed
              </li>

              <li className={styles.accListItem}>
                Time spent on pages
              </li>

              <li className={styles.accListItem}>
                Website navigation activity
              </li>
            </ul>

            <p className={styles.accParagraph}>
              Further information about cookies can
              be found in our Cookie Policy.
            </p>
          </div>
        </div>
      </section>

      {/* THIRD PARTY INFORMATION */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Information Received From Third Parties
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              We may receive personal information
              about you from trusted third-party
              providers where permitted by law.
            </p>

            <p className={styles.accParagraph}>
              These providers may include:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Payment service providers
              </li>

              <li className={styles.accListItem}>
                Delivery and courier companies
              </li>

              <li className={styles.accListItem}>
                Fraud prevention services
              </li>

              <li className={styles.accListItem}>
                Customer support platforms
              </li>

              <li className={styles.accListItem}>
                Marketing and advertising partners
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* HOW WE COLLECT DATA */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            How We Collect Personal Information
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              We collect personal information in a
              variety of ways, including:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                When you create an account
              </li>

              <li className={styles.accListItem}>
                When you place an order
              </li>

              <li className={styles.accListItem}>
                When you subscribe to marketing
                communications
              </li>

              <li className={styles.accListItem}>
                When you contact customer services
              </li>

              <li className={styles.accListItem}>
                When you submit reviews or feedback
              </li>

              <li className={styles.accListItem}>
                Through cookies and website
                technologies
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* LEGAL BASIS */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Legal Basis For Processing
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              We only process personal information
              where we have a lawful basis to do so.
            </p>

            <p className={styles.accParagraph}>
              Depending on the circumstances, our
              legal basis may include:
            </p>

            <h6 className={styles.accSubHeading}>
              Contractual Necessity
            </h6>

            <p className={styles.accParagraph}>
              Processing necessary to fulfil orders,
              provide products, process payments and
              deliver customer support.
            </p>

            <h6 className={styles.accSubHeading}>
              Legal Obligations
            </h6>

            <p className={styles.accParagraph}>
              Processing necessary to comply with
              legal, regulatory, tax and accounting
              obligations.
            </p>

            <h6 className={styles.accSubHeading}>
              Legitimate Interests
            </h6>

            <p className={styles.accParagraph}>
              Processing necessary for business
              administration, fraud prevention,
              security, analytics and service
              improvement.
            </p>

            <h6 className={styles.accSubHeading}>
              Consent
            </h6>

            <p className={styles.accParagraph}>
              Where required by law, we will seek
              your consent before processing
              personal information for specific
              purposes such as marketing
              communications.
            </p>
          </div>
        </div>
      </section>

      {/* HOW WE USE DATA */}
      <section
        className={styles.accordionSection}
        id="data_use"
      >
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            How We Use Your Personal Information
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              We may use personal information for
              the following purposes:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Processing and fulfilling orders
              </li>

              <li className={styles.accListItem}>
                Managing customer accounts
              </li>

              <li className={styles.accListItem}>
                Processing payments and refunds
              </li>

              <li className={styles.accListItem}>
                Delivering products and services
              </li>

              <li className={styles.accListItem}>
                Responding to enquiries and support
                requests
              </li>

              <li className={styles.accListItem}>
                Preventing fraud and abuse
              </li>

              <li className={styles.accListItem}>
                Improving our website and services
              </li>

              <li className={styles.accListItem}>
                Maintaining security
              </li>

              <li className={styles.accListItem}>
                Meeting legal obligations
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* MARKETING */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Marketing Communications
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Where permitted by law, we may send
              information about products, offers,
              promotions and business updates that
              may be of interest to you.
            </p>

            <p className={styles.accParagraph}>
              You can opt out of marketing
              communications at any time by:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Clicking unsubscribe links
              </li>

              <li className={styles.accListItem}>
                Contacting our customer service team
              </li>

              <li className={styles.accListItem}>
                Updating communication preferences
                in your account
              </li>
            </ul>

            <p className={styles.accParagraph}>
              Opting out of marketing does not
              prevent us from sending service
              messages relating to orders,
              transactions or account activity.
            </p>
          </div>
        </div>
      </section>
            {/* SHARING YOUR INFORMATION */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Sharing Your Personal Information
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              We may share your personal information
              with trusted third parties where
              necessary to operate our business and
              provide services to you.
            </p>

            <p className={styles.accParagraph}>
              These may include:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Payment service providers
              </li>

              <li className={styles.accListItem}>
                Courier and delivery companies
              </li>

              <li className={styles.accListItem}>
                Website hosting providers
              </li>

              <li className={styles.accListItem}>
                Customer service providers
              </li>

              <li className={styles.accListItem}>
                IT and security service providers
              </li>

              <li className={styles.accListItem}>
                Professional advisers
              </li>

              <li className={styles.accListItem}>
                Regulatory authorities where required
              </li>
            </ul>

            <p className={styles.accParagraph}>
              We require all third parties to respect
              the security of your personal information
              and process it in accordance with
              applicable data protection laws.
            </p>
          </div>
        </div>
      </section>

      {/* INTERNATIONAL TRANSFERS */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            International Transfers
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Some of our service providers may be
              located outside the United Kingdom.
            </p>

            <p className={styles.accParagraph}>
              Whenever we transfer personal
              information internationally, we ensure
              that appropriate safeguards are in place
              to protect your information and comply
              with applicable data protection laws.
            </p>

            <p className={styles.accParagraph}>
              These safeguards may include:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Adequacy regulations
              </li>

              <li className={styles.accListItem}>
                International Data Transfer Agreements
                (IDTAs)
              </li>

              <li className={styles.accListItem}>
                Standard Contractual Clauses
              </li>

              <li className={styles.accListItem}>
                Other approved legal mechanisms
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* DATA SECURITY */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Data Security
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              We have implemented appropriate
              technical and organisational security
              measures designed to protect your
              personal information from:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Unauthorised access
              </li>

              <li className={styles.accListItem}>
                Unauthorised disclosure
              </li>

              <li className={styles.accListItem}>
                Alteration
              </li>

              <li className={styles.accListItem}>
                Loss
              </li>

              <li className={styles.accListItem}>
                Misuse
              </li>

              <li className={styles.accListItem}>
                Destruction
              </li>
            </ul>

            <p className={styles.accParagraph}>
              Access to personal information is
              restricted to authorised personnel,
              contractors and service providers who
              require access to perform their duties.
            </p>

            <p className={styles.accParagraph}>
              While we take reasonable steps to
              protect personal information, no method
              of transmission over the internet or
              electronic storage system can be
              guaranteed to be completely secure.
            </p>
          </div>
        </div>
      </section>

      {/* DATA RETENTION */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Data Retention
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              We retain personal information only for
              as long as necessary to fulfil the
              purposes for which it was collected,
              including:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Providing products and services
              </li>

              <li className={styles.accListItem}>
                Managing customer relationships
              </li>

              <li className={styles.accListItem}>
                Meeting legal obligations
              </li>

              <li className={styles.accListItem}>
                Resolving disputes
              </li>

              <li className={styles.accListItem}>
                Enforcing agreements
              </li>
            </ul>

            <p className={styles.accParagraph}>
              Different categories of personal
              information may be retained for
              different periods depending on legal,
              regulatory and operational
              requirements.
            </p>
          </div>
        </div>
      </section>

      {/* THIRD PARTY LINKS */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Third-Party Websites
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Our website may contain links to
              third-party websites, services or
              applications.
            </p>

            <p className={styles.accParagraph}>
              Clicking on those links may allow third
              parties to collect or share information
              about you.
            </p>

            <p className={styles.accParagraph}>
              We do not control third-party websites
              and are not responsible for their
              privacy practices. We encourage you to
              read the privacy policies of any website
              you visit.
            </p>
          </div>
        </div>
      </section>

      {/* CHILDREN */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Children&apos;s Privacy
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Our website and services are not
              intended for children under the age of
              13.
            </p>

            <p className={styles.accParagraph}>
              We do not knowingly collect personal
              information from children without
              appropriate parental consent.
            </p>

            <p className={styles.accParagraph}>
              If you believe that a child has provided
              personal information to us, please
              contact us and we will take appropriate
              steps to investigate and remove the
              information where necessary.
            </p>
          </div>
        </div>
      </section>

      {/* YOUR RIGHTS */}
      <section
        className={styles.accordionSection}
        id="your_rights"
      >
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Your Data Protection Rights
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Under UK data protection legislation,
              you may have a number of rights
              regarding your personal information.
            </p>

            <h6 className={styles.accSubHeading}>
              Right of Access
            </h6>

            <p className={styles.accParagraph}>
              You may request access to the personal
              information we hold about you.
            </p>

            <h6 className={styles.accSubHeading}>
              Right to Rectification
            </h6>

            <p className={styles.accParagraph}>
              You may request correction of inaccurate
              or incomplete personal information.
            </p>

            <h6 className={styles.accSubHeading}>
              Right to Erasure
            </h6>

            <p className={styles.accParagraph}>
              In certain circumstances, you may
              request deletion of your personal
              information.
            </p>

            <h6 className={styles.accSubHeading}>
              Right to Restrict Processing
            </h6>

            <p className={styles.accParagraph}>
              You may request that we restrict how we
              process your personal information in
              certain situations.
            </p>
                        <h6 className={styles.accSubHeading}>
              Right to Data Portability
            </h6>

            <p className={styles.accParagraph}>
              Where applicable, you may request a copy
              of your personal information in a
              structured, commonly used and
              machine-readable format and request that
              it be transferred to another
              organisation.
            </p>

            <h6 className={styles.accSubHeading}>
              Right to Object
            </h6>

            <p className={styles.accParagraph}>
              You may object to certain processing
              activities, including processing based
              on legitimate interests and processing
              for direct marketing purposes.
            </p>

            <h6 className={styles.accSubHeading}>
              Right to Withdraw Consent
            </h6>

            <p className={styles.accParagraph}>
              Where processing is based on consent,
              you may withdraw that consent at any
              time. Withdrawal of consent will not
              affect the lawfulness of processing
              carried out before consent was
              withdrawn.
            </p>

            <h6 className={styles.accSubHeading}>
              Automated Decision Making
            </h6>

            <p className={styles.accParagraph}>
              You have the right not to be subject to
              decisions based solely on automated
              processing, including profiling, where
              such decisions produce legal or
              similarly significant effects, except
              where permitted by law.
            </p>
          </div>
        </div>
      </section>

      {/* ICO COMPLAINTS */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Complaints
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              We would appreciate the opportunity to
              address any concerns you may have about
              our handling of your personal
              information before you contact a
              supervisory authority.
            </p>

            <p className={styles.accParagraph}>
              However, you have the right to make a
              complaint at any time to the Information
              Commissioner&apos;s Office (ICO), the UK
              supervisory authority for data
              protection matters.
            </p>

            <p className={styles.accParagraph}>
              Further information can be obtained
              directly from the ICO.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT US */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Contact Us
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              If you have any questions regarding this
              Privacy Policy, your personal
              information or your data protection
              rights, please contact us:
            </p>

            <div className={styles.addressBlock}>
              <strong>MYMART LTD</strong>
              <br />
              UNIT 48
              <br />
              PHOENIX DISTRIBUTION PARK
              <br />
              HESTON
              <br />
              LONDON
              <br />
              TW5 9NB
              <br />
              <br />
              Email: info@mymarts.co.uk
              <br />
              Telephone: 033 0043 2122
            </div>

            <p className={styles.accParagraph}>
              We will respond to privacy-related
              enquiries and requests in accordance
              with applicable legal requirements.
            </p>
          </div>
        </div>
      </section>

      {/* CHANGES TO POLICY */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Changes to This Privacy Policy
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              We may update this Privacy Policy from
              time to time to reflect changes in our
              business practices, legal obligations,
              technologies or regulatory
              requirements.
            </p>

            <p className={styles.accParagraph}>
              Any updates will be published on this
              page together with a revised &quot;Last
              Updated&quot; date.
            </p>

            <p className={styles.accParagraph}>
              We encourage you to review this Privacy
              Policy periodically to stay informed
              about how we protect your personal
              information.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}