import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font
} from '@react-pdf/renderer';
import { getRiskLevel, formatScore } from '../../constants/riskLevels';

Font.register({
  family: 'Inter',
  src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ.woff2'
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Inter'
  },
  header: {
    marginBottom: 30
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#2351DC'
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 5
  },
  date: {
    fontSize: 12,
    color: '#6B7280'
  },
  section: {
    marginBottom: 30
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 15,
    color: '#111827'
  },
  table: {
    width: '100%',
    marginBottom: 20
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 8
  },
  tableHeader: {
    backgroundColor: '#F3F4F6'
  },
  tableCell: {
    flex: 1,
    padding: 8,
    fontSize: 10
  },
  riskIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4
  },
  chart: {
    marginTop: 15,
    marginBottom: 30
  },
  barChart: {
    height: 200,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 20
  },
  bar: {
    width: 30,
    marginRight: 5,
    backgroundColor: '#2351DC'
  },
  barLabel: {
    fontSize: 8,
    marginTop: 5,
    textAlign: 'center',
    maxWidth: 30
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 10
  }
});

const RiskChart = ({ data }) => (
  <View style={styles.chart}>
    <View style={styles.barChart}>
      {data.map((item, index) => (
        <View key={index}>
          <View
            style={[
              styles.bar,
              { height: Math.max(20, item.value * 180) }
            ]}
          />
          <Text style={styles.barLabel}>{item.sector}</Text>
        </View>
      ))}
    </View>
  </View>
);

const ReportDocument = ({ riskData, cityname, region, projectionData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Climate Change Risk Assessment Report</Text>
        <Text style={styles.subtitle}>{cityname}, {region}</Text>
        <Text style={styles.date}>Generated on: {new Date().toLocaleDateString()}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Risk Summary</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Hazard</Text>
            <Text style={styles.tableCell}>Sector</Text>
            <Text style={styles.tableCell}>Risk Score</Text>
            <Text style={styles.tableCell}>Risk Level</Text>
          </View>
          {riskData.slice(0, 5).map((risk, index) => {
            const riskLevel = getRiskLevel(risk.risk_score);
            return (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{risk.hazard}</Text>
                <Text style={styles.tableCell}>{risk.keyimpact}</Text>
                <Text style={styles.tableCell}>{formatScore(risk.risk_score)}</Text>
                <View style={[styles.tableCell, { flexDirection: 'row', alignItems: 'center' }]}>
                  <View style={[styles.riskIndicator, { backgroundColor: riskLevel.color }]} />
                  <Text>{riskLevel.label}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {projectionData && Object.keys(projectionData).length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Climate Projections</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCell}>Hazard</Text>
              <Text style={styles.tableCell}>Current</Text>
              <Text style={styles.tableCell}>2030 (RCP 4.5)</Text>
              <Text style={styles.tableCell}>2050 (RCP 4.5)</Text>
            </View>
            {Object.entries(projectionData).map(([hazard, data], index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{hazard}</Text>
                <Text style={styles.tableCell}>{formatScore(data.current)}</Text>
                <Text style={styles.tableCell}>{formatScore(data['2030_optimistic'])}</Text>
                <Text style={styles.tableCell}>{formatScore(data['2050_optimistic'])}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Risk Distribution by Sector</Text>
        <RiskChart 
          data={riskData.reduce((acc, item) => {
            const sector = item.keyimpact;
            const existing = acc.find(x => x.sector === sector);
            if (existing) {
              existing.value += item.risk_score;
            } else {
              acc.push({ sector, value: item.risk_score });
            }
            return acc;
          }, [])}
        />
      </View>

      <Text style={styles.footer}>
        CityCatalyst CCRA | {cityname} Risk Assessment Report
      </Text>
    </Page>
  </Document>
);

export default ReportDocument;