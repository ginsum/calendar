import useDateStore from "@/store/date";
import { RecruitContentType, RecruitDataType } from "@/type";
import { padStartNum } from "@/util";
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

  const checkCurrentMonth = (dateString: string) => {
    return (
      dateString.includes(`${year}-${padStartNum(month - 1)}`) ||
      dateString.includes(`${year}-${padStartNum(month)}`) ||
      dateString.includes(`${year}-${padStartNum(month + 1)}`)
    );
  };

  const filterData = data?.reduce(
    (acc: RecruitDataType, curr: RecruitContentType) => {
      if (checkCurrentMonth(curr.start_time)) {
        const day = curr.start_time.slice(0, 10);
        if (acc[day]) {
          acc[day].push({ ...curr, isStart: true });
        } else {
          acc[day] = [{ ...curr, isStart: true }];
        }
      }
      if (checkCurrentMonth(curr.end_time)) {
        const day = curr.end_time.slice(0, 10);
        if (acc[day]) {
          acc[day].push({ ...curr, isStart: false });
        } else {
          acc[day] = [{ ...curr, isStart: false }];
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