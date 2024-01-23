

export const EnvConfiguration = ()=> ({
    //esta avriable nos dice si eestamos en produccion, testing, o desarrollo
    environment: process.env.NODE_ENV || "dev", //si no esta, se coloca como dev esta variable de entorno
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3002,
    defaultLimit: +process.env.DEFAULT_LIMIT || 7
})

/*
    Lo de arriba es lo mismo que

    const envFb = () => {
        return {

        }
    }

*/