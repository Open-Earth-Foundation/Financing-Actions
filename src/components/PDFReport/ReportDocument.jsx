import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { getRiskLevel, formatScore } from '../../constants/riskLevels';
import { getTranslation } from '../../utils/pdfTranslations';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.6
  },
  header: {
    marginBottom: 30,
    borderBottom: 2,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 20
  },
  title: {
    fontSize: 28,
    marginBottom: 15,
    color: '#2351DC',
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8
  },
  section: {
    marginBottom: 25,
    marginTop: 15,
    padding: 10,
    backgroundColor: '#FFFFFF'
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#111827',
    paddingBottom: 8,
    borderBottom: 1,
    borderBottomColor: '#E5E7EB'
  },
  paragraph: {
    fontSize: 11,
    marginBottom: 10,
    lineHeight: 1.6,
    color: '#374151'
  },
  table: {
    width: '100%',
    marginVertical: 15,
    border: 1,
    borderColor: '#E5E7EB'
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    minHeight: 32,
    alignItems: 'center'
  },
  tableHeader: {
    backgroundColor: '#F3F4F6',
    borderBottom: 2,
    borderBottomColor: '#D1D5DB'
  },
  tableCell: {
    flex: 1,
    padding: 8,
    fontSize: 10,
    color: '#111827'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 10,
    textAlign: 'center',
    color: '#6B7280',
    borderTop: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 15
  }
});

const ReportDocument = ({ riskData, cityname, region, qualitativeData, language = 'en' }) => {
  // Helper function to make translation calls shorter
  const t = (key) => getTranslation(key, language);

  const ExecutiveSummary = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        {t('report.executive_summary.title')}
      </Text>
      <Text style={styles.paragraph}>
        {t('report.executive_summary.overview')}
      </Text>
      <Text style={styles.paragraph}>
        {t('report.executive_summary.sections')}
        {'\n'}
        {t('report.executive_summary.section_1')}
        {'\n'}
        {t('report.executive_summary.section_2')}
        {'\n'}
        {t('report.executive_summary.section_3')}
        {'\n'}
        {t('report.executive_summary.section_4')}
        {'\n'}
        {t('report.executive_summary.section_5')}
      </Text>
    </View>
  );

  const Methodology = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        {t('report.methodology.title')}
      </Text>
      <Text style={styles.paragraph}>
        {t('report.methodology.formula')}
      </Text>
      <Text style={styles.paragraph}>
        {t('report.methodology.scoring')}
      </Text>
    </View>
  );

  const RiskAssessmentTable = ({ riskData }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        {t('report.tables.title')}
      </Text>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>{t('report.tables.headers.sector')}</Text>
          <Text style={styles.tableCell}>{t('report.tables.headers.hazard')}</Text>
          <Text style={styles.tableCell}>{t('report.tables.headers.risk_score')}</Text>
          <Text style={styles.tableCell}>{t('report.tables.headers.exposure_score')}</Text>
          <Text style={styles.tableCell}>{t('report.tables.headers.vulnerability_score')}</Text>
        </View>
        {riskData.map((risk, i) => (
          <View key={i} style={styles.tableRow}>
            <Text style={styles.tableCell}>{risk.keyimpact}</Text>
            <Text style={styles.tableCell}>{risk.hazard}</Text>
            <Text style={styles.tableCell}>{formatScore(risk.risk_score)}</Text>
            <Text style={styles.tableCell}>{formatScore(risk.exposure_score)}</Text>
            <Text style={styles.tableCell}>{formatScore(risk.vulnerability_score)}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const NextSteps = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        {t('report.next_steps.title')}
      </Text>
      {[1, 2, 3, 4, 5, 6].map((num) => (
        <Text key={num} style={styles.paragraph}>
          {t(`report.next_steps.steps.${num}`)}
        </Text>
      ))}
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {t('report.title')}
          </Text>
          <Text>{cityname}, {region}</Text>
          <Text>
            {t('report.generated')}: {new Date().toLocaleDateString(language)}
          </Text>
        </View>

        <ExecutiveSummary />
        <Methodology />
        <RiskAssessmentTable riskData={riskData} />
        <NextSteps />

        <Text style={styles.footer}>
          {t('report.footer')} - {cityname}
        </Text>
      </Page>
    </Document>
  );
};

export default ReportDocument;