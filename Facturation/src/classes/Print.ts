import { HasPrint } from "../interfaces/HasPrint";

export class Print implements HasPrint{

    constructor(
        private element:HTMLDivElement


    ) {
        
        
    }

    print(): void {
       document.body.innerHTML= this.element.innerHTML;
       window.print();
       window.location.reload();
    }


}