class Game {
  constructor() {
    let newMapImg = new Image();
    newMapImg.src = 'assets/emptyMap.png'; // An image with all transparent pixels.
    newMapImg.onload = (function () {
      let destructionMap = new DestructibleMap(newMapImg);
      this.world = new World(destructionMap);
      this.canvas = document.getElementById('display');


      // Set responsive size
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.canvas.style.left = "0px";
      this.canvas.style.top = "0px";
      this.canvas.style.position = "absolute";
      window.addEventListener('resize', event => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      })

      this.ctx = this.canvas.getContext('2d');
      //console.log(ctx);
      //world.draw(ctx, canvas.width, canvas.height);

      //Add timer
      this.timer = new Timer();
      // Add a controls handler
      this.controls = new Controls();

      // Add mouse listener
      this.controls.addMouseListener(this.canvas);

      // Turn mechanism
      this.turn = new Turn(this.timer, this.world, 5);
      requestAnimationFrame(this.draw.bind(this));
    }).bind(this);
  }

  draw() {

    this.world.update(this.timer.tick(), this.controls);
    this.turn.countdownTurn();
    this.world.draw(this.ctx, this.canvas.width, this.canvas.height);

    // For testing only.
    this.ctx.font = "30px Arial";
    this.ctx.fillText(5 - Math.round(this.timer.turnTime % 5), 200, 200);

    this.controls.reset();
    requestAnimationFrame(this.draw.bind(this));
  }

  loop(){
    this.clockTick = this.timer.tick();
    this.draw();
  };
}
