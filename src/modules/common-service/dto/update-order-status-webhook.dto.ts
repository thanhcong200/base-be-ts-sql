import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateOrderStatusFromWebhookDto {
  @IsNotEmpty()
  @IsString()
  order_id: string;

  @IsOptional()
  @IsString()
  payment_intent_id: string;

  @IsOptional()
  @IsString()
  paypal_transaction_id: string;
}
