'use client'
import React, { useState } from 'react';
import { Dices } from 'lucide-react';
import { slotMakerConfig } from '@/config/site';
import { t } from '@lingui/macro'

export const SlotMachine: React.FC<{
}> = () => {
  const [currentValues, setCurrentValues] = useState<string[]>(
    slotMakerConfig.map(reel => reel[0])
  );

  const spin = () => {
    let spinsLeft = 20;
    const interval = setInterval(() => {
      setCurrentValues(slotMakerConfig.map(reel => 
        reel[Math.floor(Math.random() * reel.length)]
      ));
      
      spinsLeft--;
      if (spinsLeft <= 0) {
        clearInterval(interval);
      }
    }, 100);
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-center gap-4 mb-6 grid grid-cols-1 md:grid-cols-3">
        {currentValues.map((value, index) => (
          <div
            key={index}
            className="h-20 bg-gray-500 rounded-lg flex items-center justify-center text-2xl font-bold border-4 border-gray-300"
          >
            {value}
          </div>
        ))}
      </div>
      <div className='w-full flex items-center justify-center'>
        <button
            onClick={spin}
            className="w-[150px] bg-indigo-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-50"
        >
            <Dices className="w-5 h-5" />
            {t`Spin!`}
        </button>
      </div>
    </div>
  );
};