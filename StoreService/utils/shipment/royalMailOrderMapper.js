function mapOrderToRoyalMail(order) {
  const totalWeight = order.products.reduce(
    (sum, p) => sum + (500 * p.quantity),
    0
  );

  return {
    items: [
      {
        orderReference: `ORDER-${order.orderNumber}`,
        isRecipientABusiness: false,

        recipient: {
          address: {
            fullName: order.userName || order.user?.name || "Customer",
            companyName: "",
            addressLine1: order.shippingStreet,
            addressLine2: "",
            addressLine3: "",
            city: order.shippingCity,
            county: order.shippingState,
            postcode: order.shippingZip,
            countryCode: order.shippingCountry
          },
          phoneNumber: order.mobileNumber || order.user?.phone || "",
          emailAddress: order.email || order.user?.email,
          addressBookReference: `ORDER-${order.orderNumber}`
        },

        // sender: {
        //   tradingName: "MyKart Ltd",
        //   phoneNumber: "01234567890",
        //   emailAddress: "support@mykart.com"
        // },

        billing: {
          address: {
            fullName: order.userName || order.user?.name || "Customer",
            companyName: "",
            addressLine1: order.billingStreet,
            addressLine2: "",
            addressLine3: "",
            city: order.billingCity,
            county: order.billingState,
            postcode: order.billingZip,
            countryCode: order.billingCountry
          },
          phoneNumber: order.mobileNumber || order.user?.phone || "",
          emailAddress: order.email || order.user.email
        },

        packages: [
          {
            weightInGrams: totalWeight,
            packageFormatIdentifier: "parcel",
            // dimensions: {
            //   heightInMms: 100,
            //   widthInMms: 200,
            //   depthInMms: 300
            // },
            contents: order.products.map(p => ({
              name: p.name,
              SKU: p.productId,
              quantity: p.quantity,
              unitValue: Number(p.price),
              unitWeightInGrams: Number(p.weightInGrams),
              // customsDescription: (p.name).substring(0, 50),
              // extendedCustomsDescription: (p.name).substring(0, 50),
              // customsCode: "000000",
              originCountryCode: order.shippingCountry,
              customsDeclarationCategory: "none",
              requiresExportLicence: false,
              useOriginPreference: false
            }))
          }
        ],

        orderDate: new Date(order.orderDate).toISOString(),
        // plannedDespatchDate: new Date().toISOString(),
        // allowFutureDatedOrders: true,
        
        subtotal: Number(order.actualAmount) - Number(order.ShippingAmount),
        shippingCostCharged: Number(order.ShippingAmount),
        otherCosts: Number(order.chargesAmount),
        // customsDutyCosts: 0,
        total: Number(order.actualAmount),
        currencyCode: "GBP",

        postageDetails: {
          sendNotificationsTo: "recipient",
          serviceCode: order.deliveryCode,
          receiveEmailNotification: true,
          receiveSmsNotification: true,
          requestSignatureUponDelivery: true
        },

        label: {
          includeLabelInResponse: false,
          includeCN: false,
          includeReturnsLabel: false
        },

        orderTax: Number(order.chargesAmount),
        containsDangerousGoods: false
      }
    ]
  };
}

module.exports = { mapOrderToRoyalMail };
