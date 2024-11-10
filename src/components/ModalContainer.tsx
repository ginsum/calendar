"use client";

import useModalStore from "@/store/modal";
import { RecruitDataType } from "@/type";
import Modal from "./Modal";

export default function ModalContainer({ data }: { data: RecruitDataType }) {
  const { isOpen } = useModalStore();

  return isOpen ? (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-20 overflow-y-auto h-full w-full flex items-center justify-center">
      <Modal data={data} />
    </div>
  ) : (
    <></>
  );
}
