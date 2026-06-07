import styles from "./page.module.scss";

export default function TermsConditionsPage() {
  return (
    <div className={styles.page}>
      {/* HERO */}
      <div className={styles.pageHero}>
        <h1 className={styles.heroTitle}>
          Terms & Conditions
        </h1>

        <div className={styles.heroSubtitle}>
          Terms Governing Use of MYMART LTD Services
        </div>

        <div className={styles.heroSub2}>
          Please read these terms carefully before using our website
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
          href="#orders"
          className={styles.quickLink}
        >
          Orders
        </a>

        <a
          href="#delivery"
          className={styles.quickLink}
        >
          Delivery
        </a>

        <a
          href="#returns"
          className={styles.quickLink}
        >
          Returns
        </a>
      </nav>

      {/* OVERVIEW */}
      <section className={styles.goodToKnow}>
        <div className={styles.container}>
          <h2
            className={`${styles.sectionHeading} ${styles.noPaddingTop}`}
          >
            Terms & Conditions Overview
          </h2>

          <div className={styles.cardsGrid}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                Ordering
              </h3>

              <p className={styles.cardText}>
                These terms explain how orders are
                placed, accepted and processed by
                MYMART LTD.
              </p>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                Delivery
              </h3>

              <p className={styles.cardText}>
                Information regarding delivery
                services, timescales and customer
                responsibilities.
              </p>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                Returns
              </h3>

              <p className={styles.cardText}>
                Your rights regarding cancellations,
                returns, refunds and faulty goods.
              </p>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                Legal Rights
              </h3>

              <p className={styles.cardText}>
                Information regarding liability,
                intellectual property and applicable
                law.
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
              These Terms & Conditions, together with
              our Privacy Policy, Cookie Policy and
              Acceptable Use Policy, set out the legal
              terms and conditions on which MYMART LTD
              supplies products through its website and
              governs your use of our website.
            </p>

            <p className={styles.accParagraph}>
              By accessing, browsing, registering with
              or purchasing from our website, you agree
              to comply with these Terms &
              Conditions. :contentReference
            </p>

            <p className={styles.accParagraph}>
              If you do not agree with these terms,
              you must not use our website.
            </p>
          </div>
        </div>
      </section>

      {/* INFORMATION ABOUT US */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Information About Us
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              The website is operated by:
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
              References to &quot;MYMART&quot;, &quot;we&quot;, &quot;our&quot; and
              &quot;us&quot; mean MYMART LTD throughout these
              Terms & Conditions.
            </p>
          </div>
        </div>
      </section>

      {/* WEBSITE USE */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Use of Our Website
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              You may use our website only for lawful
              purposes and in accordance with all
              applicable laws and regulations.
            </p>

            <p className={styles.accParagraph}>
              You agree not to:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Misuse the website.
              </li>

              <li className={styles.accListItem}>
                Introduce viruses, malware or harmful
                code.
              </li>

              <li className={styles.accListItem}>
                Attempt unauthorised access to systems
                or data.
              </li>

              <li className={styles.accListItem}>
                Interfere with website functionality.
              </li>

              <li className={styles.accListItem}>
                Breach applicable laws or regulations.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Products
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Product images, descriptions,
              specifications and dimensions are
              provided for guidance only.
            </p>

            <p className={styles.accParagraph}>
              We make reasonable efforts to ensure
              information displayed on our website is
              accurate. However, colours, packaging,
              product appearance and specifications may
              vary from those displayed.
            </p>

            <p className={styles.accParagraph}>
              We reserve the right to amend product
              information, pricing and availability
              without prior notice.
            </p>
          </div>
        </div>
      </section>

      {/* ORDERS */}
      <section
        className={styles.accordionSection}
        id="orders"
      >
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Orders
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              When you place an order through our
              website, you are making an offer to
              purchase products from MYMART LTD.
            </p>

            <p className={styles.accParagraph}>
              An automated confirmation email confirms
              receipt of your order but does not
              constitute acceptance of the order.
            </p>

            <p className={styles.accParagraph}>
              Acceptance of an order occurs when we
              dispatch the goods or otherwise confirm
              acceptance.
            </p>

            <p className={styles.accParagraph}>
              We reserve the right to refuse or cancel
              any order where:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Products are unavailable.
              </li>

              <li className={styles.accListItem}>
                Pricing errors occur.
              </li>

              <li className={styles.accListItem}>
                Fraud is suspected.
              </li>

              <li className={styles.accListItem}>
                Payment authorisation fails.
              </li>

              <li className={styles.accListItem}>
                We are unable to fulfil the order.
              </li>
            </ul>
          </div>
        </div>
      </section>
            {/* PRICING */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Pricing
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              All prices displayed on our website are
              shown in Pounds Sterling (₹).
            </p>

            <p className={styles.accParagraph}>
              We make every effort to ensure prices
              displayed on our website are accurate.
              However, errors may occasionally occur.
            </p>

            <p className={styles.accParagraph}>
              If a pricing error is identified after
              an order has been placed, we reserve the
              right to contact you before dispatch to
              provide the correct pricing information.
            </p>

            <p className={styles.accParagraph}>
              You will be given the opportunity to
              proceed with the corrected price or
              cancel the order for a full refund.
            </p>
          </div>
        </div>
      </section>

      {/* VAT */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            VAT
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Where applicable, Value Added Tax (VAT)
              will be charged at the prevailing rate
              and included within the price displayed
              on the website unless otherwise stated.
            </p>

            <p className={styles.accParagraph}>
              VAT invoices are available upon request
              and may also be included within order
              confirmation documentation.
            </p>
          </div>
        </div>
      </section>

      {/* PAYMENT */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Payment
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Payment must be received and authorised
              before goods are dispatched unless
              otherwise agreed in writing.
            </p>

            <p className={styles.accParagraph}>
              We accept payment through approved
              payment methods displayed during the
              checkout process.
            </p>

            <p className={styles.accParagraph}>
              All payment transactions are subject to
              validation, verification and fraud
              prevention checks.
            </p>

            <p className={styles.accParagraph}>
              We reserve the right to refuse or cancel
              transactions where fraudulent activity
              is suspected.
            </p>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section
        className={styles.accordionSection}
        id="delivery"
      >
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Delivery
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Delivery times quoted on our website are
              estimates only and are provided in good
              faith.
            </p>

            <p className={styles.accParagraph}>
              While we make every reasonable effort to
              meet estimated delivery dates, delays
              may occur due to circumstances beyond
              our control.
            </p>

            <p className={styles.accParagraph}>
              Delivery dates shall not be considered
              guaranteed unless expressly agreed in
              writing.
            </p>

            <p className={styles.accParagraph}>
              MYMART LTD shall not be liable for any
              loss, costs or damages resulting from
              delivery delays.
            </p>
          </div>
        </div>
      </section>

      {/* DELIVERY RESTRICTIONS */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Delivery Restrictions
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Certain geographical locations may be
              subject to additional delivery charges,
              extended delivery times or delivery
              restrictions.
            </p>

            <p className={styles.accParagraph}>
              Delivery services may not be available
              to all locations.
            </p>

            <p className={styles.accParagraph}>
              Customers are responsible for providing
              accurate delivery information when
              placing orders.
            </p>

            <p className={styles.accParagraph}>
              Additional charges arising from
              incorrect delivery information may be
              charged to the customer.
            </p>
          </div>
        </div>
      </section>

      {/* CUSTOMER RESPONSIBILITIES */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Customer Responsibilities
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Customers are responsible for ensuring
              that:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Delivery details are accurate.
              </li>

              <li className={styles.accListItem}>
                Someone is available to receive the
                delivery where required.
              </li>

              <li className={styles.accListItem}>
                Appropriate access is available for
                delivery vehicles.
              </li>

              <li className={styles.accListItem}>
                Ordered products are suitable for
                their intended purpose.
              </li>

              <li className={styles.accListItem}>
                Any required permissions or approvals
                are obtained before use.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* RISK */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Risk
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Responsibility for products passes to
              the customer upon delivery.
            </p>

            <p className={styles.accParagraph}>
              Customers should inspect goods promptly
              upon receipt and notify us of any
              damage, shortages or discrepancies as
              soon as reasonably possible.
            </p>
          </div>
        </div>
      </section>

      {/* OWNERSHIP OF GOODS */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Ownership of Goods
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Ownership of goods remains with MYMART
              LTD until full payment has been received
              in cleared funds.
            </p>

            <p className={styles.accParagraph}>
              Until ownership transfers, customers
              must store goods separately and maintain
              them in good condition.
            </p>

            <p className={styles.accParagraph}>
              We reserve the right to recover goods
              where payment remains outstanding.
            </p>
          </div>
        </div>
      </section>
            {/* RETURNS */}
      <section
        className={styles.accordionSection}
        id="returns"
      >
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Returns and Cancellations
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Consumers purchasing products online
              may have cancellation rights under
              applicable consumer protection
              legislation.
            </p>

            <p className={styles.accParagraph}>
              Subject to applicable exclusions, you
              may cancel your order within the
              statutory cancellation period and return
              eligible goods for a refund.
            </p>

            <p className={styles.accParagraph}>
              Returned goods must be unused,
              undamaged and returned in a condition
              suitable for resale wherever reasonably
              possible.
            </p>

            <p className={styles.accParagraph}>
              Customers are responsible for taking
              reasonable care of goods while in their
              possession.
            </p>
          </div>
        </div>
      </section>

      {/* CONSUMER RIGHTS */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Consumer Rights
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Nothing in these Terms & Conditions
              affects your statutory rights under
              applicable consumer protection laws.
            </p>

            <p className={styles.accParagraph}>
              Consumers may be entitled to remedies
              where goods are faulty, not as
              described or not fit for purpose.
            </p>

            <p className={styles.accParagraph}>
              These statutory rights exist in
              addition to any rights provided under
              this agreement.
            </p>
          </div>
        </div>
      </section>

      {/* FAULTY GOODS */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Faulty, Damaged or Incorrect Goods
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              If goods arrive damaged, defective,
              faulty or incorrect, customers should
              notify MYMART LTD as soon as reasonably
              possible.
            </p>

            <p className={styles.accParagraph}>
              We may request photographs or other
              evidence to assist with our
              investigation.
            </p>

            <p className={styles.accParagraph}>
              Where appropriate, we may offer a
              replacement, repair, refund or other
              remedy in accordance with applicable
              law.
            </p>

            <p className={styles.accParagraph}>
              Customers should retain goods and
              packaging where requested until the
              matter has been resolved.
            </p>
          </div>
        </div>
      </section>

      {/* REFUNDS */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Refunds
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Approved refunds will normally be
              processed using the original payment
              method used for the transaction.
            </p>

            <p className={styles.accParagraph}>
              Refund processing times may vary
              depending on payment providers and
              financial institutions.
            </p>

            <p className={styles.accParagraph}>
              We reserve the right to inspect returned
              goods before issuing a refund where
              appropriate.
            </p>
          </div>
        </div>
      </section>

      {/* BUSINESS CUSTOMERS */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Business Customers
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Where products are purchased for
              business purposes, certain consumer
              protections may not apply.
            </p>

            <p className={styles.accParagraph}>
              Business customers are responsible for
              ensuring that products are suitable for
              their intended commercial use.
            </p>

            <p className={styles.accParagraph}>
              Any business-specific arrangements,
              quotations or agreements may supplement
              these Terms & Conditions.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCT SUITABILITY */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Product Suitability
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Customers are responsible for
              determining whether products are
              suitable for their intended purpose.
            </p>

            <p className={styles.accParagraph}>
              Recommendations or guidance provided by
              MYMART LTD are offered in good faith but
              should not be relied upon as a guarantee
              of suitability.
            </p>

            <p className={styles.accParagraph}>
              Customers should undertake their own
              assessment before purchasing products
              for specialist, commercial or critical
              applications.
            </p>
          </div>
        </div>
      </section>

      {/* WARRANTIES */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Warranties
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Any manufacturer warranties provided
              with products remain subject to the
              manufacturer&apos;s terms and conditions.
            </p>

            <p className={styles.accParagraph}>
              Except where required by law, MYMART
              LTD does not provide additional
              warranties beyond those expressly
              stated.
            </p>

            <p className={styles.accParagraph}>
              Nothing in these Terms & Conditions
              excludes rights that cannot legally be
              excluded.
            </p>
          </div>
        </div>
      </section>

      {/* LIMITATION OF LIABILITY */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Limitation of Liability
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Nothing in these Terms & Conditions
              excludes or limits liability where such
              exclusion or limitation would be
              unlawful.
            </p>

            <p className={styles.accParagraph}>
              Subject to applicable law, MYMART LTD
              shall not be liable for indirect,
              incidental, consequential or special
              losses arising from the use of our
              products, services or website.
            </p>

            <p className={styles.accParagraph}>
              This includes, but is not limited to:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Loss of profits
              </li>

              <li className={styles.accListItem}>
                Loss of revenue
              </li>

              <li className={styles.accListItem}>
                Loss of business opportunity
              </li>

              <li className={styles.accListItem}>
                Loss of anticipated savings
              </li>

              <li className={styles.accListItem}>
                Loss of goodwill
              </li>

              <li className={styles.accListItem}>
                Business interruption
              </li>
            </ul>
                        <p className={styles.accParagraph}>
              To the fullest extent permitted by law,
              our total liability arising under or in
              connection with any contract shall not
              exceed the amount paid by the customer
              for the relevant products.
            </p>

            <p className={styles.accParagraph}>
              Nothing in these Terms & Conditions
              excludes liability for:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Death or personal injury caused by
                negligence.
              </li>

              <li className={styles.accListItem}>
                Fraud or fraudulent misrepresentation.
              </li>

              <li className={styles.accListItem}>
                Any matter that cannot legally be
                excluded or limited.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FORCE MAJEURE */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Force Majeure
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              MYMART LTD shall not be liable for any
              delay or failure to perform obligations
              where such delay or failure results from
              circumstances beyond our reasonable
              control.
            </p>

            <p className={styles.accParagraph}>
              Such circumstances may include:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Natural disasters
              </li>

              <li className={styles.accListItem}>
                Severe weather events
              </li>

              <li className={styles.accListItem}>
                Industrial disputes
              </li>

              <li className={styles.accListItem}>
                Government action
              </li>

              <li className={styles.accListItem}>
                Supply chain disruption
              </li>

              <li className={styles.accListItem}>
                Transportation failures
              </li>

              <li className={styles.accListItem}>
                Utility outages
              </li>

              <li className={styles.accListItem}>
                Cybersecurity incidents
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* INTELLECTUAL PROPERTY */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Intellectual Property Rights
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              All intellectual property rights in our
              website, content, product information,
              graphics, logos, photographs, software,
              designs and branding remain the property
              of MYMART LTD or its licensors.
            </p>

            <p className={styles.accParagraph}>
              You may view, print and download content
              from the website solely for personal and
              non-commercial use.
            </p>

            <p className={styles.accParagraph}>
              You must not reproduce, copy, distribute,
              modify, republish or commercially exploit
              any website content without prior written
              permission.
            </p>
          </div>
        </div>
      </section>

      {/* WEBSITE AVAILABILITY */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Website Availability
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              We aim to ensure that our website is
              available at all times. However, we do
              not guarantee uninterrupted access.
            </p>

            <p className={styles.accParagraph}>
              Access to the website may be suspended,
              restricted or interrupted from time to
              time for maintenance, updates, repairs
              or reasons beyond our control.
            </p>

            <p className={styles.accParagraph}>
              MYMART LTD shall not be liable for any
              losses resulting from temporary website
              unavailability.
            </p>
          </div>
        </div>
      </section>

      {/* THIRD PARTY LINKS */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Third-Party Websites and Links
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Our website may contain links to
              third-party websites and services.
            </p>

            <p className={styles.accParagraph}>
              These links are provided for convenience
              only and do not imply endorsement by
              MYMART LTD.
            </p>

            <p className={styles.accParagraph}>
              We are not responsible for the content,
              security, availability or privacy
              practices of third-party websites.
            </p>

            <p className={styles.accParagraph}>
              Users access third-party websites at
              their own risk and should review the
              applicable terms and privacy policies of
              those websites.
            </p>
          </div>
        </div>
      </section>

      {/* ACCOUNT SECURITY */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Account Security
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              If you create an account on our website,
              you are responsible for maintaining the
              confidentiality of your account
              credentials.
            </p>

            <p className={styles.accParagraph}>
              You must take reasonable steps to prevent
              unauthorised access to your account and
              notify us immediately if you suspect any
              security breach.
            </p>

            <p className={styles.accParagraph}>
              MYMART LTD shall not be responsible for
              losses resulting from failure to protect
              your account credentials.
            </p>
          </div>
        </div>
      </section>

      {/* PRIVACY & DATA PROTECTION */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Privacy and Data Protection
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              We process personal information in
              accordance with applicable data
              protection laws and our Privacy Policy.
            </p>

            <p className={styles.accParagraph}>
              By using our website, you acknowledge
              that personal information may be
              collected, stored and processed as
              described in our Privacy Policy.
            </p>

            <p className={styles.accParagraph}>
              We encourage all users to review our
              Privacy Policy and Cookie Policy for
              further information regarding how their
              personal information is handled.
            </p>
          </div>
        </div>
      </section>

      {/* ENTIRE AGREEMENT */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Entire Agreement
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              These Terms & Conditions, together with
              our Privacy Policy, Cookie Policy,
              Acceptable Use Policy and any documents
              expressly referred to within them,
              constitute the entire agreement between
              you and MYMART LTD regarding the use of
              our website and the purchase of products.
            </p>

            <p className={styles.accParagraph}>
              They supersede all previous agreements,
              understandings and communications,
              whether written or oral, relating to the
              same subject matter.
            </p>
          </div>
        </div>
      </section>
            {/* SEVERABILITY */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Severability
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              If any provision of these Terms &
              Conditions is found by a court or other
              competent authority to be invalid,
              unlawful or unenforceable, that
              provision shall be severed from the
              remaining provisions.
            </p>

            <p className={styles.accParagraph}>
              The remaining provisions shall continue
              in full force and effect to the maximum
              extent permitted by law.
            </p>
          </div>
        </div>
      </section>

      {/* WAIVER */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Waiver
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Failure by MYMART LTD to enforce any
              right or provision under these Terms &
              Conditions shall not constitute a waiver
              of that right or provision.
            </p>

            <p className={styles.accParagraph}>
              Any waiver shall only be effective if
              made expressly in writing.
            </p>
          </div>
        </div>
      </section>

      {/* ASSIGNMENT */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Assignment
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              MYMART LTD may assign, transfer,
              subcontract or otherwise deal with its
              rights and obligations under these Terms
              & Conditions at any time.
            </p>

            <p className={styles.accParagraph}>
              Customers may not assign, transfer or
              otherwise dispose of their rights or
              obligations without our prior written
              consent.
            </p>
          </div>
        </div>
      </section>

      {/* GOVERNING LAW */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Governing Law
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              These Terms & Conditions and any dispute
              or claim arising out of or in connection
              with them shall be governed by and
              construed in accordance with the laws of
              England and Wales.
            </p>

            <p className={styles.accParagraph}>
              Nothing in these Terms & Conditions
              affects any mandatory consumer rights
              available under applicable law.
            </p>
          </div>
        </div>
      </section>

      {/* JURISDICTION */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Jurisdiction
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Subject to any applicable consumer
              protection laws, the courts of England
              and Wales shall have exclusive
              jurisdiction to resolve any disputes
              arising from or relating to these Terms
              & Conditions.
            </p>

            <p className={styles.accParagraph}>
              Customers residing in other parts of the
              United Kingdom may have additional
              statutory rights regarding jurisdiction
              and dispute resolution.
            </p>
          </div>
        </div>
      </section>

      {/* CHANGES TO TERMS */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Changes to These Terms & Conditions
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              MYMART LTD reserves the right to amend
              these Terms & Conditions at any time.
            </p>

            <p className={styles.accParagraph}>
              Updated versions will be published on
              this page together with a revised &quot;Last
              Updated&quot; date where appropriate.
            </p>

            <p className={styles.accParagraph}>
              Continued use of our website following
              publication of changes constitutes
              acceptance of the revised Terms &
              Conditions.
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
              If you have any questions regarding
              these Terms & Conditions, please contact
              us using the details below:
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
              We will make reasonable efforts to
              respond to enquiries relating to our
              products, services and legal policies as
              promptly as possible.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}