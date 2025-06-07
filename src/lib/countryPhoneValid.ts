import { PhoneNumberUtil } from 'google-libphonenumber';
import Cookies from 'js-cookie';

const phoneUtil = PhoneNumberUtil.getInstance();

export default async function handleCountryPhoneError(value: string): Promise<boolean> {
  const country = Cookies.get('country') ?? 'US';

  if (!value || typeof value !== 'string') return false;

  let sanitizedValue = value.replace(/\s+/g, '').replace(/[^+\d]/g, '');

  // Convert "00" to "+"
  if (sanitizedValue.startsWith('00')) {
    sanitizedValue = '+' + sanitizedValue.substring(2);
  }

  if (/^[\+|\d]/.test(sanitizedValue)) {
    try {
      const number = phoneUtil.parse(sanitizedValue, country);
      return phoneUtil.isValidNumber(number);
    } catch (error) {
      return false;
    }
  }

  return false;
}
