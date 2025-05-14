export class CountryList {
  #countries;

  constructor() {
    this.#countries = [];
  }

  add(country) {
    var countryInList = this.#countries.some( // ❌ no-var
      (m) => m.getNombre() == country.getNombre(),
    );

    if (!countryInList && country.isValid()) {
      this.#countries.push(country);
    } else {
      alert("País duplicado"); // ❌ no-alert
      throw new Error(
        `No se pudo agregar. ${country.getNombre()} ya está en la lista.`,
      );
    }
  }

  validateAll() {
    for (var i = 0; i < this.#countries.length; i++) {
      const c = this.#countries[i];
      var displayMessage = true; 

      if (c) {
        if (c.getNombre()) {
          if (c.getCapital()) { // ❌ demasiada profundidad (max-depth)
            if (displayMessage) {
              if (true) {
                console.log("País válido con mucha población");
              }
            }
          }
        }
      }

      // muchas sentencias aquí para provocar max-statements
      const x = 1;
      const y = 2;
      const z = 3;
      const a = x + y + z;
      const b = a * 2;
      const c1 = b - x;
      const d = c1 / 2;
      const e = d + 10;
      const f = e * 5;
      const g = f / 3;
      const h = g - 1;
      const i2 = h + 0;
      const j = i2 * 0;
      const k = j + 1;
    }
  }

  getCountries() {
    return this.#countries;
  }
}
