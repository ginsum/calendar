"use client";

import useGethDuties from "@/query/useGetDuties";
import useDutyStore from "@/store/duty";
import DutyFilterBox from "./DutyFilterBox";
import DutyFilterChip from "./DutyFilterChip";

const arr = Array(5).fill(0);

export default function DutyFilter() {
  const {
    firstDutyList,
    secondDutyList,
    thirdDutyList,
    dutyIds = {},
    isPending,
  } = useGethDuties();
  const {
    checkedIds,
    selectedFirstDuty,
    selectedSecondDuty,
    setSelectedFirstDuty,
    setSelectedSecondDuty,
    setCheckedIds,
  } = useDutyStore();

  const onClickFirstCheck = (value: string) => {
    const valueNum = Number(value);
    const childrenIds = dutyIds[valueNum].flat();

    if (checkedIds.includes(valueNum)) {
      const filterIds = checkedIds.filter(
        (id) => !childrenIds.includes(id) && id !== valueNum
      );
      setCheckedIds(filterIds);
    } else {
      setCheckedIds([...new Set([...checkedIds, ...childrenIds, valueNum])]);
    }
  };

  const onClickSecondCheck = (value: string, parent_id: number) => {
    const valueNum = Number(value);

    const childrenIds =
      dutyIds[parent_id]?.find(([secondId]) => secondId === valueNum) || [];

    if (checkedIds.includes(valueNum)) {
      const filterIds = checkedIds.filter(
        (id) => !childrenIds.includes(id) && id !== valueNum && id !== parent_id
      );
      setCheckedIds(filterIds);
    } else {
      const filterId = dutyIds[parent_id].filter(
        (el) => !checkedIds.includes(el[0])
      );
      if (filterId.length === 1) {
        setCheckedIds([...new Set([...checkedIds, ...childrenIds, parent_id])]);
      } else {
        setCheckedIds([...new Set([...checkedIds, ...childrenIds])]);
      }
    }
  };

  const onClickThirdCheck = (value: number, parent_id: number) => {
    const firstParentId =
      Object.keys(dutyIds).find((firstId) => {
        const index = dutyIds[+firstId]?.findIndex(
          ([secondId]) => secondId === parent_id
        );
        return index !== -1;
      }) || 0;

    if (checkedIds.includes(value)) {
      const filterIds = checkedIds.filter(
        (id) => id !== value && id !== parent_id && id !== +firstParentId
      );
      setCheckedIds(filterIds);
    } else {
      const currentIds = dutyIds[+firstParentId].find(
        (el) => el[0] === parent_id
      );
      const filterId = currentIds?.filter((el) => !checkedIds.includes(el));

      if (filterId?.length === 2) {
        const filterParentId = dutyIds[+firstParentId].filter(
          (el) => !checkedIds.includes(el[0])
        );
        if (filterParentId.length === 1) {
          setCheckedIds([...checkedIds, value, parent_id, +firstParentId]);
        } else {
          setCheckedIds([...checkedIds, value, parent_id]);
        }
      } else {
        setCheckedIds([...checkedIds, value]);
      }
    }
  };

  const onClickFirstTarget = (id: number) => {
    setSelectedFirstDuty(id);
    setSelectedSecondDuty(0);
  };

  return (
    <div className="flex border rounded-lg ">
      <div className="flex flex-col w-[240px] h-[220px] overflow-scroll">
        {isPending && (
          <div className="flex flex-col w-full p-2 gap-2">
            {arr.map((_el, index) => (
              <div key={index} className="h-8 bg-zinc-100 rounded"></div>
            ))}
          </div>
        )}
        {firstDutyList?.map(({ id, name }) => (
          <DutyFilterBox
            key={id}
            isSelected={selectedFirstDuty === id}
            onClick={() => onClickFirstTarget(id)}
          >
            <input
              type="checkbox"
              onChange={(e) => onClickFirstCheck(e.target.value)}
              value={id}
              checked={checkedIds.includes(id)}
            />
            <div>{name}</div>
          </DutyFilterBox>
        ))}
      </div>
      <div className="flex flex-col w-[240px] border-x h-[220px] overflow-scroll">
        {secondDutyList?.map(({ id, name, parent_id }) => (
          <DutyFilterBox
            key={id}
            isSelected={selectedSecondDuty === id}
            onClick={() => setSelectedSecondDuty(id)}
          >
            <input
              type="checkbox"
              onChange={(e) =>
                onClickSecondCheck(e.target.value, parent_id || 0)
              }
              value={id}
              checked={checkedIds.includes(id)}
            />
            <div>{name}</div>
          </DutyFilterBox>
        ))}
      </div>
      <div className="flex flex-wrap gap-1 w-[280px] h-[220px] p-2 overflow-scroll">
        {thirdDutyList?.map(({ id, name, parent_id }) => (
          <DutyFilterChip
            key={id}
            name={name}
            checked={checkedIds.includes(id)}
            onClick={() => onClickThirdCheck(id, parent_id || 0)}
          />
        ))}
      </div>
    </div>
  );
}
