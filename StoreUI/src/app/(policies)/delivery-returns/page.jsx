// app/delivery-returns/page.jsx

import styles from "./page.module.scss";

export default function DeliveryReturnsPage() {
  return (
    <div className={styles.page}>
      {/* HERO */}
      <div className={styles.pageHero}>
        <h1 className={styles.heroTitle}>Delivery &amp; Returns</h1>

        <div className={styles.heroSubtitle}>
          Delivery is FREE on orders over £60
        </div>

        <div className={styles.heroSub2}>
          Orders under £60 incur a delivery charge
        </div>

        <small className={styles.heroSmall}>
          *GB mainland only and other exclusions apply. Please see below for
          full details.
        </small>
      </div>

      {/* QUICK LINKS */}
      <nav className={styles.quickLinks}>
        <a
          href="#out_of_area_postcodes"
          className={styles.quickLink}
        >
          Out of Area Costs
        </a>

        <a
          href="#returns_accordion"
          className={styles.quickLink}
        >
          Returns
        </a>

        <a
          href="#delivery_faqs"
          className={styles.quickLink}
        >
          Delivery FAQs
        </a>
      </nav>

      {/* GOOD TO KNOW */}
      <section className={styles.goodToKnow}>
        <div className={styles.container}>
          <h2
            className={`${styles.sectionHeading} ${styles.noPaddingTop}`}
          >
            Good To Know
          </h2>

          <div className={styles.cardsGrid}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Delivery Costs</h3>

              <p className={styles.cardText}>
                Delivery costs may vary depending on what you are ordering and
                your location in the country. For hard to reach locations,
                please see the below &apos;out of areas&apos; costs. For an accurate
                cost, please add the items to your basket and view the cost in
                the checkout.
              </p>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Delivery Timeframes</h3>

              <p className={styles.cardText}>
                All delivery times refer to working days (Monday to Friday),
                we don&apos;t deliver on a weekend. Bank holidays are treated as
                weekends and nothing will be dispatched or delivered on a bank
                holiday.
              </p>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Business Customers</h3>

              <p className={styles.cardText}>
                If you are ordering for the NHS, schools or a business and you
                need your order urgently, please call us and we will do
                everything we can to help you.
              </p>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Packaging</h3>

              <p className={styles.cardText}>
                In order for your items to get to you safely and undamaged, we
                need to use certain packaging. View our guide on how you can
                help in the life-cycle of the packaging we use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* POSTCODE TABLE */}
      <section
        className={styles.postcodeSection}
        id="out_of_area_postcodes"
      >
        <div className={styles.container}>
          <h2 className={styles.postcodeHeading}>
            Out of Area Postcodes
          </h2>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr className={styles.tableRow}>
                  <th className={styles.tableHeadCell}>
                    Country / Region
                  </th>

                  <th className={styles.tableHeadCell}>
                    Applicable Postcodes
                  </th>

                  <th className={styles.tableHeadCell}>
                    Delivery Options*
                  </th>
                </tr>
              </thead>

              <tbody className={styles.tableBody}>
                <tr className={styles.tableBodyRow}>
                  <td className={styles.tableCellFirst}>
                    Mainland England
                    <br />
                    Wales
                    <br />
                    Southern Scotland
                  </td>

                  <td className={styles.tableCell}>
                    AB10-16, AB21-25, AB30-35, AB39, AB41-AB45, AL1-AL10, B,
                    BA, BB, BD, BH, BL, BN, BR, BS, CA, CB, CF, CH, CM, CO,
                    CR, CT, CV, CW, DA, DD, DE, DG, DH, DL, DN, DT, DY, E,
                    EC, EH, EN, EX, FK1-16, FY, G, GL, GU, HA, HD, HG, HP,
                    HR, HU, HX, IG, IP, KA1-9, KA11-12, KA16-26, KA29-30, KY,
                    KT, L, LA, LD, LE, LL, LN, LS, LU, M, ME, MK, ML, N, NE,
                    NN, NG, NP, NR, NW, OL, OX, PA1-19, PE, PH1-14, PL,
                    PO1-22, PR, RG, RH, RM, S, SA, SE, SG, SK, SL, SM, SN,
                    SO, SP, SR, SS, ST, SW1, SW, SY, TA, TD, TF, TN, TQ, TR,
                    TS, TW, UB, W, WA, WC, WD, WF, WN, WR, WS, WV, YO,
                  </td>

                  <td className={styles.tableCellLast}>
                    <strong>Free Standard Delivery</strong> approx. 1–2 days
                    spend over £60
                    <br />

                    <strong>Economy (Tracked) 2–3 Days</strong> (small parcels
                    only) – £4.74
                    <br />

                    <strong>Standard Delivery</strong> approx. 1–2 Days
                    (Tracked) – £6.30
                    <br />

                    <strong>Next Working Day</strong> – £8.99 (last orders:
                    1:30pm)
                  </td>
                </tr>

                <tr className={styles.tableBodyRowEven}>
                  <td className={styles.tableCellFirst}>
                    Scottish Highlands
                    <br />
                    GB Islands
                    <br />
                    Northern Ireland*
                    <span className={styles.noteItalic}>
                      * Customs charges may apply for deliveries to Northern
                      Ireland. The customer is responsible for payment of these
                      charges.
                    </span>
                  </td>

                  <td className={styles.tableCell}>
                    AB1-9, AB36-38, AB40, AB55-56, AB99, FK17-21, HS1-9, IV,
                    KA27-28, KW, PA20-49, PA60-98, PH15-26, PH30-44, PH49-50,
                    ZE, IM, BT, PO30-41
                  </td>

                  <td className={styles.tableCellLast}>
                    <strong>1–4 Days (Tracked)</strong> – £12 to £36
                    <br />

                    <strong>2–4 Days (Tracked)</strong> – £4.74 (smaller items
                    and parcels)
                  </td>
                </tr>

                <tr className={styles.tableBodyRow}>
                  <td className={styles.tableCellFirst}>
                    Guernsey
                    <br />
                    Jersey
                  </td>

                  <td className={styles.tableCell}>GY, JE</td>

                  <td className={styles.tableCellLast}>
                    <strong>1–4 Days (Tracked)</strong> – £12 to £36
                    <br />

                    <strong>2–4 Days (Tracked)</strong> – £4.74 (smaller items
                    and parcels)
                  </td>
                </tr>

                <tr className={styles.tableBodyRowEven}>
                  <td className={styles.tableCellFirst}>
                    Ireland

                    <span className={styles.noteItalic}>
                      Customs charges may apply. The customer is responsible
                      for payment of these charges.
                    </span>
                  </td>

                  <td className={styles.tableCell}>All postcodes</td>

                  <td className={styles.tableCellLast}>
                    <strong>1–4 Days (Tracked)</strong> – £10–£75
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section
        className={styles.accordionSection}
        id="delivery_faqs"
      >
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Further Delivery Information
          </h2>

          <details className={styles.details} open>
            <summary className={styles.summary}>
              How long will delivery take?
            </summary>

            <div className={styles.accBody}>
              <p className={styles.accParagraph}>
                We always aim to dispatch your goods either the same day you ordered
                or the following working day. In most cases we use 24 hour couriers,
                so your boxes should be with you within 1–2 working days.
              </p>

              <p className={styles.accParagraph}>
                If your items are being delivered to anywhere other than England,
                Wales and Southern Scotland then it can take longer for these to get
                there. Please note we only make deliveries during the working week
                and no deliveries or dispatching is done on bank holidays.
              </p>

              <p className={styles.accParagraph}>
                <strong>Please note:</strong> all delivery times are estimates. While
                we work hard to get your order to you as quickly as possible,
                occasional delays can occur due to factors within the delivery
                network. We appreciate your patience and understanding.
              </p>
            </div>
          </details>

          <details className={styles.details}>
            <summary className={styles.summary}>
              I need my order urgently!
            </summary>

            <div className={styles.accBody}>
              <p className={styles.accParagraph}>
                If you call us, we should be able to accommodate any urgent requests.
                Most of our boxes do get dispatched the same day or the following
                day, but it&apos;s best to get in touch to avoid disappointment.
              </p>

              <p className={styles.accParagraph}>
                Although we will do everything we can to dispatch on time, we accept
                no liability for it arriving on time, as per our{" "}
                <strong>Terms &amp; Conditions</strong>.
              </p>
            </div>
          </details>

          <details className={styles.details}>
            <summary className={styles.summary}>
              How do I know when my order will arrive?
            </summary>

            <div className={styles.accBody}>
              <p className={styles.accParagraph}>
                DPD is our preferred courier for standard sized deliveries. They
                offer an excellent service and will provide via email and SMS all
                relevant tracking information, alongside a 1 hours delivery slot.
              </p>
            </div>
          </details>

          <details className={styles.details}>
            <summary className={styles.summary}>
              Can you deliver on a Saturday?
            </summary>

            <div className={styles.accBody}>
              <p className={styles.accParagraph}>
                We can arrange a Saturday delivery by special request. We recommend
                calling us to arrange the delivery upgrade.
              </p>

              <p className={styles.accParagraph}>
                The fee for this is an additional £15 for the first parcel and £5
                for each subsequent parcel.
              </p>

              <p className={styles.accParagraph}>
                Please note that the cut-off time for Saturday deliveries is 12pm
                Friday.
              </p>
            </div>
          </details>

          <details className={styles.details}>
            <summary className={styles.summary}>
              Can I change my delivery address?
            </summary>

            <div className={styles.accBody}>
              <p className={styles.accParagraph}>
                Delivery addresses can be changed prior to delivery. However, if
                parcels have already been dispatched, there may be an additional
                charge to change this, if it means re-routing the parcels.
              </p>

              <p className={styles.accParagraph}>
                We would advise you of any additional fees before re-routing the
                parcels.
              </p>
            </div>
          </details>

          <details className={styles.details}>
            <summary className={styles.summary}>
              Can I request that my parcel be left somewhere safe if I am not in?
            </summary>

            <div className={styles.accBody}>
              <p className={styles.accParagraph}>
                For DPD deliveries, we recommend downloading the DPD app. You can
                use the app to control the delivery, including redirecting it to a
                neighbour or a safe place.
              </p>

              <p className={styles.accParagraph}>
                If you don&apos;t want to use the app, DPD offer a similar functionality
                via their website, but please note that their website has slightly
                less functionality than their app.
              </p>
            </div>
          </details>

          <details className={styles.details}>
            <summary className={styles.summary}>
              Can the driver carry my order in for me?
            </summary>

            <div className={styles.accBody}>
              <p className={styles.accParagraph}>
                We can only deliver to the front door of the building specified.
                Delivery drivers are not insured for entering premises, so are unable
                to carry your order into your house or anywhere else on the premises.
              </p>

              <p className={styles.accParagraph}>
                If there are any lifts or stairs, then it is at the discretion of
                the delivery driver whether they are able to take the boxes any
                further.
              </p>
            </div>
          </details>

          <details className={styles.details}>
            <summary className={styles.summary}>
              I&apos;ve placed a large order. How will it be delivered (pallet
              deliveries)?
            </summary>

            <div className={styles.accBody}>
              <p className={styles.accParagraph}>
                For larger orders, you will need to be able to accept a pallet. If
                you are unable to do so, or have concerns or questions about
                receiving a pallet order, please get in touch with us before placing
                your order.
              </p>

              <p className={styles.accParagraph}>
                Please be aware that you must be available at the time of delivery to
                accept the order, as they cannot be left in a safe location.
              </p>

              <p className={styles.accParagraph}>
                For pallet deliveries to private residential addresses, we will ring
                you to make the arrangements.
              </p>

              <p className={styles.accParagraph}>
                You may be required to help the driver with pallet deliveries. The
                driver will not assist in unloading the pallet, nor are they obliged
                to take it to any other location on your premises.
              </p>

              <p className={styles.accParagraph}>
                The delivery drivers will not take the pallet itself away with them –
                it&apos;s at the complete discretion of the individual driver if they
                choose to do so. If this is an issue, please notify us at the time
                of ordering.
              </p>
            </div>
          </details>

          <details className={styles.details}>
            <summary className={styles.summary}>
              Can you deliver to a PO address?
            </summary>

            <div className={styles.accBody}>
              <p className={styles.accParagraph}>
                No, we cannot deliver to a PO address.
              </p>
            </div>
          </details>
        </div>
      </section>
      <section
        className={styles.accordionSection}
        id="returns_accordion"
      >
        <div className={styles.container}>
          <h2 className={styles.accordionHeading}>
            Returns Information
          </h2>

          <details className={styles.details}>
            <summary className={styles.summary}>
              I have damaged / missing / faulty items, what do I do?
            </summary>

            <div className={styles.accBody}>
              <p className={styles.accParagraph}>
                <strong>For Missing Items</strong> – make sure you&apos;ve checked all of
                the packaging and opened all boxes. If you are missing an item,
                please contact us. You may be asked to provide evidence such as
                photos.
              </p>

              <p className={styles.accParagraph}>
                <strong>For Damaged Items</strong> – if the package is obviously
                damaged, then please sign for the parcel as damaged. Please take
                photos of the box before opening it. Once opened, please also take
                photos of any damages. You then have 30 days to get in touch with us.
                Please keep any damaged items as we may need them returning back to
                us (depending on the situation).
              </p>
            </div>
          </details>

          <details className={styles.details}>
            <summary className={styles.summary}>
              Can I change my mind after placing my order?
            </summary>

            <div className={styles.accBody}>
              <p className={styles.accParagraph}>
                You have 14 days from the day after you receive your goods to notify
                us of a change of mind. You then have 14 days in which to either
                send the goods back to us, or for us to collect and return back to
                our warehouse. We then have 14 days in which to refund you.
              </p>

              <p className={styles.accParagraph}>
                Please refer to our <strong>Terms &amp; Conditions</strong> for more
                information.
              </p>
            </div>
          </details>

          <details className={styles.details}>
            <summary className={styles.summary}>
              What&apos;s the returns process?
            </summary>

            <div className={styles.accBody}>
              <ul className={styles.accList}>
                <li className={styles.accListItem}>
                  Complete the returns form here:{" "}
                  <strong>Returns Form</strong>
                </li>

                <li className={styles.accListItem}>
                  If you are sending the goods back via your own means – we will
                  email you with a copy of your order – simply print and tick which
                  items are coming back and include this in with the parcel.
                </li>

                <li className={styles.accListItem}>
                  Return the items in their original condition, including packaging
                  (if possible) and obtain proof of return from the carrier, if
                  returning them yourself. If you do not have the original packaging,
                  you will have to take precautions to protect the items during
                  transit. We reserve the right to charge a restocking fee if any
                  item(s) is damaged due to it not being packaged properly. See our
                  Terms &amp; Conditions for more details.
                </li>

                <li className={styles.accListItem}>
                  We will then either arrange the collection or wait for your items
                  to be returned to our warehouse.
                </li>

                <li className={styles.accListItem}>
                  Refunds will be processed within 14 days of receiving the item back
                  at our warehouse.
                </li>
              </ul>
            </div>
          </details>

          <details className={styles.details}>
            <summary className={styles.summary}>
              How much does it cost to return all or part of my order?
            </summary>

            <div className={styles.accBody}>
              <p className={styles.accParagraph}>
                Customers are welcome to send their items back to our warehouse via
                their own means. Our warehouse address for returns is:
              </p>

              <div className={styles.addressBlock}>
                UNIT 48
                <br />
                PHOENIX DISTRIBUTION PARK
                <br />
                HESTON
                <br />
                LONDON
                <br />
                TW5 9NB
              </div>

              <p className={styles.accParagraph}>
                Alternatively we can arrange a collection via our own courier.
              </p>

              <hr className={styles.divider} />

              <h6 className={styles.accSubHeading}>Via Parcel</h6>

              <p className={styles.accParagraph}>
                To Mainland England, Southern Scotland and Wales. This is charged at
                £6 for the first parcel and £4 for each subsequent parcel. For
                example, if your order was received in two parcels, then this would
                cost £10. All other areas – £12 per outer parcel.
              </p>

              <h6 className={styles.accSubHeading}>Via Pallet</h6>

              <p className={styles.accParagraph}>
                Pallet collections are charged at £60 per pallet. Please keep the
                pallet if you are not sure you will be keeping the items, as we would
                not be able to supply you with a pallet and packaging for the return
                journey.
              </p>
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}