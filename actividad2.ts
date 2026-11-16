class CuentaBancaria {
    // 'readonly' hace que esta variable se asigne en el constructor y quede congelada para siempre
    // Es pública para que cualquiera pueda saber el nombre del dueño, pero nadie lo puede cambiar
    public readonly titular: string; 
    
    // ningún código que esté fuera de las llaves de esta clase puede leerlas ni modificarlas (private)
    private saldo: number;
    private historial: string[]; 

    constructor(titular: string, montoInicial: number) {
        this.titular = titular;
        this.saldo = montoInicial;
        // inicializo el array privado con su primer elemento
        this.historial = [`Apertura de cuenta con: +${montoInicial}`];
    }


    public depositar(monto: number): void {  // el tipo ': void' significa "vacío", inndica que este método realiza una acción pero no devuelve ningún valor.
        if (monto <= 0) {
            throw new Error("El monto a depositar tiene que ser mayor a $0.");
        }
        this.saldo += monto; //si pasa el filtro, se modifica la variable privada de forma segura
        this.historial.push(`depósito: +${monto}`); //se registra el movimiento 
    }

    public retirar(monto: number): void {
        if (monto <= 0) {
            throw new Error("El monto a retirar tiene que ser mayor a $0.");
        }
        if (monto > this.saldo) {
            throw new Error("Fondos insuficientes. No podés sacar más de lo que tenés.");
        }
        this.saldo -= monto;
        this.historial.push(`retiro: -${monto}`);
    }

    // Como 'saldo' no se puede leer directamente desde afuera, armamos este método puente
    // que solo devuelve el número, permitiendo consultar el estado sin dar permisos de escritura.

    //este es un metodo puente que es para que devuekta solamente el numero, para poder consultar el estado sin dar permisos 
    public consultarSaldo(): number {
        return this.saldo;
    }

    // ¡Cuidado acá! Si devolvemos 'this.historial' directamente, JavaScript comparte la "referencia" en memoria.
    // Eso permitiría que alguien desde afuera use un .push() y altere nuestro historial privado.

    //si se devuelve directamente this.historial se corre el riesgo de que desde afuera alguien altere e historial privado (usando un .push(), por ejemplo)
    public obtenerHistorial(): string[] {
        //para que eso no pase, utiliz el spread para crear una copia identica en vez de usarlo directamente
        return [...this.historial]; 
    }
}

try {
    console.log("\n--- Probando Ejercicio 2 ---");
    const miCuenta = new CuentaBancaria("Sofía", 5000);
    
    miCuenta.depositar(2000); 
    miCuenta.retirar(1000);
    console.log(`Saldo actual de ${miCuenta.titular}: $${miCuenta.consultarSaldo()}`); 


    const historialClonado = miCuenta.obtenerHistorial();
    historialClonado.push("depósito fantasma: +999999"); 

    console.log("Historial real en el banco:", miCuenta.obtenerHistorial()); 
    
    miCuenta.retirar(15000); 
} catch (error: any) {
    console.log("Alerta del banco:", error.message);
}