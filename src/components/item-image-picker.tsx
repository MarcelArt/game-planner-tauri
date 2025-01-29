import { FaFileImage } from 'react-icons/fa';
import { Button } from './ui/button';

interface ItemImagePickerProps {
  base64: string;
  onClick: () => void;
}

export default function ItemImagePicker(props: ItemImagePickerProps) {
  return (
    <div className='flex flex-col w-full items-center'>
      <Button id='image' className='w-24 h-24 bg-background border-2 border-accent hover:bg-accent' onClick={props.onClick}>
        {props.base64 ? <img src={props.base64} /> : <FaFileImage />}
      </Button>
    </div>
  );
}
