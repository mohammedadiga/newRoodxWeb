'use client';
import { useEffect, useState } from 'react';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import Cookies from 'js-cookie';
// API hook to fetch location data
import { useGetIpQuery } from '@/store/api/location.api';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';

export default function useCountryFlag() {
  const { data } = useGetIpQuery();
  const country = useAppSelector((state: RootState) => state.location.country);

  const [countryCode, setCountryCode] = useState('');
  const [showFlag, setShowFlag] = useState(false);
  const [showError, setShowError] = useState(false);
  const [deviceLocale, setDeviceLocale] = useState('US');
  const [phoneUtil, setPhoneUtil] = useState<PhoneNumberUtil | null>(null);

  // useEffect to handle country code and phone utility initialization
  useEffect(() => {
    const locale = country ?? 'US';
    Cookies.set('country', locale, { expires: 7 });
    setDeviceLocale(locale);

    const util = PhoneNumberUtil.getInstance();
    setPhoneUtil(util);
  }, [data?.country, country]);

  // Function to handle user input and display flag based on phone number
  const handleInputShowFlag = async (value: string) => {
    if (!phoneUtil) return;

    let sanitizedValue = value.replace(/\s+/g, '').replace(/[^+\d]/g, '');

    // If the number is too short or contains invalid characters, hide flag and error
    if (sanitizedValue.length <= 1 || /[^\d+]/g.test(value)) {
      setShowFlag(false);
      setShowError(false);
      return;
    }

    // Convert '00' prefix to '+'
    if (sanitizedValue.startsWith('00')) {
      sanitizedValue = '+' + sanitizedValue.substring(2);
    }

    try {
      const number = phoneUtil.parse(sanitizedValue, countryCode);
      const regionCode = phoneUtil.getRegionCodeForNumber(number) || deviceLocale;
      setCountryCode(regionCode);
      setShowFlag(true);

      // Check if the phone number is valid
      if (phoneUtil.isValidNumber(number)) {
        setShowError(false);
      } else {
        setShowError(true);
      }
    } catch (error) {
      setCountryCode(deviceLocale);
      setShowFlag(true);
      setShowError(true);
    }
  };

  // Function to check if the value is a valid email or phone number
  const handleCheckEmailOrPhone = async (value: string) => {
    if (!phoneUtil) return null;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[A-Za-z](?:[A-Za-z0-9_]+)*$/;
    const userData = value.trim().toLowerCase();

    // If the value is a valid email or username, return it
    if (emailRegex.test(userData) || usernameRegex.test(userData)) {
      return userData;
    }

    let sanitizedValue = userData.replace(/\s+/g, '').replace(/[^+\d]/g, '');

    // Convert '00' prefix to '+'
    if (sanitizedValue.startsWith('00')) {
      sanitizedValue = '+' + sanitizedValue.substring(2);
    }

    try {
      const number = phoneUtil.parse(sanitizedValue, deviceLocale);
      return phoneUtil.format(number, PhoneNumberFormat.E164);
    } catch (error) {
      return null;
    }
  };

  // Return necessary data for flag, phone number validation, and country code
  return { countryCode, showFlag, showError, handleInputShowFlag, handleCheckEmailOrPhone };
}
