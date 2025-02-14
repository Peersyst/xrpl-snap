import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField } from '@peersyst/react-components';

const WalletManager: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<{ privateKey: string }>({
    privateKey: '',
  });

  const handleInputChange = (value: string) => {
    setFormData((prev: { privateKey: string }) => ({
      ...prev,
      privateKey: value,
    }));
  };

  const handleImportWallet = async () => {
    try {
      const { privateKey } = formData;
      if (!privateKey || !privateKey.startsWith('s')) {
        throw new Error('Invalid family seed format. Must start with "s"');
      }

      const snapId = process.env.REACT_APP_SNAP_ID;
      const response = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: 'xrpl_importWallet',
            params: {
              seed: privateKey
            }
          }
        }
      });
      console.log('Import wallet response:', response);
      // ... rest of the function
    } catch (error) {
      console.error('Error importing wallet:', error);
      // ... error handling
    }
  };

  return (
    <div>
      <TextField
        label={t('common:familySeed')}
        placeholder="Enter your family seed (starts with 's')"
        value={formData.privateKey}
        onChange={handleInputChange}
        type="password"
      />
      {/* ... rest of the JSX */}
    </div>
  );
};

export default WalletManager; 