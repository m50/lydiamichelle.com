import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ReactComponent as Upload } from '../svg/upload.svg';

export interface ImageData {
  name: string;
  base64: string;
}

interface Props {
  className?: string;
  id?: string;
  name?: string;
  text: string;
  onChange?: (file: ImageData) => void;
}

const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    if (!reader.result) {
      reject(new Error('Null reader result'));
      return;
    }
    let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
    if ((encoded.length % 4) > 0) {
      encoded += '='.repeat(4 - (encoded.length % 4));
    }
    resolve(encoded);
  };
  reader.onerror = (error) => reject(error);
});

export const FileInput: React.FC<Props> = ({ className, id, name, text, onChange }) => {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileData, setFileData] = useState('');
  const inputEl = useRef<HTMLInputElement>(null);
  const onClick = useCallback(() => {
    inputEl.current?.click();
  }, [inputEl]);

  useEffect(() => {
    const f = inputEl.current?.files?.[0];
    if (!f) {
      return;
    }
    setFileName(f.name);
    toBase64(f)
      .then((data) => {
        setFileData(data);
      });
  }, [file]);

  useEffect(() => {
    onChange?.({
      name: fileName,
      base64: fileData,
    });
  }, [fileName, fileData]);

  return (
    <div className="overflow-hidden relative w-full h-full">
      <button type="button" onClick={onClick}
        className={`relative top-0 right-0 left-0 bottom-0 ${className}`}
      >
        <Upload className="inline fill-current w-5 h-5 mr-2" />
        {fileName || text}
      </button>
      <input id={id} name={name} ref={inputEl} type="file" accept="image/*" value={file}
        onChange={({ target }) => setFile(target.value)}
        className="cursor-pointer absolute block opacity-0 top-0 right-0 left-0 bottom-0 pointer-events-none"
      />
    </div>
  );
};
