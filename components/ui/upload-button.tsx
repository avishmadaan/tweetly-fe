import { domain } from "@/lib/utils";
import { UploadButton } from "@uploadthing/react";
import { FileRouter } from "uploadthing/types";
import { UploadDropzone } from "@uploadthing/react";



type OurFileRouter = {
    imageUploader: FileRouter["imageUploader"];
  };

export const ButtonUpload = () => {

  return (
    <UploadButton<OurFileRouter, "imageUploader">
  url={`${domain}/api/v1/user/posts/uploadthing`}
  endpoint={"imageUploader"}
  className="ut-allowed-content:mt-2"
  onClientUploadComplete={(res) => console.log(res)}
  onUploadError={(err) => console.log(err,"some error")}
  
/>

  )  

}

export const OurUploadDropzone = () => (
  <UploadDropzone<OurFileRouter, "imageUploader">
  url={`${domain}/api/v1/user/posts/uploadthing`}
    endpoint="imageUploader"
    onClientUploadComplete={(res) => {
      // Do something with the response
      console.log("Files: ", res);
      alert("Upload Completed");
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
);