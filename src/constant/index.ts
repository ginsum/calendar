import { ListType } from "@/type";

export const weekDay = [
  { id: "week-1", text: "SUN" },
  { id: "week-2", text: "MON" },
  { id: "week-3", text: "TUE" },
  { id: "week-4", text: "WEN" },
  { id: "week-5", text: "THR" },
  { id: "week-6", text: "FRI" },
  { id: "week-7", text: "SAT" },
];

export const dummyData: ListType[] = [
  {
    id: 1,
    name: "경영·사무",
    parent_id: null,
  },
  {
    id: 2,
    name: "마케팅·광고·홍보",
    parent_id: null,
  },
  {
    id: 3,
    name: "무역·유통",
    parent_id: null,
  },
  {
    id: 13,
    name: "기획·전략·경영",
    parent_id: 1,
  },
  {
    id: 14,
    name: "인사·노무·교육",
    parent_id: 1,
  },
  {
    id: 15,
    name: "재무·세무·IR",
    parent_id: 1,
  },
  {
    id: 19,
    name: "경영기획",
    parent_id: 13,
  },
  {
    id: 20,
    name: "사업기획",
    parent_id: 13,
  },
  {
    id: 21,
    name: "경영전략",
    parent_id: 13,
  },
  {
    id: 22,
    name: "사업전략",
    parent_id: 13,
  },
  {
    id: 23,
    name: "경영분석·컨설턴트",
    parent_id: 13,
  },
  {
    id: 42,
    name: "마케팅",
    parent_id: 2,
  },
  {
    id: 43,
    name: "광고·홍보",
    parent_id: 2,
  },
];
