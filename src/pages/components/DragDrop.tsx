import React, {
  ChangeEvent,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";

interface IFileTypes {
  id: number;
  object: File;
}

const DragDrop = () => {
  const [files, setFiles] = useState<IFileTypes[]>([]);

  const [imgSrc, setImgSrc] = useState<any>("/userDummy.png");

  const dragRef = useRef<HTMLLabelElement | null>(null);
  const fileId = useRef<number>(0);

  // img 파일 onchage 감지 Fn
  const prevImgFunction = (e: any) => {
    if (e.target.files?.length) {
      var imgTarget = e.target?.files[0];
      var fileReader = new FileReader();
      fileReader.readAsDataURL(imgTarget);
      fileReader.onload = function (e: any) {
        /* file을 꺼내서 State로 지정 */
        // console.log(e.target?.result);

        setImgSrc(e.target?.result);
        // setContent(imgTarget);
      };
    } else {
      /* 사용자가 클릭만 하고 선택하지 않으면 default이미지 */
      setImgSrc("/img/userDummy.png");
    }
  };

  const onChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFiles: File[] = [];
      let tempFiles: IFileTypes[] = files;

      if (e.type === "drop") {
        selectFiles = e.dataTransfer.files;
      } else {
        selectFiles = e.target.files;
        var imgTarget = e.target?.files[0];
        var fileReader = new FileReader();
        fileReader.readAsDataURL(selectFiles[0]);
        fileReader.onload = function (e: any) {
          /* file을 꺼내서 State로 지정 */
          // console.log(e.target?.result);

          setImgSrc(e.target?.result);
          // setContent(imgTarget);
        };
        // if (e.target.files?.length) {
        // }
      }

      for (const file of selectFiles) {
        tempFiles = [
          ...tempFiles,
          {
            id: fileId.current++,
            object: file,
          },
        ];
      }

      setFiles(tempFiles);

      //   setImgSrc(tempFiles[0]?.object?.name);
    },
    [files]
  );

  const handleFilterFile = useCallback(
    (id: number): void => {
      setFiles(files.filter((file: IFileTypes) => file.id !== id));
    },
    [files]
  );

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer!.files) {
    }
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
    },
    [onChangeFiles]
  );

  const initDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragIn);
      dragRef.current.addEventListener("dragleave", handleDragOut);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", handleDragIn);
      dragRef.current.removeEventListener("dragleave", handleDragOut);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return (
    <div className="flex flex-col w-full h-80 border border-blue-500 rounded-2xl">
      {/* 미리보기 */}
      <div className="flex items-center py-3">
        <div className="w-12 h-12 mr-4 flex-none rounded-xl border overflow-hidden">
          {imgSrc.includes("null") ? (
            <img src="/img/userImg/userDummy.png" alt="dummy" />
          ) : (
            <img src={imgSrc} alt="img" />
          )}
        </div>
        <label className="cursor-pointer ">
          <input
            type="file"
            className="hidden cursor-none"
            name="ACDM_IMG"
            id="file-input"
            // accept="accept"
            accept="image/*"
            // multiple="multiple"
            onChange={prevImgFunction}
          />

          <div className={`flex gap-10 items-center `}>
            {/* {content?.name && <span className="text-xs">{content?.name}</span>} */}
            <span className="focus:outline-none text-white text-sm py-2 px-4 rounded-lg bg-blue-400 hover:bg-blue-500 hover:shadow-lg">
              파일 선택
            </span>
          </div>
        </label>
      </div>

      <input
        className="border border-red-400 p-3 rounded-xl"
        type="file"
        id="fileUpload"
        multiple={true}
        onChange={onChangeFiles}
        style={{ display: "none" }}
        placeholder="파일을 여기에 첨부해주세요 Drag & Drop 가능"
      />

      <label
        className="border border-red-400 p-3 rounded-xl"
        htmlFor="fileUpload"
        ref={dragRef}
        onChange={prevImgFunction}
      >
        <div>파일 첨부 공간</div>
      </label>

      <div>
        {files.length > 0 &&
          files.map((file: IFileTypes) => {
            const {
              id,
              object: { name },
            } = file;

            return (
              <div key={id} className="flex gap-3">
                <div>{name}</div>
                <div
                  className="DragDrop-Files-Filter"
                  onClick={() => handleFilterFile(id)}
                >
                  X
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DragDrop;
