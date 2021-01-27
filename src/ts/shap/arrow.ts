class Arrow{
  public x:number = 0;
  public y:number = 0;
  public width:number = 100;
  public height:number = 400;
  public rotation = 0;
  private ctx:CanvasRenderingContext2D = null;
  private fillStyle = "rgba(57,119,224)";
  private strokeStyle = "rgba(0,0,0)";
  constructor(ctx:CanvasRenderingContext2D,props:any){
    this.ctx = ctx;
    Object.assign(this,props);
  }
  createPath(){
    let {width,height} = this;
    this.ctx.beginPath();
    this.ctx.moveTo(-width/2,-height /2);
    this.ctx.lineTo()
  }
  render(){

  }
}