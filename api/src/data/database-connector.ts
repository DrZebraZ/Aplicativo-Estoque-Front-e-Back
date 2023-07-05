import 'dotenv/config'
import mysql from 'mysql2/promise';
import { localhost } from '../main';

class DatabaseConnector {
	pool: mysql.Pool | any = ''
	connection: mysql.Connection | any = ''

	async configurePool() {
		try{
			let connectionLimit: number = +(process.env.DATABASE_CONNECTION_LIMIT || 2)
			const config:any = {
				host: localhost,
				port: process.env.DATABASE_PORT,
				user: process.env.DATABASE_USER,
				password: process.env.DATABASE_PASSWORD,
				database: process.env.DATABASE_NAME,
				connectionLimit: connectionLimit
			};

			const pool = mysql.createPool(config);
			this.pool = pool
		}catch(e){
			console.log(e)
		}
		
	}

	handleDisconnect() {
		this.pool.on('error', (err) => {
			if (err.code === 'PROTOCOL_CONNECTION_LOST') {
				console.log('Conexão com o banco de dados foi perdida. Tentando reconectar...');
				this.configurePool();
			} else if (err.code === 'ETIMEDOUT') {
				console.log('Timeout de conexão. Tentando reconectar...');
				this.configurePool();
			} else {
				console.log(err);
			}
		});
	}

	async getConnection():Promise<mysql.PoolConnection>{
		if (!this.pool){
			console.log("NO POOL")
			await this.configurePool()
		}
		if (!this.connection){
			console.log("NO CONN")
			let connection = await this.pool.getConnection();
			this.connection = connection
			this.handleDisconnect()
		}
		return this.connection;
	};

	async closeConn() {
		try{
			if (this.connection){
				console.log("Release conn")
				this.connection.release()
			}
			if (this.pool){
				console.log("Release pool")
				this.pool.end()
			}
			this.connection = ''
			this.pool = ''
		}catch(e){
			console.log(e)
		}
		
	}
}

export default DatabaseConnector;
