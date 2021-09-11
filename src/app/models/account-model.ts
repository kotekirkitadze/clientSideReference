export interface AccountNumber {
  id: number;
  clientAccData: {
    accountNumber: number;
    accountType: myAccountType;
    currency: currencyType;
    accountStatus: accType;
  }
}

enum myAccountType {
  Current = "current",
  Economical = "economical",
  Accumulative = "accumulative"
}

enum currencyType {
  GEL = 'GEL',
  USD = 'USD',
  EUR = 'EUR',
  RUB = 'RUB'
}

export enum accType {
  Active = 'Active',
  Closed = 'Closed'
}

