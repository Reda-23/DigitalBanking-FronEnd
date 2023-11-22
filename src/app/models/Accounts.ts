export interface BankAccount {
  accountId: string
  balance: number
  page: number
  size: number
  totalPages: number
  operationDTOS: Operations[]
}

export interface Operations {
  id: number
  date: string
  amount: number
  type: string
  description: string
}
