'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Pages
import ForgotEmailForm from '@/pages/auth/password/forgot.email.page';
import ForgotCodeForm from '@/pages/auth/password/forgot.code.page';
import ForgotResetForm from '@/pages/auth/password/forgot.reset.page';

export default function ForgotPassword() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backwarda

  const nextStep = () => {
    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const goToStep = (target: number) => {
    setDirection(target > step ? 1 : -1);
    setStep(target);
  };

  const steps = [
    <ForgotEmailForm key="email" onNext={nextStep} />,
    <ForgotCodeForm key="code" onNext={nextStep} onBack={() => goToStep(0)} />,
    <ForgotResetForm key="reset" onBack={() => goToStep(0)} />,
  ];
  return (
    <AnimatePresence mode="wait" initial={false} custom={direction}>
      <motion.div
        key={step}
        custom={direction}
        initial={{ x: direction === 1 ? 300 : -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: direction === 1 ? -300 : 300, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {steps[step]}
      </motion.div>
    </AnimatePresence>
  );
}
