'use client';

import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const OpenLocationCode = require('open-location-code').OpenLocationCode;
const openLocationCode = new OpenLocationCode();

function formatToFourDecimals(num: number): number {
  return parseFloat(num.toFixed(4));
}

export default function Home() {
  const [plusCode, setPlusCode] = useState('');
  const [cordinates, setCordinates] = useState({ latitudeCenter: 0, longitudeCenter: 0 });
  const [error, setError] = useState('');

  const generateLatLong = () => {
    try {
      if (plusCode === '') {
        setError('Informe um plus code');
        return;
      }
      console.log('generateLatLong');
      console.log('plusCode: ', plusCode);
      console.log('decode: ', openLocationCode.decode(plusCode));
      const { latitudeCenter, longitudeCenter } = openLocationCode.decode(plusCode);
      setCordinates({ latitudeCenter, longitudeCenter });
      setError('');
    } catch (error) {
      console.log('error: ', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-20">
      <main className="flex h-4/5 w-4/5 flex-col items-center gap-8">
        <input
          type="text"
          id="input"
          className="color-blue-600 w-96 rounded-md border border-gray-300 p-2"
          value={plusCode}
          onChange={({ target }) => setPlusCode(target.value)}
        />
        <button
          onClick={generateLatLong}
          type="button"
          className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Gerar coordenadas
        </button>
        <div className="flex flex-col text-white">
          <span>plusCode válido: {openLocationCode.isValid(plusCode) ? 'Sim' : 'Não'}</span>
          <span>plusCode formato short: {openLocationCode.isShort(plusCode) ? 'Sim' : 'Não'}</span>
          <span>plusCode formato full: {openLocationCode.isFull(plusCode) ? 'Sim' : 'Não'}</span>
          <span>Latitude: {formatToFourDecimals(cordinates.latitudeCenter)}</span>
          <span>Longitude: {formatToFourDecimals(cordinates.longitudeCenter)}</span>
        </div>
        {error && (
          <div className="text-red">
            <span>Error: {error}</span>
          </div>
        )}
      </main>
    </div>
  );
}
