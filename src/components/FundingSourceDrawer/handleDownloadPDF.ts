import { FundingSource } from "./fundingSources";

export async function handleDownloadPDF(
  fundingSource: FundingSource,
  t: (key: string) => string
) {
  const { institutionId, sourceKey } = fundingSource;
  const get = (field: string) =>
    t(`fundingSources.${institutionId}.sources.${sourceKey}.${field}`);

  const data = {
    name: get("name"),
    description: get("description"),
    instrumentType: get("instrumentType"),
    eligibleBorrowers: get("eligibleBorrowers"),
    prioritySectors: get("prioritySectors"),
    ticketWindow: get("ticketWindow"),
    financingShare: get("financingShare"),
    financialCost: get("financialCost"),
    tenor: get("tenor"),
    safeguards: get("safeguards"),
    applicationChannel: get("applicationChannel"),
    officialLink: get("officialLink"),
  };

  // Helper to create a section with title and content
  function section(
    title: string,
    content: string | string[],
    options: any = {}
  ) {
    const arr = Array.isArray(content) ? content : [content];
    return [
      { text: title, style: "sectionTitle", ...options },
      ...arr.map((line) => ({ text: line, style: "sectionContent" })),
      { text: "\n" },
    ];
  }

  const docDefinition = {
    pageSize: "A4",
    pageMargins: [40, 40, 40, 40],
    content: [
      // Main Title
      { text: data.name, style: "mainTitle" },
      { text: "\n" },
      // Instrument type and ticket window
      ...section(
        `${t("funding.instrumentType")}, ${t("funding.ticketWindow")}`,
        [
          `${t("funding.instrumentType")}: ${data.instrumentType}`,
          `${t("funding.ticketWindow")}: ${data.ticketWindow}`,
        ]
      ),
      ...section(t("funding.description"), data.description),
      ...section(t("funding.prioritySectors"), data.prioritySectors),
      ...section(t("funding.eligibleBorrowers"), data.eligibleBorrowers),
      ...section(t("funding.financingShare"), data.financingShare),
      ...section(t("funding.financialCost"), data.financialCost),
      ...section(t("funding.tenor"), data.tenor),
      ...section(t("funding.safeguards"), data.safeguards),
      ...section(t("funding.applicationChannel"), data.applicationChannel),
      ...section(t("funding.linkToAccessTheFund"), data.officialLink),
    ],
    styles: {
      mainTitle: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 16],
      },
      sectionTitle: {
        fontSize: 13,
        bold: true,
        margin: [0, 8, 0, 2],
      },
      sectionContent: {
        fontSize: 12,
        margin: [0, 0, 0, 2],
      },
    },
  };

  (window as any).pdfMake.createPdf(docDefinition).download(`${data.name}.pdf`);
}
