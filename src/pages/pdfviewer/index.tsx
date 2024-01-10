import { useRouter } from "next/router";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
//
// 워닝 관련해서 추가해야될 코드
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// workerSrc 정의 하지 않으면 pdf 안보임
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const router = useRouter();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const handleClick = () => {
    router.push("/");
  };

  // pdf 다운로드
  const handleClickToDownloadPDF = (url: string) => {
    fetch(url, { method: "GET" })
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        // 파일명 static 할 것으로 예상됨
        a.download = "이용동의서";
        document.body.appendChild(a);
        a.click();
        setTimeout((_: any) => {
          window.URL.revokeObjectURL(url);
        }, 60000);
        a.remove();
      })
      .catch((err) => {
        console.error("err: ", err);
      });
  };

  return (
    <>
      <div>
        <button
          className="border border-blue-700 p-3 rounded-xl"
          onClick={handleClick}
        >
          홈으로 돌아가기
        </button>
        <button
          className="border border-blue-700 p-3 rounded-xl"
          onClick={() => handleClickToDownloadPDF("/test.pdf")}
        >
          PDF 다운받기
        </button>
      </div>
      <div className="flex justify-center items-center gap-5">
        {pageNumber > 1 && (
          <button
            className="border border-blue-500 p-4 rounded-xl"
            onClick={() => setPageNumber((prev) => prev + -1)}
          >
            ◀︎ 이전페이지
          </button>
        )}
        현재 {pageNumber} page / 총 {numPages} page
        {pageNumber < numPages && (
          <button
            className="border border-blue-500 p-4 rounded-xl"
            onClick={() => setPageNumber((prev) => prev + +1)}
          >
            다음페이지 ►
          </button>
        )}
      </div>
      <Document
        file="/test.pdf" // 제공할 파일 주소
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {/* height, width는 number 타입으로 vh, %는 먹지 않습니다. */}
        <Page height={600} pageNumber={pageNumber} />
      </Document>
    </>
  );
};

export default PdfViewer;
