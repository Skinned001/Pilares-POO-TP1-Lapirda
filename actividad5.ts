class Persona {
    private readonly _dni: string;
    public nombre: string;
    
    private _edad: number = 0;
    private _email: string = "";

    constructor(dni: string, nombre: string) {
        this._dni = dni;
        this.nombre = nombre;
    }

    // Un GETTER es una aduana de salida. Permite LEER la variable privada desde afuera de una forma especial.
    // Fuera de la clase no se usa como una función (no se ponen paréntesis), se lee como si fuera una propiedad común: 'persona.edad'.
    public get edad(): number {
        return this._edad; // Simplemente abre la puerta para sacar el valor privado hacia afuera.
    }

    // Un SETTER es una aduana de entrada. Intercepta el momento exacto en que alguien desde afuera intenta guardar 
    // un dato haciendo 'persona.edad = 25'. Nos permite validar y filtrar que no nos guarden cualquier desastre.
    public set edad(valor: number) {
        if (valor < 0 || valor > 120) {
            throw new Error("Edad imposible. Debe estar entre 0 y 120 años.");
        }
        this._edad = valor;
    }

    // Getter para poder leer el email privado.
    public get email(): string {
        return this._email;
    }

    // Setter para validar la estructura del email antes de guardarlo.
    public set email(valor: string) {
        if (!valor.includes("@")) {
            throw new Error("Formato inválido. Todo email necesita llevar un '@'.");
        }
        this._email = valor;
    }

    // PROPIEDAD CALCULADA (De solo lectura): Fíjate que es un 'get' pero NO tiene un 'set' asociado.
    // Esto significa que nadie puede hacer 'persona.esMayorDeEdad = true'. No guarda espacio en memoria;
    // calcula el valor booleano (true/false) en tiempo real cada vez que alguien lo solicita.
    public get esMayorDeEdad(): boolean {
        return this._edad >= 18;
    }

    // Otro getter de solo lectura diseñado para la seguridad de la información.
    // Nos permite empaquetar y compartir datos aptos para el público sin arriesgar ni exponer datos sensibles como el DNI o el Email.
    public get datosPublicos(): string {
        return `[PÚBLICO] Nombre: ${this.nombre} | Mayor de edad: ${this.esMayorDeEdad ? 'Sí' : 'No'}`;
    }
}

try {
    console.log("\n--- Probando Ejercicio 5 ---");
    const alguien = new Persona("35.123.456", "Agustín");
    
    // GUARDAR DATOS: Parece una asignación directa a una variable, pero por detrás TypeScript
    // está llamando automáticamente a las funciones 'set edad(25)' y 'set email(...)'.
    alguien.edad = 25;       
    alguien.email = "agustin@correo.com"; 

    // LEER DATOS: Parece que leemos variables comunes, pero por detrás se ejecutan los métodos 'get'.
    console.log("Edad cargada:", alguien.edad);
    console.log("¿Es mayor de edad?:", alguien.esMayorDeEdad); // Dispara el get calculado
    console.log(alguien.datosPublicos); // Dispara el filtro de datos públicos

    // Intentamos romper las reglas saltándonos la aduana del setter
    console.log("\nIntentando cambiar el mail por uno inválido...");
    alguien.email = "agustincorreo.com"; // Esto va a fallar y nos tirará al 'catch'

} catch (error: any) {
    console.log("Validación activada:", error.message);
}