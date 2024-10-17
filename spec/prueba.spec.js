describe("demo", function () {
  it("Este test debe pasar siempre", function () {
    expect(4 + 2).toBe(6);
  });
});

describe("Este es mi primer grupo de test", () => {
  it("El numero 2 debe ser igual al numero 2", () => {
    expect(2).toEqual(2);
  });
});

const sumar = (a, b) => a + b;

describe("La funcion sumar", () => {
  it("Debe estar definida", () => {
    expect(sumar).toBeDefined();
  });
});

// class Activity {
//   constructor(id, title, description, imgUrl) {
//     this.id = id;
//     this.title = title;
//     this.description = description;
//     this.imgUrl = imgUrl;
//   }
// }

// class Repository {
//   constructor() {
//     this.activities = [];
//   }

//   addActivity({ title, description, imgUrl }) {}

//   removeActivity(id) {}

//   getActivity() {
//     return this.activities;
//   }
// }
