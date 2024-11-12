import useDateStore from "@/store/date";
import useDutyStore from "@/store/duty";
import { RecruitContentType, RecruitDataType } from "@/type";
import { padStartNum } from "@/lib/util";
import { useQuery } from "@tanstack/react-query";

async function fetchRecruits() {
  const res = await fetch(
    "https://d1kh1cvi0j04lg.cloudfront.net/api/v1/recruits.json"
  );
  return res.json();
}

export default function useGetRecruits() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["recruits"],
    queryFn: fetchRecruits,
  });

  const { year, month } = useDateStore();
  const { checkedIds } = useDutyStore();

  const checkCurrentMonth = (dateString: string) => {
    return (
      dateString.includes(`${year}-${padStartNum(month - 1)}`) ||
      dateString.includes(`${year}-${padStartNum(month)}`) ||
      dateString.includes(`${year}-${padStartNum(month + 1)}`)
    );
  };

  const filterData = data?.reduce(
    (acc: RecruitDataType, curr: RecruitContentType) => {
      // 해당 데이터가 체크된 직무인지 판단
      const filterDuty = curr.duty_ids.find((el) => checkedIds.includes(el));

      if (!!filterDuty || checkedIds.length === 0) {
        // 시작일이 현재 달에 포함되어 있는지 판단
        if (checkCurrentMonth(curr.start_time)) {
          const day = curr.start_time.slice(0, 10);

          if (acc[day]) {
            acc[day].push({ ...curr, isStart: true });
          } else {
            acc[day] = [{ ...curr, isStart: true }];
          }
        }
        // 종료일이 현재 달에 포함되어 있는지 판단
        if (checkCurrentMonth(curr.end_time)) {
          const day = curr.end_time.slice(0, 10);
          if (acc[day]) {
            acc[day].push({ ...curr, isStart: false });
          } else {
            acc[day] = [{ ...curr, isStart: false }];
          }
        }
      }

      return acc;
    },
    {}
  );

  return {
    data: filterData,
    isPending,
    isError,
    error,
  };
}
