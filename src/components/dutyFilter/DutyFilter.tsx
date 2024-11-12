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
    const firstId = Number(value);

    let childrenIds: number[] = [];

    Object.keys(dutyIds[firstId]).forEach((secondId) => {
      childrenIds = [...childrenIds, ...dutyIds[firstId][+secondId], +secondId];
    });

    if (checkedIds.includes(firstId)) {
      const filterIds = checkedIds.filter(
        (id) => !childrenIds.includes(id) && id !== firstId
      );
      setCheckedIds(filterIds);
    } else {
      setCheckedIds([...new Set([...checkedIds, ...childrenIds, firstId])]);
    }
  };

  const onClickSecondCheck = (value: string, firstId: number) => {
    const secondId = Number(value);

    const childrenIds = dutyIds[firstId][secondId];

    if (checkedIds.includes(secondId)) {
      const filterIds = checkedIds.filter(
        (id) => !childrenIds.includes(id) && id !== secondId && id !== firstId
      );
      setCheckedIds(filterIds);
    } else {
      const findNotCheckedId = Object.keys(dutyIds[firstId]).filter(
        (el) => !checkedIds.includes(+el)
      );
      if (findNotCheckedId.length === 1) {
        setCheckedIds([
          ...new Set([...checkedIds, ...childrenIds, secondId, firstId]),
        ]);
      } else {
        setCheckedIds([...new Set([...checkedIds, ...childrenIds, secondId])]);
      }
    }
  };

  const onClickThirdCheck = (thirdId: number, secondId: number) => {
    const firstParentId =
      Object.keys(dutyIds).find((firstId) => {
        const findThirdId = Object.keys(dutyIds[+firstId]).find((secondId) =>
          dutyIds[+firstId][+secondId].includes(thirdId)
        );

        return !!findThirdId;
      }) || 0;

    if (checkedIds.includes(thirdId)) {
      const filterIds = checkedIds.filter(
        (id) => id !== thirdId && id !== secondId && id !== +firstParentId
      );
      setCheckedIds(filterIds);
    } else {
      const thirdIds = dutyIds[+firstParentId][secondId];
      const findNotCheckedId = thirdIds?.filter(
        (el) => !checkedIds.includes(el)
      );

      if (findNotCheckedId?.length === 1) {
        const findNotCheckedParentId = Object.keys(
          dutyIds[+firstParentId]
        ).filter((secondId) => !checkedIds.includes(+secondId));

        if (findNotCheckedParentId.length === 1) {
          setCheckedIds([...checkedIds, thirdId, secondId, +firstParentId]);
        } else {
          setCheckedIds([...checkedIds, thirdId, secondId]);
        }
      } else {
        setCheckedIds([...checkedIds, thirdId]);
      }
    }
  };

  const onClickFirstTarget = (id: number) => {
    setSelectedFirstDuty(id);
    setSelectedSecondDuty(0);
  };

  return (
    <div className="flex border rounded-lg ">
      <div className="flex flex-col w-[240px] h-[200px] overflow-scroll">
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
            <div className="text-sm">{name}</div>
          </DutyFilterBox>
        ))}
      </div>
      <div className="flex flex-col w-[240px] border-x h-[200px] overflow-scroll">
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
            <div className="text-sm">{name}</div>
          </DutyFilterBox>
        ))}
      </div>
      <div className="flex flex-wrap gap-1 w-[280px] h-[200px] p-2 overflow-scroll">
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
