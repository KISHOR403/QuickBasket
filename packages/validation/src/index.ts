import { z } from 'zod';

export const pincodeSchema = z.object({
  pincode: z
    .string()
    .min(6, 'Pincode must be 6 digits')
    .max(6, 'Pincode must be 6 digits')
    .regex(/^[1-9][0-9]{5}$/, 'Enter a valid 6-digit Indian Pincode'),
});

export const otpSchema = z.object({
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  otp: z
    .string()
    .length(4, 'OTP must be 4 digits')
    .optional(),
});

export const addressSchema = z.object({
  type: z.enum(['home', 'work', 'other']),
  label: z.string().optional(),
  flatNo: z.string().min(1, 'Flat / House / Floor No. is required'),
  building: z.string().min(1, 'Building / Apartment Name is required'),
  area: z.string().min(3, 'Area / Sector / Locality is required'),
  landmark: z.string().optional(),
  city: z.string().min(2, 'City name is required'),
  pincode: z
    .string()
    .regex(/^[1-9][0-9]{5}$/, 'Valid 6-digit Pincode required'),
  isDefault: z.boolean().default(false),
});

export const checkoutSchema = z.object({
  addressId: z.string().min(1, 'Please select a delivery address'),
  paymentMethod: z.enum(['upi', 'card', 'netbanking', 'cod']),
  deliverySlotId: z.string().min(1, 'Please select a delivery slot'),
  deliveryNotes: z.string().max(200, 'Notes max 200 characters').optional(),
  tipAmount: z.number().nonnegative().default(0),
});

export type PincodeInput = z.infer<typeof pincodeSchema>;
export type OtpInput = z.infer<typeof otpSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
