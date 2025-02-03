import { useEffect, useState } from 'react';
import { Input } from './ui/input';

interface InventoryBoxProps {
  inventory: InventoryWithItem;
}

export default function InventoryBox({ inventory }: InventoryBoxProps) {
  const delay = 1000;
  const [amount, setAmount] = useState(inventory.amount ?? 0);

  const onDebouncedChange = (a: number) => console.log('a :>> ', a);

  useEffect(() => {

    const handler = setTimeout(() => {
      onDebouncedChange(amount);
    }, delay);

    return () => clearTimeout(handler);
  }, [amount, delay, onDebouncedChange]);

  return (
    <div className='col-span-1 flex flex-col justify-between items-center border-2 rounded-md border-foreground'>
      <img src={inventory.item_picture_b64} alt={inventory.item_name} className='w-16 h-16 mt-2' />
      <span className='text-sm my-1'>{inventory.item_name}</span>
      <Input
        type='number'
        className='text-center bg-accent rounded-md border-foreground border-2'
        value={amount}
        onChange={(e) => setAmount(+e.target.value)}
      />
    </div>
  );
}
