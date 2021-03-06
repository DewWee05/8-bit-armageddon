/**
 *
 */
class TeleportGun extends Projectile {
    /**
     * Constructor for a bullet entity
     * @param {number} x - The starting x position
     * @param {number} y - The starting y position
     * @param {number} angle - The angle of the firing direction
     * @param {number} power - The force with which to fire the
     *                         projectile. higher is further
     */
    constructor(x, y, angle, power) {
        super(x, y, angle, power);

        this.spritesheet = MANAGER.getAsset('./assets/weapons.png');

        this.teleportSprite = new Animator(this.spritesheet, 226, 236, 20, 27, 1, 0.5, null, false, true);
    }

    /**
     * Update the bullet flying through the air.
     *
     * @params {World} - The world object that should be referenced
     * @params {deltaT} - The number of ms since the last update
     */
    update(world, deltaT){
        this.moveUntilCollision(world, this.desiredMovement(deltaT, Wind.x, Wind.y));

        // // update direction/facing
        // if (this.vel.x < 0) this.facing = 1;
        // if (this.vel.x > 0) this.facing = 0;

        //Crate collision
        for(var i = 0; i < world.entities.length; i++) {
          if (world.entities[i] instanceof Crate &&
            ((this.x < (world.entities[i].x + world.entities[i].w)) && (this.x > world.entities[i].x)) &&
            ((this.y > world.entities[i].y) && (this.y < (world.entities[i].y + world.entities[i].h)))) {
              world.currentPlayer.upgraded++;
              world.currentPlayer.opWeaponUnlock++;
              world.entities[i].active = false;
              if (world.currentPlayer.upgraded > 3) {
                world.currentPlayer.upgraded = 1; //reset level
              }
            }
          }

        if (this.y > world.map.height)
        {
          // Destroy this bullet if we hit something
          this.active = false;
        }
        else if (world.map.collideWithRectangle(this)) {
            // Teleports the player where the bullet lands

            // Initial: -50 buffer so the player falls to that position.
            // (prevent player from entering the ground).
            // Problem: Posibility getting stuck inside of a ceiling

            // New problem with loop: leaves loop when top left pixel out of ground
            // But the whole character is still stuck. Have to -character height but
            // only Player.draw() knows the height

            // while loop until no more collide with ground,
            // moves until top left pixel is free
            world.currentPlayer.x = this.x;
            while (world.map.collideWithRectangle(this))
            {
              this.y--;
            }
            // 60 is max height for a player
            world.currentPlayer.y = this.y - 60;
            // Destroy this bullet if we hit something
            this.active = false;
        }
    }

    /**
     * Draw the bullet.
     *
     * @param {CanvasRenderingContext2D} ctx - The context to draw to
     */
    draw(ctx){
        this.teleportSprite.drawFrame(.17, ctx, this.x, this.y, 0.9);
    }


    drawMinimap(world, ctx, mmX, mmY) {
        if ((world.minimap.x <= (mmX + this.x / 7) && (mmX + this.x /7) <= world.minimap.x + world.map.width/7) &&
            (world.minimap.y <= (mmY + this.y / 10) && (mmY + this.y / 10) <= world.minimap.y + world.map.height / 10)) {
            this.teleportSprite.drawFrame(.17, ctx, mmX + this.x / 7, mmY + this.y / 10, 0.5);
        }
    }

}
