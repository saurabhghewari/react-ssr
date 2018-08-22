/*
* App level configuration file.
*
*/

// ENV variable from process object
const env = process.env;

export default {
	port : env.PORT || 8080,
	nodeEnv : env.NODE_ENV || 'development',
	logMessage : function(message) {
		console.log("*********************");
		console.info(message);
		console.log("*********************");
	},
	host: env.HOST || '0.0.0.0',
	get serverUrl() {
		return `http://${this.host}:${this.port}`;
	}
}