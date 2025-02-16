import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import inventoryApi from '@/api/inventory.api';

interface InventoryBoxProps {
  inventory: InventoryWithItem;
}

export default function InventoryBox({ inventory }: InventoryBoxProps) {
  const delay = 1000;
  const [amount, setAmount] = useState(inventory.amount ?? 0);
  const [inventoryId, setInventoryId] = useState(inventory.id);

  const queryClient = useQueryClient();

  const upsertInventory = useMutation({
    mutationFn: (input: InventoryDto) => inventoryApi.upsert(input),
    onSuccess: (data) => {
      setInventoryId(data.id);
      queryClient.invalidateQueries({
        queryKey: ['inventories', inventory.game_id],
      })
    },
  });

  const onDebouncedChange = () => {
    upsertInventory.mutate({
      amount,
      item_id: inventory.item_id,
      id: inventoryId,
    });
  }

  useEffect(() => {

    const handler = setTimeout(() => {
      onDebouncedChange();
    }, delay);

    return () => clearTimeout(handler);
  }, [amount]);

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
