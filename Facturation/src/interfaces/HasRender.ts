import { HashHtmlFormat } from "./HasHtmlFormat";

export interface HasRender{


    render(docObject:HashHtmlFormat,docType:string):void;
}