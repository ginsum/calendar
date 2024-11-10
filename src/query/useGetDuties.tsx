import useDutyStore from "@/store/duty";
import { ListType } from "@/type";
import { useQuery } from "@tanstack/react-query";

async function fetchDuties() {
  const res = await fetch(
    "https://d1kh1cvi0j04lg.cloudfront.net/api/v1/duties.json"
  );
  return res.json();
}

type DutyIds = Record<number, number[][]>;

export default function useGethDuties() {
  const { isPending, isError, data, error } = useQuery<ListType[]>({
    queryKey: ["duties"],
    queryFn: fetchDuties,
  });

  const { targetFirstDuty, targetSecondDuty } = useDutyStore();

  const firstDutyList = data?.filter(({ parent_id }) => parent_id === null);
  const filterSecondList = data?.filter(
    ({ parent_id }) => parent_id === targetFirstDuty
  );
  const filterThirdList = data?.filter(
    ({ parent_id }) => parent_id === targetSecondDuty
  );

  const dutyIds = data?.reduce((acc: DutyIds, curr) => {
    if (curr.parent_id === null) {
      acc[curr.id] = [];
    } else if (Object.keys(acc).includes(curr.parent_id.toString())) {
      acc[curr.parent_id].push([curr.id]);
    } else {
      Object.keys(acc).forEach((firstId) => {
        const findIndex = acc[+firstId].findIndex(
          ([secondId]) => secondId === curr.parent_id
        );
        if (findIndex !== -1) {
          acc[+firstId][findIndex] = [...acc[+firstId][findIndex], curr.id];
        }
      });
    }
    return acc;
  }, {});

  return {
    data,
    firstDutyList,
    filterSecondList,
    filterThirdList,
    dutyIds: dutyIds,
    isPending,
    isError,
    error,
  };
}
