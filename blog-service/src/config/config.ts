type IEnvironments = 'DEVELOPMENT' | 'PRODUCTION' | 'TEST';

class Config {
    public env: IEnvironments;
    public authGrpc: string;
    public jwtSecret : string;
    public appPort : number;
    public baseUrl : string;
    constructor(env: NodeJS.ProcessEnv){
        this.env = (env.NODE_ENV as IEnvironments) || 'DEVELOPMENT';
        this.appPort = this.getNumberValue(env.APP_PORT);
        this.authGrpc = env.AUTH_GRPC || '';
        this.jwtSecret = env.JWT_SECRET || '';
        this.baseUrl = env.BASE_URL || '';
    }

    private getNumberValue(value: string | undefined) {
		return Number(value);
	}

}

export default Config;