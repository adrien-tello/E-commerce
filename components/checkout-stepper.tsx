'use client';

import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description?: string;
}

interface CheckoutStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function CheckoutStepper({ steps, currentStep, onStepClick }: CheckoutStepperProps) {
  return (
    <div className="bg-white rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            {/* Step circle */}
            <button
              onClick={() => onStepClick?.(step.id)}
              className={`relative w-12 h-12 rounded-full flex items-center justify-center font-bold text-white transition ${
                currentStep > step.id
                  ? 'bg-green-500'
                  : currentStep === step.id
                  ? 'bg-orange-500 ring-4 ring-orange-200'
                  : 'bg-gray-300'
              }`}
            >
              {currentStep > step.id ? (
                <Check size={24} />
              ) : (
                step.id
              )}
            </button>

            {/* Step title */}
            <div className="ml-3 flex-1">
              <p className={`font-semibold ${currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'}`}>
                {step.title}
              </p>
              {step.description && (
                <p className="text-sm text-gray-600">{step.description}</p>
              )}
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={`h-1 flex-1 mx-2 rounded transition ${
                  currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
