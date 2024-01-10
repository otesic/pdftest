import { useRouter } from "next/router";
import React from "react";
import DragDrop from "../components/DragDrop";

export default function Img() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };
  return (
    <div>
      <h1>이미지 업로드 </h1>
      <button
        onClick={handleClick}
        className="border border-blue-500 p-5 rounded-xl"
      >
        Home으로 가기
      </button>

      <DragDrop />
    </div>
  );
}
