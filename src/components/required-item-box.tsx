import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import inventoryApi from '@/api/inventory.api';

interface RequiredItemBoxProps {
  recipe: PlanRecipeResponse;
  gameId: string;
}

export default function RequiredItemBox({ recipe, gameId }: RequiredItemBoxProps) {
  const delay = 1000;
  const [amount, setAmount] = useState(recipe.input_amount_owned ?? 0);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const queryClient = useQueryClient();

  const isDone = recipe.input_need_amount <= 0;

  const upsertInventory = useMutation({
    mutationFn: (input: InventoryDto) => inventoryApi.upsert(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['plans', gameId],
      });
      queryClient.invalidateQueries({
        queryKey: ['inventories', gameId],
      });
    },
  });

  const onDebouncedChange = () => {
    const inventoryInput: InventoryDto = {
      amount,
      item_id: recipe.input_item_id,
      id: recipe.input_inventory_id,
    };
    upsertInventory.mutate(inventoryInput);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!isFirstRender) {
        onDebouncedChange();
      } else {
        setIsFirstRender(false);
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [amount]);

  return (
    <div className='col-span-1 flex flex-col justify-between items-center border-2 rounded-md border-foreground relative'>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={`self-end z-10 absolute top-0 right-0 m-1 px-1 text-xs rounded-sm ${isDone ? 'bg-green-500' : 'bg-red-500'}`}>
            {recipe.input_need_amount}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>Missing</p>
        </TooltipContent>
      </Tooltip>
      <img src={recipe.input_item_picture_b64} alt={recipe.input_item_name} className='w-16 h-16 mt-2' />
      <span className='text-sm my-1'>{recipe.input_item_name}</span>
      <div className={`rounded-sm flex flex-col items-center ${isDone ? 'bg-green-500' : 'bg-red-500'}`}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className='text-sm my-1 w-full text-center'>{recipe.required_amount}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Required</p>
          </TooltipContent>
        </Tooltip>
        <Input
          type='number'
          className='text-center bg-accent rounded-md border-foreground border-2'
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
        />
      </div>
    </div>
  );
}
