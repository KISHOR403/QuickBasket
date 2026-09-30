# 🛡️ Data Validation Schemas (`@quickbasket/validation`)

The `@quickbasket/validation` package defines standard input validation schemas using **Zod**. These schemas ensure data integrity at application boundaries (forms, checkout inputs, and API payloads) across web and mobile apps.

---

## 📜 Schemas & Validation Rules

### 1. Indian Pincode Validation (`pincodeSchema`)
Validates 6-digit postal codes according to Indian postal guidelines (cannot start with 0):

```typescript
export const pincodeSchema = z.object({
  pincode: z
    .string()
    .min(6, 'Pincode must be 6 digits')
    .max(6, 'Pincode must be 6 digits')
    .regex(/^[1-9][0-9]{5}$/, 'Enter a valid 6-digit Indian Pincode'),
});
```

### 2. Phone & OTP Authentication (`otpSchema`)
Validates standard 10-digit Indian mobile numbers (starting with 6-9) and optional 4-digit OTP verification:

```typescript
export const otpSchema = z.object({
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  otp: z
    .string()
    .length(4, 'OTP must be 4 digits')
    .optional(),
});
```

### 3. Delivery Address Form (`addressSchema`)
Validates street, building, city, and tag information for home/office deliveries:

```typescript
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
```

### 4. Express Checkout Form (`checkoutSchema`)
Ensures mandatory address selection, payment method selection, delivery slot selection, and non-negative rider tips:

```typescript
export const checkoutSchema = z.object({
  addressId: z.string().min(1, 'Please select a delivery address'),
  paymentMethod: z.enum(['upi', 'card', 'netbanking', 'cod']),
  deliverySlotId: z.string().min(1, 'Please select a delivery slot'),
  deliveryNotes: z.string().max(200, 'Notes max 200 characters').optional(),
  tipAmount: z.number().nonnegative().default(0),
});
```

---

## 🎯 React Hook Form Integration

Schemas directly integrate with `react-hook-form` via `@hookform/resolvers/zod`:

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressSchema, AddressInput } from '@quickbasket/validation';

export function AddressForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressInput>({
    resolver: zodResolver(addressSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('flatNo')} placeholder="Flat / House No" />
      {errors.flatNo && <p className="text-red-500">{errors.flatNo.message}</p>}
      <button type="submit">Save Address</button>
    </form>
  );
}
```
