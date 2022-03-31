let myVar: unknown = 0;
myVar = '1';
myVar = false;

function invokeAnything(callback: any) {
    callback();
}
   
// invokeAnything(1);
// `never` is for things that never happen
function timeout(ms: number): Promise<never> {
    return new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout elapsed")), ms)
    )
}

// union
let union: number | string | boolean = 0;
union = '1';
union = false;

// literal
let foo: 'Hello';

type Direction =
    'Left'
    | 'Right'
    | 'Up'
    | 'Down';

function move(direction: Direction) {
    // ...
}

move('Left')
type OneToFive = 1 | 2 | 3 | 4 | 5;
type Bools = false | true | 1 | 'false' | 'true';

// Tuples
type TupleEx = [boolean, number, string];

var mytuple: TupleEx = [false, 10,"Hello"];
mytuple.push(3);

// Enums
enum EnDirection {
    Up = 3,
    Down,
    Left,
    Right,
  }

enum sDirection {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

// Functions
function invoke(callback: (s: string) => number) {
    console.log(callback('hello'));
}

invoke((s: string) => {
    // this.
    console.log(s);
    return 1;
})

async function invokePromise(callback: Promise<number>) {
    const r = await callback;
    console.log(r);
}

invokePromise(new Promise((resolve, reject) =>
    resolve(5)
))

// REST PARAMETERS
function Greet(greeting: string, ...names: string[]) {
    return greeting + " " + names.join(", ") + "!";
}

console.log(Greet("Hello", "Viewer", "Joris"));

// spread operator
function f(x: number, y: number, z: number) { }
var args: [number, number, number] = [0, 1, 2];
f(...args);

// destructing
var [x, y, ...remaining] = [1, 2, 3, 4];
console.log(remaining); // 1, 2, [3,4]

var list = [1, 2];
list = [...list, 3, 4];
console.log(list); // [1,2,3,4]

const point2d = {x: 1, y: 2};
const point3d = {...point2d, z: 3};

// Nullish Coalescing, stricter than || 
const value = null;

const valueToWorkWith = value ?? 'no value provided';
console.log(valueToWorkWith);

// optional chaining
interface c {
    name: string;
    office?: {
        primary?: {
            city?: string;
            country?: string;
        };
    };
}
const value1 = {
    name: "Perron",
    office: {
      primary: {
        city: "Brussels",
        country: "Belgium"
      }
    }
  }
let city: string | undefined = value1.office.primary.city
console.log(city);
const value2: c = {
    name: "Joris Hermans"
}
city = value2?.office?.primary?.city;
console.log(city);