import { open } from '@tauri-apps/plugin-dialog';
import { BaseDirectory, readFile } from '@tauri-apps/plugin-fs';


interface ImagePickerParam {
  setPicture: (p: string) => void;
  setBase64: (b64: string) => void;
}

export async function imagePicker({ setPicture, setBase64 }: ImagePickerParam) {
  const file = await open({
    multiple: false,
    filters: [
      {
        name: 'Image',
        extensions: ['png', 'jpeg', 'jpg', 'webp'],
      },
    ],
  });

  if (file) {
    const binary = await readFile(file);
    const base64String = `data:image/${file.split('.').pop()};base64,${btoa(
      new Uint8Array(binary).reduce((data, byte) => data + String.fromCharCode(byte), '')
    )}`;
    
    setBase64(base64String);
    setPicture(file);
  }
}

export async function readFileAsBase64(file: string): Promise<string> {
  try {
    const binary = await readFile(file);
    const base64String = `data:image/${file.split('.').pop()};base64,${btoa(
      new Uint8Array(binary).reduce((data, byte) => data + String.fromCharCode(byte), '')
    )}`;
  
    return base64String;
  }
  catch(e) {
    console.log(`error ${file}`, e);
    throw e;
  }
}
