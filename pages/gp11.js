import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 10,
  },
});

const GeneratePDF = () => {
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>PDF Example</Text>
          <Text style={styles.paragraph}>Hello, world!</Text>
          <Text style={styles.paragraph}>This is a PDF generated from HTML using react-pdf/renderer.</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div>
      <h1>Generate PDF</h1>
      <PDFViewer width="100%" height="500px">
        <MyDocument />
      </PDFViewer>
    </div>
  );
};

export default GeneratePDF;
