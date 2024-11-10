"use client";

import useGethDuties from "@/query/useGetDuties";
import useDutyStore from "@/store/duty";
import DutyFilterBox from "./DutyFilterBox";
import DutyFilterChip from "./DutyFilterChip";

export default function DutyFilter() {
  const {
    firstDutyList,
    filterSecondList,
    filterThirdList,
    dutyIds = {},
  } = useGethDuties();
  const { checkedIds, setTargetFirstDuty, setTargetSecondDuty, setCheckedIds } =
    useDutyStore();

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
      setCheckedIds([...new Set([...checkedIds, ...childrenIds])]);
    }
  };

  const onClickThirdCheck = (value: number, parent_id: number) => {
    const parentFirstId =
      Object.keys(dutyIds).find((firstId) => {
        const index = dutyIds[+firstId]?.findIndex(
          ([secondId]) => secondId === parent_id
        );
        return index !== -1;
      }) || 0;

    if (checkedIds.includes(value)) {
      const filterIds = checkedIds.filter(
        (id) => id !== value && id !== parent_id && id !== +parentFirstId
      );
      setCheckedIds(filterIds);
    } else {
      setCheckedIds([...checkedIds, value]);
    }
  };

  const onClickFirstTarget = (id: number) => {
    setTargetFirstDuty(id);
    setTargetSecondDuty(0);
  };

  return (
    <div className="flex border rounded-lg">
      <div className="flex flex-col w-[220px]">
        {firstDutyList?.map(({ id, name }) => (
          <DutyFilterBox key={id} onClick={() => onClickFirstTarget(id)}>
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
      <div className="flex flex-col w-[220px] border-x">
        {filterSecondList?.map(({ id, name, parent_id }) => (
          <DutyFilterBox key={id} onClick={() => setTargetSecondDuty(id)}>
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
      <div className="flex flex-wrap justify-start items-start w-[240px] p-2 gap-2">
        {filterThirdList?.map(({ id, name, parent_id }) => (
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
