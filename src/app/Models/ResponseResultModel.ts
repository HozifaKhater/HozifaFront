export interface ResponseResultModel{
  state : boolean;
  errors : string;
  data : {
    message:string;
    result:any;
  };
}

