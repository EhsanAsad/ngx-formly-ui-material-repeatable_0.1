export interface PaymentScheduleFields {
  payment_date: string;
  value: number;
}

export type PaymentScheduleModel = {
  payment_schedules: {
    [key: string]: PaymentScheduleFields[];
  };
};
