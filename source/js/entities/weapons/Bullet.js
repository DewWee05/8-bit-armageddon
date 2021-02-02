/**
 * A generic bullet that is spawned when the player shoots
 */
class Bullet extends Entity{
    /**
     * Constructor for a bullet entity
     * @param {number} x - The starting x position
     * @param {number} y - The starting y position
     * @param {number} angle - The angle of the firing direction
     * @param {number} power - The force with which to fire the
     *                         projectile. higher is further
     */
    constructor(x, y, angle, power) {
        super(x, y, 8, 8);
        this.vel.x = Math.cos(angle) * power;
        this.vel.y = -Math.sin(angle) * power;

        this.spritesheet = MANAGER.getAsset('./assets/weapons.png');

        this.animations = [];
        this.loadAnimations();
    }

    /**
     * Update the bullet flying through the air.
     *
     * @params {World} - The world object that should be referenced
     * @params {deltaT} - The number of ms since the last update
     */
    update(world, deltaT){
        this.add(this.desiredMovement(deltaT))

        // update direction/facing
        if (this.vel.x < 0) this.facing = 1;
        if (this.vel.x > 0) this.facing = 0;

        if (world.map.collideWithRectangle(this)) {
            // Destroy this bullet if we hit something
            this.active = false;
            //let destructionRect = new Rectangle(this.x, this.y, 20, 20);
            //destructionRect.center = this.center;
            //world.map.destroyRectangle(destructionRect);
            world.map.destroyCircle(this.center.x, this.center.y, 10);
        }
    }

    moveUntilCollision(world, movement) {
        while (movement.x >= 1 || movement.x <= 1
               && world.map.collideWithRectangle(this)) {
            let direction = movement.x >= 1 ? 1 : -1;
            this.x += direction;
            movement.x -= direction;
        }
        while (movement.y >= 1 || movement.y <= 1
               && world.map.collideWithRectangle(this)) {
            let direction = movement.y >= 1 ? 1 : -1;
            this.y += direction;
            movement.y -= direction;
        }
    }

    /**
     * Draw the bullet.
     *
     * @param {CanvasRenderingContext2D} ctx - The context to draw to
     */
    draw(ctx){
        this.animations[this.facing].drawFrame(.17, ctx, this.x, this.y, 0.9);

        ctx.fillStyle = "white";
        ctx.strokeRect(this.x, this.y, 16, 16);

    }
    loadAnimations() {
      for (var j = 0; j < 2; j++) { //facing
        this.animations.push([]);
      }
      //buffer padding current build =
      //facing right = 0,
      this.animations[0] = new Animator(this.spritesheet, 70, 74, 20, 9, 1, 0.5, null, false, true);

      //facing left = 1,
      this.animations[1] = new Animator(this.spritesheet, 102, 74, 12, 14, 1, 0.5, null, false, true);

    }
}
