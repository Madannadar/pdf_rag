import Image from "next/image";
import FileUpload from "./components/file-upload";
export default function Home() {
  return (
    <div className="min-h-screen w-screen flex">
      <div className="w-[30vw] min-h-screen p-4 flex justify-center items-center flex-col border-r-2">
        <FileUpload />
      </div>
      <div className="w-[50vw] min-h-screen border-l-2">2</div>
    </div>
  )
}