import { useEffect, useState } from 'react';

import { NetworkInformation } from './experimental-types/NetworkInformation.bundled';
import { canUseDOM, managedEventListener } from './utils';

/**
 * Tracks information about the device's network connection.
 *
 * ⚗️ _The underlying technology is experimental. Please be aware about browser compatibility before using this in production._
 *
 * @returns Connection data, or `undefined` when unavailable.
 *
 * @example
 * function Component() {
 *   const networkInformation = useNetworkInformation();
 *   if (networkInformation) {
 *     const { effectiveType, downlink, rtt, saveData } = networkInformation;
 *   }
 *   // ...
 * }
 */
export default function useNetworkInformation():
  | NetworkInformation
  | undefined {
  const [networkInformation, setNetworkInformation] = useState(
    canUseDOM ? navigator.connection : undefined,
  );

  useEffect(
    () =>
      navigator.connection
        ? managedEventListener(navigator.connection, 'change', () => {
            setNetworkInformation(navigator.connection);
          })
        : undefined,
    [],
  );

  return networkInformation;
}
