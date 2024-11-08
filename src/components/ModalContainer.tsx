"use client";

import { useState } from "react";
import Modal from "./Modal";

export default function ModalContainer() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return isOpen ? (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-between">
      <div>앞</div>
      <Modal onClose={() => setIsOpen(false)} />
      <div>뒤</div>
    </div>
  ) : (
    <></>
  );
}
