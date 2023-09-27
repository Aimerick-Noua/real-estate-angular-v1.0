import { FileHandle } from "./file-handle";

export class PropertyClass {
    name!:string;
    location!:string;
    size!:number;
    price!:number;
    description!:string;
    status!:string;
    dateListed!:string;
    propertyImages!:FileHandle[]
}

