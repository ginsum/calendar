import useDutyStore from "@/store/duty";
import { ListType } from "@/type";
import { useQuery } from "@tanstack/react-query";

async function fetchDuties() {
  const res = await fetch(
    "https://d1kh1cvi0j04lg.cloudfront.net/api/v1/duties.json"
  );
  return res.json();
}

type SecondLevelType = Record<number, number[]>;
type TotalDutyIds = Record<number, SecondLevelType>;

export default function useGethDuties() {
  const { isPending, isError, data, error } = useQuery<ListType[]>({
    queryKey: ["duties"],
    queryFn: fetchDuties,
  });

  const { selectedFirstDuty, selectedSecondDuty } = useDutyStore();

  // 각 계층별로 표시될 직무를 필터함
  const firstDutyList = data?.filter(({ parent_id }) => parent_id === null);
  const secondDutyList = data?.filter(
    ({ parent_id }) => parent_id === selectedFirstDuty
  );
  const thirdDutyList = data?.filter(
    ({ parent_id }) => parent_id === selectedSecondDuty
  );

  /**
   * 상위 직무를 체크시 하위 계층 체크를 판단하기 위한 객체 생성
   * 구조
   *  {
   *    firstId1: {secondId: [thirdId, ...], secondId2: [thirdId, ...]},
   *    firstId2: {secondId: [], ... },
   *    ...
   *  }
   * 상위 직무가 데이터의 앞쪽에 위치한다는 가정하에 코드 작성
   */

  const dutyIds = data?.reduce((acc: TotalDutyIds, curr) => {
    if (curr.parent_id === null) {
      acc[curr.id] = {};
    } else if (Object.keys(acc).includes(curr.parent_id.toString())) {
      acc[curr.parent_id] = { ...acc[curr.parent_id], [curr.id]: [] };
    } else {
      const firstParentId =
        Object.keys(acc).find((firstId) => {
          return Object.keys(acc[+firstId]).find(
            (secondId) => +secondId === curr.parent_id
          );
        }) || 0;

      acc[+firstParentId][curr.parent_id] = [
        ...acc[+firstParentId][curr.parent_id],
        curr.id,
      ];
    }
    return acc;
  }, {});

  return {
    firstDutyList,
    secondDutyList,
    thirdDutyList,
    dutyIds: dutyIds,
    isPending,
    isError,
    error,
  };
}
