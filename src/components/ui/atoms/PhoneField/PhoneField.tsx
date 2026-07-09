'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/dist/css/intlTelInput.css';
import { cn } from '@/lib/utils';
import styles from './PhoneField.module.css';

interface PhoneFieldProps {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  errorMessage?: string;
}

const PhoneField = forwardRef<HTMLInputElement, PhoneFieldProps>(function PhoneField(
  {
    id,
    name,
    label,
    placeholder = 'Enter number',
    required,
    wrapperClassName,
    labelClassName,
    inputClassName,
    value,
    onChange,
    onBlur,
    errorMessage,
  },
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const itiRef = useRef<ReturnType<typeof intlTelInput> | null>(null);
  const onChangeRef = useRef(onChange);

  onChangeRef.current = onChange;

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  useEffect(() => {
    if (!inputRef.current) return;

    itiRef.current = intlTelInput(inputRef.current, {
      initialCountry: 'in',
      separateDialCode: true,
      loadUtils: () => import('intl-tel-input/utils'),
    });

    const updateAttributes = () => {
      const countryData = itiRef.current?.getSelectedCountryData();
      if (inputRef.current && countryData) {
        inputRef.current.setAttribute('data-dial-code', countryData.dialCode || '');
        inputRef.current.setAttribute('data-country-code', countryData.iso2 || '');
      }
    };

    const emitValue = () => {
      const phoneValue = itiRef.current?.getNumber() || inputRef.current?.value || '';
      updateAttributes();
      onChangeRef.current?.(phoneValue);
    };

    inputRef.current.addEventListener('input', emitValue);
    inputRef.current.addEventListener('countrychange', emitValue);

    if (value) {
      itiRef.current.setNumber(value);
    }
    updateAttributes();

    return () => {
      inputRef.current?.removeEventListener('input', emitValue);
      inputRef.current?.removeEventListener('countrychange', emitValue);
      itiRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (!itiRef.current) {
      return;
    }

    if (!value) {
      if (inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.removeAttribute('data-dial-code');
        inputRef.current.removeAttribute('data-country-code');
      }
      return;
    }

    const currentNumber = itiRef.current.getNumber();
    if (currentNumber !== value) {
      itiRef.current.setNumber(value);
      const countryData = itiRef.current.getSelectedCountryData();
      if (inputRef.current && countryData) {
        inputRef.current.setAttribute('data-dial-code', countryData.dialCode || '');
        inputRef.current.setAttribute('data-country-code', countryData.iso2 || '');
      }
    }
  }, [value]);

  return (
    <div className={cn('fieldGroup', wrapperClassName)}>
      <label htmlFor={id} className={cn('label', labelClassName)}>
        {label}
        {required && <span className={cn('required')}> *</span>}
      </label>
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="tel"
        placeholder={placeholder}
        required={required}
        className={cn(styles.input, inputClassName, errorMessage && styles.inputError)}
        onBlur={onBlur}
      />
      {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
    </div>
  );
});

export default PhoneField;
