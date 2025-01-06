import { domain } from "@/lib/utils";
import { UploadButton } from "@uploadthing/react";
import { FileRouter } from "uploadthing/types";



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