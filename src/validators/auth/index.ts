import { z } from 'zod';
import handleCountryPhoneError from '@/lib/countryPhoneValid';

// Email validation schema
const emailSchema = z
  .string()
  .trim() // Remove extra spaces from input
  .email({ message: 'invalidEmailFormat' }) // Custom error message for invalid email format
  .min(5, { message: 'emailTooShort' }) // Min length of 5 characters for email
  .max(255, { message: 'emailTooLong' }); // Max length of 255 characters for email

// User name validation schema
const userNameSchema = z
  .string()
  .trim() // Remove extra spaces from input
  .regex(/^[a-z](?:[a-z0-9_]+)*$/, { message: 'invalidUserNameFormat' }) // Valid username format
  .min(3, { message: 'userNameTooShort' }) // Min length of 3 characters for username
  .max(20, { message: 'userNameTooLong' }); // Max length of 20 characters for username

// Password validation schema
const passwordSchema = z
  .string()
  .trim() // Remove extra spaces from input
  .nonempty({ message: 'passwordEmptyError' }) // Ensure password is not empty
  .min(6, { message: 'password6CharactersError' }) // Min length of 6 characters
  .max(255, { message: 'passwordTooLongError' }) // Max length of 255 characters
  .regex(/^(?=.*[A-Z])/, { message: 'passwordRequiresUppercase' }) // Must contain at least one uppercase letter
  .regex(/^(?=.*[a-z])/, { message: 'passwordRequiresLowercase' }) // Must contain at least one lowercase letter
  .regex(/^(?=.*\d)/, { message: 'passwordRequiresNumber' }) // Must contain at least one number
  .regex(/^(?=.*[!@#$%^&*(),.?":{}|<>])/, { message: 'passwordRequiresSpecialChar' }) // Must contain at least one special character
  .regex(/^\S*$/, { message: 'passwordNoSpacesAllowed' }); // No spaces

// Phone validation schema
const phoneSchema = z.string().refine(
  async (value) => {
    try {
      // Async phone validation
      const isValid = await handleCountryPhoneError(value);
      return isValid; // returns true or false based on phone validation
    } catch (e) {
      return false; // In case of an error, return false
    }
  },
  { message: 'invalidPhoneNumber' } // Custom error message for invalid phone number
);

// First name validation: must be between 2 and 30 characters, allows letters (both English and Arabic) and spaces
const firstnameSchema = z
  .string()
  .min(2, { message: 'firstnameTooShort' }) // Min length of 2 characters
  .max(30, { message: 'firstnameTooLong' }) // Max length of 30 characters
  .regex(/^[a-zA-Z\u0621-\u064A\s]+$/, { message: 'firstnameFormatError' }); // Allows letters (English & Arabic) and spaces

// Last name validation: must be between 2 and 30 characters, allows letters (both English and Arabic) and spaces
const lastnameSchema = z
  .string()
  .min(2, { message: 'lastnameTooShort' }) // Min length of 2 characters
  .max(30, { message: 'lastnameTooLong' }) // Max length of 30 characters
  .regex(/^[a-zA-Z\u0621-\u064A\s]+$/, { message: 'lastnameFormatError' }); // Allows letters (English & Arabic) and spaces

const companyNameSchema = z
  .string()
  .nonempty({ message: 'companynameEmptyError' })
  .min(3, { message: 'companynameTooShortError' }) // Message for short company name
  .max(20, { message: 'companynameTooLongError' }) // Message for long company name
  .regex(/^[A-Za-z][A-Za-z0-9_ ]*$/, { message: 'companynameFormatError' }); // Invalid format

const dateSchema = z
  .string()
  .min(1, { message: 'requiredDate' }) // Check if the date is provided
  .refine((val) => !isNaN(Date.parse(val)), {
    message: 'invalidDate', // Validate if the date is a valid date format
  })
  .refine((val) => new Date(val) <= new Date(), {
    message: 'futureDate', // Ensure the birthdate is not in the future
  });

const birthdaySchema = z
  .string()
  .min(1, { message: 'requiredDate' }) // Check if the date is provided
  .refine((val) => !isNaN(Date.parse(val)), {
    message: 'invalidDate', // Validate if the date is a valid date format
  })
  .refine((val) => new Date(val) <= new Date(), {
    message: 'futureDate', // Ensure the birthdate is not in the future
  })
  .refine(
    (val) => {
      const birthDate = new Date(val);
      const minAge = 13;
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear(); // Calculate age

      // If age is more than 13, it's valid. If exactly 13, ensure the Date is before today
      return age > minAge || (age === minAge && today >= new Date(birthDate.setFullYear(today.getFullYear())));
    },
    {
      message: 'ageRestriction', // Ensure user is at least 13 years old
    }
  );

const activationCodeSchema = z
  .string()
  .nonempty({ message: 'EmptyError' }) // Code cannot be empty
  .length(6, { message: '6CharactersError' }) // Code must be exactly 6 characters long
  .regex(/^\d+$/, { message: 'NumberError' }); // Code must contain only digits

export { emailSchema, userNameSchema, passwordSchema, phoneSchema, firstnameSchema, lastnameSchema, companyNameSchema, dateSchema, birthdaySchema, activationCodeSchema };
