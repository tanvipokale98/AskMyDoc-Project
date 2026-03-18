import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify =(statusCode, msg) =>{

 if(statusCode>=400 && statusCode<=599){
    toast.error(msg);
 }
 else if(statusCode>=200 && statusCode<=299){
    toast.success(msg);
 }
 else {
    toast.warning(msg);
 }

}