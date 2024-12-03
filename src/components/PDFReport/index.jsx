import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { getRiskLevel, formatScore } from '../../constants/riskLevels';

import { CCRA_TOOLTIPS, SECTION_TOOLTIPS } from '../../constants/sectionContent';

Font.register({
  family: 'Poppins',
  src: '/src/fonts/Poppins-Regular.ttf',
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Poppins',
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#2351DC',
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: '#6B7280',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#111827',
  },
  table: {
    width: '100%',
    marginBottom: 20,
    border: '1px solid #E5E7EB',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 8,
  },
  tableCell: {
    flex: 1,
    padding: 8,
    fontSize: 10,
    borderRightWidth: 1,
    borderColor: '#E5E7EB',
  },
  tableHeader: {
    backgroundColor: '#F3F4F6',
    fontWeight: 'bold',
  },
  riskIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 10,
  },
});

const ExplanationBox = ({ title, content }) => (
  <View style={styles.explanationBox}>
    <Text style={styles.explanationTitle}>{title}</Text>
    <Text style={styles.explanationText}>{content}</Text>
  </View>
);

const RiskTable = ({ riskData }) => (
  <View style={styles.table}>
    {/* Table Header */}
    <View style={[styles.tableRow, styles.tableHeader]}>
      <Text style={styles.tableCell}>Sector</Text>
      <Text style={styles.tableCell}>Hazard</Text>
      <Text style={styles.tableCell}>Risk Score</Text>
      <Text style={styles.tableCell}>Risk Level</Text>
    </View>
    {/* Table Rows */}
    {riskData.map((item, index) => (
      <View style={styles.tableRow} key={index}>
        <Text style={styles.tableCell}>{item.keyimpact}</Text>
        <Text style={styles.tableCell}>{item.hazard}</Text>
        <Text style={styles.tableCell}>{formatScore(item.risk_score)}</Text>
        <Text style={styles.tableCell}>{getRiskLevel(item.risk_score).label}</Text>
      </View>
    ))}
  </View>
);

export const createReportDocument = ({ riskData, cityname, region, projectionData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Climate Change Risk Assessment Report</Text>
          <Text style={styles.subtitle}>{cityname}, {region}</Text>
          <Text style={styles.date}>Generated on: {new Date().toLocaleDateString()}</Text>
        </View>
        {/* Insert other sections as needed */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Risk Distribution by Sector</Text>
          <RiskTable 
            riskData={riskData}
          />
        </View>

        <Text style={styles.footer}>Page 1</Text>
      </Page>
    </Document>
  );
};

export default createReportDocument;