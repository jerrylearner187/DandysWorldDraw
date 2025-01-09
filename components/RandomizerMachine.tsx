'use client'
import React, { useState } from 'react';
import { Dices } from 'lucide-react';
import { randomizerConfig } from '@/config/site';
import { t } from '@lingui/macro'

export const RandomizerMachine: React.FC<{
}> = () => {
  const [currentValue, setCurrentValue] = useState<string>(
    `${randomizerConfig[0][0]} with ${randomizerConfig[1][0]} + ${randomizerConfig[2][randomizerConfig[2].length-1]}`
  );

  const spin = () => {
    let spinsLeft = 30;
    const interval = setInterval(() => {
      const first = randomizerConfig[0][Math.floor(Math.random() * randomizerConfig[0].length)]
      const second = randomizerConfig[1][Math.floor(Math.random() * randomizerConfig[1].length)]
      const third = randomizerConfig[2][Math.floor(Math.random() * randomizerConfig[2].length)]
      setCurrentValue(`${first} with ${second} + ${third}`);
      
      spinsLeft--;
      if (spinsLeft <= 0) {
        clearInterval(interval);
      }
    }, 100);
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-center gap-4 mb-6 grid grid-cols-1">
        <div className="h-20 bg-accent rounded-lg flex items-center justify-center text-center text-2xl font-bold border-4 border-accent-600">
          {currentValue}
        </div>
      </div>
      <div className='w-full flex items-center justify-center'>
        <button
            onClick={spin}
            className="w-[150px] bg-indigo-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-50"
        >
            <Dices className="w-5 h-5" />
            {t`Randomize`}
        </button>
      </div>
    </div>
  );
};