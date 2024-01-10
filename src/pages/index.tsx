import { useRouter } from "next/router";
import { MouseEventHandler } from "react";

export default function Home() {
  const router = useRouter();
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (e.currentTarget.name === "pdf") {
      return router.push("/pdfviewer");
    }
    if (e.currentTarget.name === "img") {
      return router.push("/img");
    }
  };
  return (
    <main>
      <h1>PDF test</h1>
      <button
        className="border border-blue-700 p-3 rounded-xl"
        name="pdf"
        onClick={handleClick}
      >
        PDF 보러가기
      </button>

      <h1>img upload</h1>
      <button
        className="border border-blue-700 p-3 rounded-xl"
        name="img"
        onClick={handleClick}
      >
        IMG 업로드 하기
      </button>
    </main>
  );
}
