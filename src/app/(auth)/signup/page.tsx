'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// i18n
import { useTranslations } from 'next-intl';
// Hooks
import useDirection from '@/hooks/useDirection';
// Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// Pages
import SignupPage from '@/pages/auth/signup/signup.page';
import PersonalPage from '@/pages/auth/signup/personal.page';
import CompanyPage from '@/pages/auth/signup/company.page';
import ActivationPage from '@/pages/auth/signup/activation.page';
import { useActivationForm } from '@/modules/auth/useSignUpForm';

export default function Signup() {
  const { direction } = useDirection();

  const [step, setStep] = useState<number>(0);
  const [stepDirection, setStepDirection] = useState<number>(1); // 1 = forward, -1 = backward

  const { t, descriptionText } = useActivationForm();

  const nextStep = (): void => {
    setStepDirection(1);
    setStep((prev) => prev + 1);
  };

  const goToStep = (target: number): void => {
    setStepDirection(target > step ? 1 : -1);
    setStep(target);
  };

  const personalSteps = [
    <SignupPage key="signup" onNext={nextStep} onBack={() => goToStep(0)} />,
    <PersonalPage key="signupPersonal" onNext={nextStep} onBack={() => goToStep(0)} />,
    <ActivationPage key="activation" onBack={() => goToStep(0)} />,
  ];

  const companySteps = [
    <SignupPage key="signup" onNext={nextStep} onBack={() => goToStep(0)} />,
    <CompanyPage key="signupCompany" onNext={nextStep} onBack={() => goToStep(0)} />,
    <ActivationPage key="activation" onBack={() => goToStep(0)} />,
  ];

  return (
    <Tabs dir={direction} defaultValue="personal" className="w-full">
      {step === 0 || step === 1 ? (
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{t('signup')}</h1>
          <p className="text-muted-foreground w-full text-sm">{t('signupDescription')}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{t('activateCode')}</h1>
          <p className="text-muted-foreground w-full text-sm">{descriptionText}</p>
        </div>
      )}

      <TabsList className="bg-transparent grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="personal" disabled={step !== 0}>
          {t('personal')}
        </TabsTrigger>
        <TabsTrigger value="company" disabled={step !== 0}>
          {t('company')}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="personal">
        <AnimatePresence mode="wait" initial={false} custom={stepDirection}>
          <motion.div
            key={step}
            custom={stepDirection}
            initial={{ x: stepDirection === 1 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: stepDirection === 1 ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {personalSteps[step]}
          </motion.div>
        </AnimatePresence>
      </TabsContent>

      <TabsContent value="company">
        <AnimatePresence mode="wait" initial={false} custom={stepDirection}>
          <motion.div
            key={step}
            custom={stepDirection}
            initial={{ x: stepDirection === 1 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: stepDirection === 1 ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {companySteps[step]}
          </motion.div>
        </AnimatePresence>
      </TabsContent>
    </Tabs>
  );
}
