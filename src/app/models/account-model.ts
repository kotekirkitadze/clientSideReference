export interface AccountNumber {
  accountNumber: number;
  clientNumber: number;
  accountType: myAccountType;
  currency: currencyType;
  accountStatus: accType;
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

enum accType {
  Active = 'Active',
  Closed = 'Closed'
}
