import React from "react";
import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import Theme from "../../../types";

import RubikRegular from "../../../fonts/Rubik-Regular.ttf";
import RubikMedium from "../../../fonts/Rubik-Medium.ttf";

Font.register({
  family: "Rubik",
  fonts: [
    {
      src: RubikRegular,
      fontWeight: 400,
    },
    {
      src: RubikMedium,
      fontWeight: 500,
    },
  ],
});
export interface Colors {
  bg: string;
  textOne: string;
  textTwo: string;
}

const getStyles = (colors: Colors) =>
  StyleSheet.create({
    page: {
      flexDirection: "column",
      fontFamily: "Rubik",
      padding: "40px 60px",
      color: colors.textOne,
    },
    header: {
      width: "100%",
      color: colors.textOne,
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
    },
    sectionTitle: {
      fontWeight: "bold",
      textTransform: "uppercase",
      fontSize: 14,
      marginBottom: 4,
    },
    invoiceNumber: {
      fontSize: 24,
      fontWeight: "bold",
      textTransform: "uppercase",
      marginBottom: 8,
    },
    dates: {
      fontSize: 12,
      flexDirection: "row",
    },
    datesInner: {
      marginVertical: 2,
      flexDirection: "column",
      justifyContent: "flex-end",
    },
    dateTitle: {
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    logo: {
      maxWidth: 120,
      maxHeight: 120,
    },
    personalData: {
      backgroundColor: colors.bg,
      width: "100vw",
      position: "relative",
      left: -60,
      padding: "8px 60px 10px",
      marginTop: 80,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    section: {
      flexBasis: 220,
      fontSize: 12,
      lineHeight: 1.7,
    },
    concepts: {
      marginTop: 40,
      color: colors.textOne,
    },
    conceptsHeader: {
      height: 36,
      color: colors.textOne,
      fontSize: 14,
      fontWeight: "bold",
      textTransform: "uppercase",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: 2,
      borderColor: colors.textOne,
    },
    conceptsBody: {
      fontSize: 12,
    },
    conceptsItems: {
      paddingVertical: 4,
    },
    conceptsItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      paddingVertical: 8,
    },
    concept: {
      flexBasis: 235,
    },
    quantity: {
      textAlign: "right",
      flexBasis: 80,
    },
    price: {
      textAlign: "right",
      flexBasis: 70,
    },
    total: {
      textAlign: "right",
      flexBasis: 80,
    },
    conceptsTotal: {
      paddingVertical: 8,
      borderTop: 2,
      borderColor: colors.textOne,
    },
    conceptsTotalItem: {
      flexDirection: "row",
      paddingVertical: 4,
      justifyContent: "flex-end",
    },
    conceptsTotalTitle: {
      fontWeight: "bold",
    },
    conceptsTotalNumber: {
      flexBasis: 90,
      textAlign: "right",
    },
    containerPayment: {
      marginTop: 40,
    },
    paymentHeader: {
      flexDirection: "row",
      fontSize: 14,
      marginBottom: 8,
    },
    paymentMethodLabel: {
      fontWeight: "bold",
      marginRight: 8,
    },
    paymentBody: {
      flexWrap: "wrap",
      fontSize: 12,
      lineHeight: 1.7,
      flexDirection: "row",
    },
    paymentItem: {
      flexDirection: "row",
      marginRight: 16,
    },
    paymentItemLabel: {
      fontWeight: "bold",
      marginRight: 8,
    },
    notes: {
      marginTop: "auto",
    },
    notesText: {
      marginTop: 6,
      maxHeight: 70,
      fontSize: 12,
      lineHeight: 1.7,
    },
  });

const toMoney = (number: string) =>
  number
    ? parseFloat(number)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
    : "";

const Invoice: React.FC<{
  invoice: Theme["state"]["invoice"];
  colors?: Colors;
}> = ({ invoice, colors }) => {
  colors = colors || {
    bg: "#000000",
    textOne: "#000000",
    textTwo: "#ffffff",
  };

  const styles = getStyles(colors);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.invoiceNumber}>Factura #{invoice.number}</Text>
            <View style={styles.dates}>
              <View
                style={[
                  styles.datesInner,
                  { marginRight: 20, justifyContent: "flex-start" },
                ]}
              >
                <Text style={styles.dateTitle}>Emitida</Text>
                <Text>{invoice.dates.issued}</Text>
              </View>
              <View style={styles.datesInner}>
                <Text style={styles.dateTitle}>Vence</Text>
                <Text>{invoice.dates.expires}</Text>
              </View>
            </View>
          </View>
          {!!invoice.logo.url && (
            <Image src={invoice.logo.url} style={styles.logo} />
          )}
        </View>
        {(invoice.hasProvider || invoice.hasClient) && (
          <View style={styles.personalData}>
            {["provider", "client"].map((prefix) => (
              <View key={prefix} style={styles.section}>
                <Text
                  style={[
                    styles.sectionTitle,
                    { color: colors.textOne, marginTop: -36 },
                  ]}
                >
                  {prefix === "provider" ? "Proveedor" : "Cliente"}
                </Text>
                <View style={{ color: colors.textTwo, marginTop: 16 }}>
                  <Text>{invoice[prefix].name}</Text>
                  <Text>{invoice[prefix].identifier}</Text>
                  <Text>{invoice[prefix].address}</Text>
                  <Text>
                    {invoice[prefix].pc}
                    {!!invoice[prefix].pc && !!invoice[prefix].city ? ", " : ""}
                    {invoice[prefix].city}
                  </Text>
                  <Text>{invoice[prefix].country}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
        {invoice.hasConcept && (
          <View style={styles.concepts}>
            <View style={styles.conceptsHeader}>
              <Text style={styles.concept}>Concepto</Text>
              <Text style={styles.quantity}>Cantidad</Text>
              <Text style={styles.price}>Precio</Text>
              <Text style={styles.total}>Total</Text>
            </View>
            <View style={styles.conceptsBody}>
              <View style={styles.conceptsItems}>
                {invoice.concepts.items.map((item, key) => (
                  <View key={key} style={styles.conceptsItem}>
                    <Text style={styles.concept}>{item.concept}</Text>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <Text style={styles.price}>
                      {!!item.price && toMoney(item.price as any) + "€"}
                    </Text>
                    <Text style={styles.total}>
                      {toMoney(invoice.concepts.itemTotal(key as any) as any)}€
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.conceptsTotal}>
                <View style={styles.conceptsTotalItem}>
                  <Text style={styles.conceptsTotalTitle}>Base imponible</Text>
                  <Text style={styles.conceptsTotalNumber}>
                    {toMoney(invoice.concepts.taxable as any)}€
                  </Text>
                </View>
                {invoice.concepts.hasIva && (
                  <View style={styles.conceptsTotalItem}>
                    <Text style={styles.conceptsTotalTitle}>
                      IVA ({invoice.concepts.iva}%)
                    </Text>
                    <Text style={styles.conceptsTotalNumber}>
                      {toMoney(invoice.concepts.totalIva as any)}€
                    </Text>
                  </View>
                )}
                {invoice.concepts.hasIrpf && (
                  <View style={styles.conceptsTotalItem}>
                    <Text style={styles.conceptsTotalTitle}>
                      IRPF ({invoice.concepts.irpf}%)
                    </Text>
                    <Text style={styles.conceptsTotalNumber}>
                      {toMoney(invoice.concepts.totalIrpf as any)}€
                    </Text>
                  </View>
                )}
                <View style={styles.conceptsTotalItem}>
                  <Text style={styles.conceptsTotalTitle}>Total</Text>
                  <Text style={styles.conceptsTotalNumber}>
                    {toMoney(invoice.concepts.total as any)}€
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
        {!!invoice.notes && (
          <View style={styles.notes}>
            <Text style={styles.sectionTitle}>Notas</Text>
            <Text style={styles.notesText}>{invoice.notes}</Text>
          </View>
        )}
        {invoice.payment.selected !== "none" && (
          <View
            style={[
              styles.section,
              { marginTop: !invoice.notes ? "auto" : 30 },
            ]}
          >
            <Text style={styles.sectionTitle}>Forma de pago</Text>
            <View style={styles.paymentBody}>
              {invoice.payment.selected === "transfer" && (
                <>
                  {!!invoice.payment.transfer.bank && (
                    <View style={styles.paymentItem}>
                      <Text>{invoice.payment.transfer.bank}</Text>
                    </View>
                  )}
                  <View style={{ flexDirection: "row" }}>
                    {!!invoice.payment.transfer.iban && (
                      <View style={styles.paymentItem}>
                        <Text style={styles.paymentItemLabel}>IBAN</Text>
                        <Text>{invoice.payment.transfer.iban}</Text>
                      </View>
                    )}
                    {!!invoice.payment.transfer.swift && (
                      <View style={styles.paymentItem}>
                        <Text style={styles.paymentItemLabel}>SWIFT/BIC</Text>
                        <Text>{invoice.payment.transfer.swift}</Text>
                      </View>
                    )}
                  </View>
                </>
              )}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default Invoice;
