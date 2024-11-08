"use client";

import { dummyData } from "@/constant";
import { ListType } from "@/type";
import { useEffect, useState } from "react";
import DutyFilterBox from "./DutyFilterBox";
import DutyFilterChip from "./DutyFilterChip";

export default function DutyFilter() {
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  const [secondDutyList, setSecondDutyList] = useState<ListType[]>([]);
  const [thirdDutyList, setThirdDutyList] = useState<ListType[]>([]);

  const [targetFirstDuty, setTargetFirstDuty] = useState<number>(0);
  const [targetSecondDuty, setTargetSecondDuty] = useState<number>(0);

  const [allId, setAllId] = useState<Record<number, number[][]>>({});

  const firstDutyList = dummyData.filter(({ parent_id }) => parent_id === null);

  useEffect(() => {
    const ids: Record<number, number[][]> = {};

    dummyData.forEach(({ id, parent_id }) => {
      if (parent_id === null) {
        ids[id] = [];
      } else if (Object.keys(ids).includes(parent_id.toString())) {
        ids[parent_id].push([id]);
      } else {
        Object.keys(ids).forEach((firstId) => {
          const findIndex = ids[+firstId].findIndex(
            ([secondId]) => secondId === parent_id
          );
          if (findIndex !== -1) {
            ids[+firstId][findIndex] = [...ids[+firstId][findIndex], id];
          }
        });
      }
    });
    setAllId(ids);
  }, []);

  useEffect(() => {
    const filterSecondList = dummyData.filter(
      ({ parent_id }) => parent_id === targetFirstDuty
    );

    setSecondDutyList(filterSecondList);
  }, [targetFirstDuty]);

  useEffect(() => {
    const filterThirdList = dummyData.filter(
      ({ parent_id }) => parent_id === targetSecondDuty
    );
    setThirdDutyList(filterThirdList);
  }, [targetFirstDuty, targetSecondDuty]);

  const onClickFirstCheck = (value: string) => {
    const valueNum = Number(value);
    const childrenIds = allId[valueNum].flat();

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
      allId[parent_id].find(([secondId]) => secondId === valueNum) || [];

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
      Object.keys(allId).find((firstId) => {
        const index = allId[+firstId].findIndex(
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
        {firstDutyList.map(({ id, name }) => (
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
        {secondDutyList.map(({ id, name, parent_id }) => (
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
      <div className="flex flex-wrap w-[240px] p-2 gap-2">
        {thirdDutyList.map(({ id, name, parent_id }) => (
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
