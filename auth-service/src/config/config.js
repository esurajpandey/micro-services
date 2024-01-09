class Config {
  constructor(env) {
    this.jwtSecret = env?.JWT_SECRET || ''
    this.grpcPort = env?.GRPC_PORT || ''
    this.appPort = env?.APP_PORT || ''
  }
}

export default Config
