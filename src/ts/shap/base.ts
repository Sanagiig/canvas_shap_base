export class Shap {
  public x: number = 0;
  public y: number = 0;
  public width: number = 400;
  public height: number = 100;
  public rotation = 0;
  protected fillStyle: string = "rgba(57,119,224)";
  protected strokeStyle: string = "rgba(0,0,0)";
  protected points: Array<{ x: number, y: number }> = [];
  constructor(option: any) {
    this.propertyInit(option);
  }
  propertyInit(option:any){
    let keys = Object.keys(this);
    let key:any;
    for(key in option){
      if(keys.indexOf(key) > -1){
        Object.defineProperty(this,key,{
          value:option[key]
        })
      }
    }
  }
}