import jsPDF from "jspdf";
import { Language } from "../../types";
import { FundingSource } from "./fundingSources";

export function handleDownloadPDF(
    data: FundingSource["translations"][Language],
    t: (key: string) => string
) {
    const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
    const left = 40;
    const top = 40;
    const lineHeight = 20;
    const maxWidth = 520;
    const pageHeight = pdf.internal.pageSize.getHeight();
    let y = top;

    function getBlockHeight(texts: string[], fontStyle: "bold" | "normal" = "normal") {
        pdf.setFont("helvetica", fontStyle);
        let lines = 0;
        for (const text of texts) {
            lines += (pdf.splitTextToSize(text, maxWidth) as string[]).length;
        }
        return lines * lineHeight;
    }

    function addSectionWithTitle(title: string, content: string[], fontStyle: "bold" | "normal" = "normal") {
        const titleHeight = getBlockHeight([title], "bold");
        const contentHeight = getBlockHeight(content, fontStyle);
        const totalHeight = titleHeight + contentHeight;
        if (y + totalHeight > pageHeight - top) {
            pdf.addPage();
            y = top;
        }
        // Add title
        pdf.setFont("helvetica", "bold");
        const titleLines = pdf.splitTextToSize(title, maxWidth) as string[];
        for (const line of titleLines) {
            pdf.text(line, left, y);
            y += lineHeight;
        }
        // Add content
        pdf.setFont("helvetica", fontStyle);
        for (const text of content) {
            const lines = pdf.splitTextToSize(text, maxWidth) as string[];
            for (const line of lines) {
                pdf.text(line, left, y);
                y += lineHeight;
            }
        }
        y += lineHeight; // spacing after section
    }

    pdf.setFontSize(18);
    addSectionWithTitle(data.title, [], "bold");

    pdf.setFontSize(12);
    addSectionWithTitle(
        `${t('funding.region')}, ${t('funding.currency')}, ${t('funding.scope')}`,
        [
            `${t('funding.region')}: ${data.region}`,
            `${t('funding.currency')}: ${data.currency}`,
            `${t('funding.scope')}: ${data.scope}`
        ]
    );

    addSectionWithTitle(t('Description'), [data.description]);
    addSectionWithTitle(t('Priority Themes'), data.priorityThemes.map(theme => `• ${theme}`));
    addSectionWithTitle(t('Types of Funding'), data.typesOfFunding.map(type => `• ${type}`));
    addSectionWithTitle(
        t('Funded Project Example'),
        [`${data.fundedProjectExample.title}: ${data.fundedProjectExample.description}`]
    );
    addSectionWithTitle(t('Eligibility Requirements'), data.eligibilityRequirements.map(req => `• ${req}`));
    addSectionWithTitle(t('funding.linkToAccessTheFund'), [data.link]);

    pdf.save(data.title + '.pdf');
} 