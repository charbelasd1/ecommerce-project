export interface Order {
  id: string;
  date: string;
  customer: string;
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
}