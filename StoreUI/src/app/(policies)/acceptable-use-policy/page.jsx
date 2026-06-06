import styles from "./page.module.scss";

export default function AcceptableUsePolicyPage() {
  return (
    <div className={styles.page}>
      {/* HERO */}
      <div className={styles.pageHero}>
        <h1 className={styles.heroTitle}>
          Acceptable Use Policy
        </h1>

        <div className={styles.heroSubtitle}>
          Rules For Using MYMARTS Services
        </div>

        <div className={styles.heroSub2}>
          Protecting our customers, systems and community
        </div>

        <small className={styles.heroSmall}>
          Last Updated: June 2026
        </small>
      </div>

      {/* QUICK LINKS */}
      <nav className={styles.quickLinks}>
        <a
          href="#acceptable_use"
          className={styles.quickLink}
        >
          Acceptable Use
        </a>

        <a
          href="#prohibited_uses"
          className={styles.quickLink}
        >
          Prohibited Uses
        </a>

        <a
          href="#content_standards"
          className={styles.quickLink}
        >
          Content Standards
        </a>

        <a
          href="#enforcement"
          className={styles.quickLink}
        >
          Enforcement
        </a>
      </nav>

      {/* POLICY OVERVIEW */}
      <section className={styles.goodToKnow}>
        <div className={styles.container}>
          <h2
            className={`${styles.sectionHeading} ${styles.noPaddingTop}`}
          >
            Policy Overview
          </h2>

          <div className={styles.cardsGrid}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                Lawful Use
              </h3>

              <p className={styles.cardText}>
                Our website and services must only be
                used for lawful and legitimate purposes.
                Users must comply with all applicable
                laws and regulations.
              </p>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                Security
              </h3>

              <p className={styles.cardText}>
                Users must not attempt to compromise,
                disrupt or gain unauthorised access to
                MYMARTS systems, infrastructure or data.
              </p>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                Respect Others
              </h3>

              <p className={styles.cardText}>
                Users must not engage in behaviour that
                is abusive, threatening, offensive,
                misleading or harmful to others.
              </p>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>
                Enforcement
              </h3>

              <p className={styles.cardText}>
                Violations may result in warnings,
                removal of content, suspension of
                access or permanent account termination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section
        className={styles.accordionSection}
        id="acceptable_use"
      >
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Introduction
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              This Acceptable Use Policy sets out the
              terms between you and MYMARTS under which
              you may access and use our website,
              services, applications and related
              platforms (&quot;Site&quot;).
            </p>

            <p className={styles.accParagraph}>
              This Acceptable Use Policy applies to all
              visitors, users, customers, suppliers and
              any other person accessing or using the
              Site.
            </p>

            <p className={styles.accParagraph}>
              By using our Site, you confirm that you
              accept this Acceptable Use Policy and
              agree to comply with it.
            </p>

            <p className={styles.accParagraph}>
              This policy supplements our Terms &
              Conditions, Privacy Policy, Cookie Policy
              and any other policies published on the
              Site.
            </p>

            <p className={styles.accParagraph}>
              If you do not agree to this Acceptable
              Use Policy, you must not use our Site.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            About MYMARTS
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              MYMARTS operates this website and related
              services.
            </p>

            <p className={styles.accParagraph}>
              References to:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                &quot;MYMARTS&quot;
              </li>

              <li className={styles.accListItem}>
                &quot;we&quot;
              </li>

              <li className={styles.accListItem}>
                &quot;us&quot;
              </li>

              <li className={styles.accListItem}>
                &quot;our&quot;
              </li>
            </ul>

            <p className={styles.accParagraph}>
              mean MYMARTS and its affiliates,
              employees, agents, contractors and
              representatives where applicable.
            </p>

            <p className={styles.accParagraph}>
              References to:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                &quot;you&quot;
              </li>

              <li className={styles.accListItem}>
                &quot;your&quot;
              </li>

              <li className={styles.accListItem}>
                &quot;user&quot;
              </li>
            </ul>

            <p className={styles.accParagraph}>
              mean any person who accesses or uses the
              Site.
            </p>
          </div>
        </div>
      </section>

      {/* ACCEPTABLE USE */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Acceptable Use
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              You may use our Site only for lawful
              purposes and in accordance with this
              Acceptable Use Policy.
            </p>

            <p className={styles.accParagraph}>
              You agree to use the Site in a manner
              that:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Complies with all applicable laws and
                regulations.
              </li>

              <li className={styles.accListItem}>
                Does not infringe the rights of others.
              </li>

              <li className={styles.accListItem}>
                Does not interfere with the operation
                of the Site.
              </li>

              <li className={styles.accListItem}>
                Does not compromise the security of the
                Site or its users.
              </li>

              <li className={styles.accListItem}>
                Does not damage the reputation of
                MYMARTS.
              </li>
            </ul>

            <p className={styles.accParagraph}>
              You are responsible for ensuring that all
              persons who access the Site through your
              internet connection are aware of this
              policy and comply with it.
            </p>
          </div>
        </div>
      </section>

      {/* PROHIBITED USES */}
      <section
        className={styles.accordionSection}
        id="prohibited_uses"
      >
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Prohibited Uses
          </h2>

          <div className={styles.accBody}>
            <h6 className={styles.accSubHeading}>
              Illegal Activities
            </h6>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Using the Site in any way that breaches
                applicable local, national or
                international laws or regulations.
              </li>

              <li className={styles.accListItem}>
                Using the Site for any unlawful
                purpose.
              </li>

              <li className={styles.accListItem}>
                Facilitating or encouraging unlawful
                conduct.
              </li>

              <li className={styles.accListItem}>
                Engaging in fraudulent activities.
              </li>
            </ul>

            <h6 className={styles.accSubHeading}>
              Harmful Conduct
            </h6>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Harassing, threatening, intimidating or
                abusing any person.
              </li>

              <li className={styles.accListItem}>
                Promoting violence or hatred.
              </li>

              <li className={styles.accListItem}>
                Exploiting, harming or attempting to
                harm minors.
              </li>

              <li className={styles.accListItem}>
                Impersonating another person or
                organisation.
              </li>
            </ul>
                        <h6 className={styles.accSubHeading}>
              Misuse of Content
            </h6>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Copying website content without
                permission.
              </li>

              <li className={styles.accListItem}>
                Reproducing, duplicating or reselling
                any part of the Site unless expressly
                authorised.
              </li>

              <li className={styles.accListItem}>
                Removing copyright notices or
                proprietary markings.
              </li>

              <li className={styles.accListItem}>
                Using Site content in a misleading
                manner.
              </li>
            </ul>

            <h6 className={styles.accSubHeading}>
              Spam and Unauthorised Communications
            </h6>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Sending unsolicited advertising.
              </li>

              <li className={styles.accListItem}>
                Sending bulk email communications.
              </li>

              <li className={styles.accListItem}>
                Distributing spam.
              </li>

              <li className={styles.accListItem}>
                Conducting unauthorised marketing
                campaigns.
              </li>

              <li className={styles.accListItem}>
                Collecting user information for
                marketing purposes without consent.
              </li>
            </ul>

            <h6 className={styles.accSubHeading}>
              Malicious Software
            </h6>

            <p className={styles.accParagraph}>
              You must not knowingly upload,
              distribute or transmit:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Viruses
              </li>

              <li className={styles.accListItem}>
                Malware
              </li>

              <li className={styles.accListItem}>
                Ransomware
              </li>

              <li className={styles.accListItem}>
                Spyware
              </li>

              <li className={styles.accListItem}>
                Adware
              </li>

              <li className={styles.accListItem}>
                Trojan horses
              </li>

              <li className={styles.accListItem}>
                Worms
              </li>

              <li className={styles.accListItem}>
                Time bombs
              </li>

              <li className={styles.accListItem}>
                Keystroke loggers
              </li>

              <li className={styles.accListItem}>
                Malicious scripts
              </li>
            </ul>

            <p className={styles.accParagraph}>
              You must not attempt to introduce any
              material designed to interfere with the
              operation of the Site or any connected
              systems.
            </p>
          </div>
        </div>
      </section>

      {/* SYSTEM & NETWORK SECURITY */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            System and Network Security
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              You must not:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Attempt to gain unauthorised access to
                the Site.
              </li>

              <li className={styles.accListItem}>
                Access restricted areas without
                permission.
              </li>

              <li className={styles.accListItem}>
                Circumvent security measures.
              </li>

              <li className={styles.accListItem}>
                Probe, scan or test vulnerabilities.
              </li>

              <li className={styles.accListItem}>
                Interfere with network infrastructure.
              </li>

              <li className={styles.accListItem}>
                Attempt denial-of-service attacks.
              </li>

              <li className={styles.accListItem}>
                Attempt distributed denial-of-service
                attacks (DDoS).
              </li>

              <li className={styles.accListItem}>
                Intercept data transmissions.
              </li>

              <li className={styles.accListItem}>
                Modify or tamper with Site
                functionality.
              </li>
            </ul>

            <p className={styles.accParagraph}>
              You must not use automated tools,
              scraping technologies, bots or scripts
              in a way that places unreasonable demand
              on our systems.
            </p>
          </div>
        </div>
      </section>

      {/* USER CONTENT */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            User Content
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Where users are permitted to submit
              content, reviews, comments, feedback or
              other material, you must ensure such
              content:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Is accurate.
              </li>

              <li className={styles.accListItem}>
                Is lawful.
              </li>

              <li className={styles.accListItem}>
                Is not defamatory.
              </li>

              <li className={styles.accListItem}>
                Is not misleading.
              </li>

              <li className={styles.accListItem}>
                Does not infringe intellectual property
                rights.
              </li>

              <li className={styles.accListItem}>
                Does not infringe privacy rights.
              </li>

              <li className={styles.accListItem}>
                Is not obscene, offensive or
                discriminatory.
              </li>

              <li className={styles.accListItem}>
                Does not promote illegal activity.
              </li>
            </ul>

            <p className={styles.accParagraph}>
              You remain solely responsible for any
              content submitted by you.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT STANDARDS */}
      <section
        className={styles.accordionSection}
        id="content_standards"
      >
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Content Standards
          </h2>

          <div className={styles.accBody}>
            <h6 className={styles.accSubHeading}>
              Defamatory Content
            </h6>

            <p className={styles.accParagraph}>
              Content must not contain statements that
              could damage the reputation of
              individuals, businesses or organisations.
            </p>

            <h6 className={styles.accSubHeading}>
              Offensive Content
            </h6>

            <p className={styles.accParagraph}>
              Content must not contain:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Hate speech
              </li>

              <li className={styles.accListItem}>
                Racist content
              </li>

              <li className={styles.accListItem}>
                Sexist content
              </li>

              <li className={styles.accListItem}>
                Harassing content
              </li>

              <li className={styles.accListItem}>
                Threatening language
              </li>

              <li className={styles.accListItem}>
                Abusive language
              </li>
            </ul>

            <h6 className={styles.accSubHeading}>
              Promotion of Illegal Activity
            </h6>

            <p className={styles.accParagraph}>
              Content must not encourage or facilitate:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Fraud
              </li>

              <li className={styles.accListItem}>
                Money laundering
              </li>

              <li className={styles.accListItem}>
                Cybercrime
              </li>

              <li className={styles.accListItem}>
                Intellectual property infringement
              </li>

              <li className={styles.accListItem}>
                Violence
              </li>

              <li className={styles.accListItem}>
                Criminal conduct
              </li>
            </ul>

            <h6 className={styles.accSubHeading}>
              Misleading Information
            </h6>

            <p className={styles.accParagraph}>
              Content must not:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Contain false information.
              </li>

              <li className={styles.accListItem}>
                Misrepresent facts.
              </li>

              <li className={styles.accListItem}>
                Create confusion regarding products or
                services.
              </li>

              <li className={styles.accListItem}>
                Impersonate another individual or
                organisation.
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
              All intellectual property rights in the
              Site, including text, graphics, images,
              product descriptions, logos, branding,
              software and design elements remain the
              property of MYMARTS or its licensors
              unless otherwise stated.
            </p>

            <p className={styles.accParagraph}>
              You may not copy, reproduce, modify,
              distribute or commercially exploit any
              part of the Site without prior written
              permission.
            </p>
          </div>
        </div>
      </section>
            {/* INTERACTIVE SERVICES */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Interactive Services
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              From time to time, MYMARTS may provide
              interactive features and services
              including:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Product reviews
              </li>

              <li className={styles.accListItem}>
                Product questions and answers
              </li>

              <li className={styles.accListItem}>
                Contact forms
              </li>

              <li className={styles.accListItem}>
                Customer feedback systems
              </li>

              <li className={styles.accListItem}>
                Live chat services
              </li>

              <li className={styles.accListItem}>
                User-generated content areas
              </li>
            </ul>

            <p className={styles.accParagraph}>
              Where such services are available, we
              may monitor, moderate or review content
              submitted through those services.
            </p>

            <p className={styles.accParagraph}>
              However, we are under no obligation to
              monitor all activity and cannot
              guarantee that objectionable material
              will never appear.
            </p>

            <p className={styles.accParagraph}>
              Users must comply with this Acceptable
              Use Policy when using any interactive
              service.
            </p>
          </div>
        </div>
      </section>

      {/* PROTECTION OF MINORS */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Protection of Minors
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              Where interactive services are
              available, parents and guardians are
              encouraged to supervise minors using
              the Site.
            </p>

            <p className={styles.accParagraph}>
              Children should be informed about
              online safety, responsible internet
              use and the importance of complying
              with website policies and guidelines.
            </p>

            <p className={styles.accParagraph}>
              Any content submitted by minors must
              also comply with the standards set out
              in this Acceptable Use Policy.
            </p>
          </div>
        </div>
      </section>

      {/* REPORTING VIOLATIONS */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Reporting Violations
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              If you believe content or activity on
              the Site breaches this Acceptable Use
              Policy, please contact us immediately.
            </p>

            <p className={styles.accParagraph}>
              When reporting a violation, please
              provide:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                A description of the issue
              </li>

              <li className={styles.accListItem}>
                Relevant URLs where applicable
              </li>

              <li className={styles.accListItem}>
                Screenshots or supporting evidence
              </li>

              <li className={styles.accListItem}>
                Any additional information that may
                assist our investigation
              </li>
            </ul>

            <p className={styles.accParagraph}>
              We will review reports and take
              appropriate action where necessary.
            </p>
          </div>
        </div>
      </section>

      {/* ENFORCEMENT */}
      <section
        className={styles.accordionSection}
        id="enforcement"
      >
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Suspension and Termination
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              We may determine, at our sole
              discretion, whether a breach of this
              Acceptable Use Policy has occurred.
            </p>

            <p className={styles.accParagraph}>
              If a breach occurs, we may take any
              action we consider appropriate,
              including:
            </p>

            <ul className={styles.accList}>
              <li className={styles.accListItem}>
                Issuing a warning
              </li>

              <li className={styles.accListItem}>
                Removing content
              </li>

              <li className={styles.accListItem}>
                Restricting access
              </li>

              <li className={styles.accListItem}>
                Suspending user accounts
              </li>

              <li className={styles.accListItem}>
                Terminating user accounts
              </li>

              <li className={styles.accListItem}>
                Blocking IP addresses
              </li>

              <li className={styles.accListItem}>
                Reporting unlawful activity to
                relevant authorities
              </li>

              <li className={styles.accListItem}>
                Taking legal action where necessary
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* LIABILITY */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Liability
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              MYMARTS excludes liability for actions
              taken in response to breaches of this
              Acceptable Use Policy.
            </p>

            <p className={styles.accParagraph}>
              The actions described in this policy
              are not exhaustive and we reserve the
              right to take any other action we
              reasonably consider necessary to
              protect our business, users, systems
              and reputation.
            </p>

            <p className={styles.accParagraph}>
              Nothing in this policy limits any
              rights or remedies available to
              MYMARTS under applicable law.
            </p>
          </div>
        </div>
      </section>

      {/* CHANGES TO POLICY */}
      <section className={styles.accordionSection}>
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Changes to This Policy
          </h2>

          <div className={styles.accBody}>
            <p className={styles.accParagraph}>
              We may revise this Acceptable Use
              Policy at any time by updating this
              page.
            </p>

            <p className={styles.accParagraph}>
              You are expected to review this page
              periodically to ensure that you remain
              aware of any changes.
            </p>

            <p className={styles.accParagraph}>
              Continued use of the Site following
              publication of updates constitutes
              acceptance of the revised policy.
            </p>
          </div>
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
              If you have questions regarding this
              Acceptable Use Policy or wish to
              report a breach of this policy, please
              contact MYMARTS using the contact
              details provided on our website.
            </p>

            <p className={styles.accParagraph}>
              We will make reasonable efforts to
              investigate reports and respond to
              policy-related enquiries as quickly as
              possible.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}