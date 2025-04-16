export interface TransactionItem {
  id: number;
  laptop_id: number;
  price: number;
  name: string;
  category: string;
}

export interface Transaction {
  transaction_id: number;
  total_amount: number;
  created_at: string;
  items: TransactionItem[];
}

export interface TransactionResponse {
  status: string;
  data: Transaction[];
}
