import express, { Application } from 'express'

export class App {
    private app: Application

    constructor(private port?: number | string){
        this.app = express()
        this.settings()
    }

    settings(){
        this.app.set('port', this.port ||  3000)
    }

    async listen(){
        await this.app.listen(this.app.get('port'))
        console.log('Server on port', this.app.get('port'))
    }
}