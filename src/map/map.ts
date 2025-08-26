import { Point, PointWithDirection } from "../Interfaces/Point";
import { TerrainTypes } from "../TerrainTypes";
import { getRandomInt } from "../tools/rand";
import { repeatString } from "../tools/repeatString";

interface MapPoint {
  terrain: TerrainTypes;
  playerIsHere?: boolean;
}

export default class Map {
  private data: MapPoint[][] = [];

  public height;
  public width;

  public location: PointWithDirection;

  constructor(width, height) {
    for (let y = 0; y < height; y++) {
      this.data[y] = new Array(width);
    }

    this.width = width;
    this.height = height;

    // todo: move this to player?
    this.location = {
      x: 0,
      y: 0,
      facing: "right",
    };
  }

  public evaluateSpawn(): Point {
    // todo add random spawn
    let spawn: MapPoint;

    do {
      this.location = {
        x: getRandomInt(0, this.width - 1),
        y: getRandomInt(0, this.height - 1),
        facing: "right",
      };

      spawn = this.getAt(this.location.x, this.location.y);
    } while (spawn.terrain !== TerrainTypes.Earth);

    // mark spawn point
    this.safeWrite(this.location.x, this.location.y, TerrainTypes.Spawn);

    return this.location;
  }

  public print() {
    const b = `+${repeatString("-", this.data[0].length * 2 - 1)}+`;

    console.log(b);

    for (let row of this.data) {
      console.log(`|${row.map((e) => e.terrain).join("|")}|`);
    }

    console.log(b);
  }

  public getAt(x, y): MapPoint {
    return this.data[y][x];
  }

  public move(direction: string): {
    hasMoved: boolean;
    terrain?: TerrainTypes;
  } {
    const newLoc: PointWithDirection = Object.assign({}, this.location);

    switch (direction) {
      case "left":
        newLoc.x--;
        newLoc.facing = "left";
        break;
      case "right":
        newLoc.x++;
        newLoc.facing = "right";
        break;
      case "up":
        newLoc.y--;
        break;
      case "down":
        newLoc.y++;
        break;
    }

    const mapAtNewLocation = this.getAt(newLoc.x, newLoc.y);
    if (mapAtNewLocation.terrain === TerrainTypes.Void) {
      return {
        hasMoved: false,
      };
    }

    this.location = newLoc;

    return {
      hasMoved: true,
      terrain: mapAtNewLocation.terrain,
    };
  }

  public getViewport(size = 16) {
    if (size % 2 > 0) {
      throw new Error("Size has to be power of 2");
    }

    const h = Math.round(size / 2);

    let yl = this.location.y - h;
    let yh = this.location.y + h;

    let xl = this.location.x - h;
    let xh = this.location.x + h;

    if (xh > this.width) {
      xh = this.width;
      xl = this.width - size;
    }

    if (xl < 0) {
      xl = 0;
      xh = size;
    }

    if (yh > this.height) {
      yh = this.height;
      yl = this.height - size;
    }

    if (yl < 0) {
      yl = 0;
      yh = size;
    }

    const viewport: MapPoint[][] = [];
    let yy = 0;

    for (let y = yl; y < yh; y++) {
      viewport[yy] = [];

      for (let x = xl; x < xh; x++) {
        const mapEntry: MapPoint = Object.assign({}, this.getAt(x, y));

        if (this.location.x === x && this.location.y === y) {
          mapEntry.playerIsHere = true;
        }

        viewport[yy].push(mapEntry);
      }

      yy++;
    }

    if (viewport[0].length !== h * 2 || viewport.length !== h * 2) {
      console.error("unexpected viewport length");
    }

    return viewport;
  }

  public safeWrite(x, y, type: TerrainTypes, verbose: Boolean = false) {
    if (x < 0 || x > this.width - 1 || y < 0 || y > this.height - 1) {
      return;
    }

    if (verbose) {
      console.log("writing", x, y);
    }

    if (!this.data[y][x]) {
      this.data[y][x] = {} as MapPoint;
    }

    // nothing can overwrite the void
    if (this.data[y][x].terrain === TerrainTypes.Void) {
      return;
    }

    this.data[y][x].terrain = type;
  }
}
