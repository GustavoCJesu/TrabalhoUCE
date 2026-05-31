export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NetworkError extends AppError {
  constructor() {
    super('Não foi possível conectar. Verifique sua internet.');
  }
}

export class InvalidCredentialsError extends AppError {
  constructor() {
    super('Credenciais invalidas. Por favor verifique-as');
  }
}

export class UnexpectedError extends AppError {
  constructor(){
    super('Algo deu errado. Tente novamente.')
  }
}

export class ValidationError extends AppError {
    
}

export class UnauthorizedError extends AppError {
  constructor(){
    super('Sessão expirada, faça o login novamente.')
  }
}

