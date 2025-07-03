import { institutions } from "../institutions";

export interface FundingSource {
  id: string;
  institutionId: string;
  sourceKey: string;
  nextSteps?: {
    title: string;
    items: string[];
    note?: string;
    timeline?: string;
  }[];
}

export function getFundingSources(): FundingSource[] {
  const sources: FundingSource[] = [];
  institutions.forEach((institution) => {
    institution.fundingSources.forEach((source: any) => {
      sources.push({
        id: source["Fund Name"],
        institutionId: institution.id,
        sourceKey: source.sourceKey,
      });
    });
  });
  return sources;
}
