

export class Empleado {
    // 'protected' es el secreto familiar. Funciona igual que 'private' (invisible para el exterior), 
    //protected funciona igual que private con la diferencia de que las clases que se hereden de esta clase si tienen permiso para usar estas variables 
    protected nombre: string;
    protected antiguedad: number; 

    constructor(nombre: string, antiguedad: number) {
        this.nombre = nombre;
        this.antiguedad = antiguedad;
    }

    // La clase base 'Empleado' es genérica, no sabe cómo calcula el sueldo cada tipo de trabajador del mundo real.
    // Por eso, devuelve 0 por defecto. Cada clase hija se encargará de reescribir esta lógica.

    //acá, la clase base es genperica, devuelvo 0 por defecto, asi, cada clase hija se encargará de reescribir la lógica
    public calcularSueldo(): number {
        return 0; 
    }

    // Este método es una genialidad de la POO. Al usar 'this.calcularSueldo()', cuando una clase hija ejecute 
    // el método 'describir()', la máquina buscará dinámicamente el sueldo de la hija, no el 'return 0' de acá arriba.

    //este metodo lo que hace es "unir" los datos (en este claso de los empleados) para poder mostrarlos despues (cuando se usa el this, va a buscar ese en especifico)
    public describir(): string {
        return `${this.nombre} (${this.antiguedad} años de antigüedad) — sueldo: $${this.calcularSueldo()}`;
    }
}

//con extends lo que hago es que EpleadoFijo se apropia de todo lo que tiene Empleado (herencia)
export class EmpleadoFijo extends Empleado {
    private sueldoBase: number; //y esta es una variable propia y exclusiva de los empleados fijos

    constructor(nombre: string, antiguedad: number, sueldoBase: number) {
        // 'super()' es una función especial que llama al constructor de la clase padre (Empleado).
        // Es OBLIGATORIO usarla porque el padre necesita recibir el nombre y la antigüedad para guardarlos en sus variables.

        //con super se llama al constructos de la clase padre, es obligatorio usar esta funcion porque el padre (Empleado) necesita recibir el nombre y la antigüedad para poder guardarlos en sus variables 
        super(nombre, antiguedad); 

        //una vez que ya se configuró el padre, se guarda el dato propio de la hija
        this.sueldoBase = sueldoBase; 
    }

    // SOBREESCRITURA (Override): Volvemos a escribir un método que ya existía en el padre 
    // para reemplazar por completo su comportamiento original (el 'return 0') por la fórmula matemática de esta subclase.

    //acá reemplazo el comportaminento original del calculo de sueldo por la fórmula de esta subclase 
    public calcularSueldo(): number {
        const bonoAntiguedad = this.sueldoBase * 0.02 * this.antiguedad;
        return this.sueldoBase + bonoAntiguedad;
    }
}

console.log("\n--- Probando Ejercicio 3 ---");
const juan = new EmpleadoFijo("Juan", 3, 50000);
console.log(juan.describir()); 