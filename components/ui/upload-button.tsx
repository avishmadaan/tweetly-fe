import { domain } from "@/lib/utils";
import { UploadButton } from "@uploadthing/react";
import { FileRouter } from "uploadthing/types";
import { UploadDropzone } from "@uploadthing/react";
import { useMedia } from "@/lib/mediaContext";



type OurFileRouter = {
    imageUploader: FileRouter["imageUploader"];
  };


export const OurUploadDropzone = ({ setSelectedMenu} :{
  setSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
 }) => {

  const {uploadMedia} = useMedia();

  return(

  <UploadDropzone<OurFileRouter, "imageUploader">
  url={`${domain}/api/v1/user/posts/uploadthing`}
    endpoint="imageUploader"
    onClientUploadComplete={ async (res) => {
      // Do something with the response
      console.log("Files: ", res);
     const result=  await uploadMedia(res);
     if(result) {
       setSelectedMenu("YOUR_IMAGES");

     }

    }}
    onUploadError={(error: Error) => {
      alert(`ERROR! ${error.message}`);
    }}
    onUploadBegin={(name) => {
      // Do something once upload begins
      console.log("Uploading: ", name);
    }}
    onDrop={(acceptedFiles) => {
      // Do something with the accepted files
      console.log("Accepted files: ", acceptedFiles);
    }}
  />
)
  };