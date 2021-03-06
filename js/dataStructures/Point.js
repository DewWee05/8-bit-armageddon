/**
 * A point object contains an 'x' and a 'y' 
 */
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Uses euclidion distance to determine the magnitude
   * @param {Point} - the point to add to this point
   */
  get magnitude(){
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Add another point to this point
   * @param {Point} - the point to add to this point
   */
  add(otherPoint) {
    this.x += otherPoint.x;
    this.y += otherPoint.y;
  }

  /**
   * Subtract another point from this point
   * @param {Point} - the point to subtrack from this point
   */
  sub(otherPoint) {
    this.x -= otherPoint.x;
    this.y -= otherPoint.y;
  }
}

