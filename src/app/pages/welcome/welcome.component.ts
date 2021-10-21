import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
/* nzUpload: Custom Upload request */
import { filter } from 'rxjs/operators';

import { NzUploadFile } from 'ng-zorro-antd/upload';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private msg: NzMessageService,
    private http: HttpClient) { }

  ngOnInit() {
  }
  heroesUrl= 'http://localhost:8003/food-to-json?email=awdawd%40gmail.com'
  uploading = false;
  fileList: NzUploadFile[] = [];
  // setMediaUploadHeaders = (file: UploadFile) => {
  //   return {
  //     "Content-Type": "multipart/form-data",
  //     "Accept": "application/json",
  //   }
  // };

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  handleUpload(): void {
    const formData = new FormData();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
    this.uploading = true;

  this.http.post(this.heroesUrl, formData).subscribe(
    (response) => {
      console.log(response)
      this.uploading = false;
      this.fileList = [];
      this.msg.success('upload successfully.');
      const myJSON = JSON.stringify(response);
      this.msg.success('The result is : ' + myJSON );
    },
    (error) => {
      console.log(error)
      this.uploading = false;
      this.msg.error('upload failed.');
    }
  )

    // const req = new HttpRequest('POST', this.heroesUrl, formData, {
    //   // reportProgress: true
    // });
    // this.http
    //   .request(req)
    //   .pipe(filter(e => e instanceof HttpResponse))
    //   .subscribe(
    //     () => {
    //       this.uploading = false;
    //       this.fileList = [];
    //       this.msg.success('upload successfully.');
    //     },
    //     () => {
    //       this.uploading = false;
    //       this.msg.error('upload failed.');
    //     }
    //   );
  }


}
