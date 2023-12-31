import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { environment } from 'src/environments/environment';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class S3ServiceService {

  private bucket: S3Client;

  constructor(
    private http: HttpClient) {
    this.bucket = new S3Client(
      {
        // credentials: {
        //   accessKeyId: environment.AWS_ACCESS_KEY_ID,
        //   secretAccessKey: environment.AWS_SECRET_ACCESS_KEY,
        // },
        region: environment.AWS_REGION,
      }
    );
   }

   async uploadFile(file: File) {
    const formData = new FormData();
    
    formData.append('filename', file.name);
    const res:string = await axios.post('https://bkltso93qi.execute-api.eu-central-1.amazonaws.com/dev/upload',formData);

    console.log(res);
    const axiosResponse = await axios.put(res, {
      data: file,

    }, {
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    });
    console.log(axiosResponse)
    

    // const params = {
    //   Bucket: 'intellifind',
    //   Key: file.name,
    //   Body: file,
    //   ACL: 'public-read',
    //   ContentType: file.type
    // };

    // try {
    //   const response = await this.bucket.send(new PutObjectCommand(params));
    //   console.log("SUCCESS", response);
    // } catch(error) {
    //   console.log("FAILURE", error);
    // }
    
   
  }
}
