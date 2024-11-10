export interface ListType {
  id: number;
  name: string;
  parent_id: number | null;
}

export interface RecruitContentType {
  id: number;
  company_name: string;
  end_time: string;
  start_time: string;
  title: string;
  image_url: string;
  isStart: boolean;
}

export type RecruitDataType = Record<string, RecruitContentType[]>;
