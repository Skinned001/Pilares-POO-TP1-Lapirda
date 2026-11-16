import { Empleado, EmpleadoFijo } from '../4-pilares-POO/ej3.ts';
import { Empleado, EmpleadoFijo } from './actividad3.ts';

//nueva clase hija que hereda de Empleado
class EmpleadoPorHoras extends Empleado {
    private horasTrabajadas: number;
    private valorHora: number;

    constructor(nombre: string, antiguedad: number, horasTrabajadas: number, valorHora: number) {
        //se mandan los datos obligatorios al constructor del padre
        super(nombre, antiguedad); 
        this.horasTrabajadas = horasTrabajadas;
        this.valorHora = valorHora;
    }

    //se sobreescribe el metodo con la logica de pago por hora 
    public calcularSueldo(): number {
        return this.horasTrabajadas * this.valorHora;
    }
}

//otra clase que hereda de empleado
class EmpleadoPorComision extends Empleado {
    private ventasDelMes: number;
    private porcentajeComision: number;

    constructor(nombre: string, antiguedad: number, ventasDelMes: number, porcentajeComision: number) {
        super(nombre, antiguedad);
        this.ventasDelMes = ventasDelMes;
        this.porcentajeComision = porcentajeComision;
    }

    //comision por ventas
    public calcularSueldo(): number {
        return this.ventasDelMes * (this.porcentajeComision / 100);
    }
}

function calcularNomina(empleados: Empleado[]): number {
    let totalAcumulado = 0;
    
    //recorre la lista con un bucle for 
    for (const emp of empleados) {

        //y acá está el polimorfismo, s trata a todas de forma uniforme como si fueran un simple Empleado, como que se confia ciegamente en que, al ser un empleado, responde o coincide con calcularSueldo y se ejecuta
        totalAcumulado += emp.calcularSueldo(); 
    }
    return totalAcumulado;
}

console.log("\n--- Probando Ejercicio 4 ---");

const listaDeEmpresas: Empleado[] = [
    new EmpleadoFijo("Carlos", 5, 100000),       
    new EmpleadoPorHoras("Ana", 2, 160, 500),      
    new EmpleadoPorComision("Luis", 1, 500000, 10)  
];

console.log("Detalle individual de la nómina:");
for (const emp of listaDeEmpresas) {
    // Cada objeto ejecuta el 'describir' heredado pero mostrando su sueldo real polimórfico
    console.log(" ->", emp.describir());
}

// Le pasamos el array mixto a la función global.
const gastoTotal = calcularNomina(listaDeEmpresas);
console.log(`\nCosto total de la nómina a pagar por la empresa: $${gastoTotal}`); // 240000