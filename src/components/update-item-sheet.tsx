import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { SheetClose, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from './ui/sheet';
import { imagePicker } from '@/utils/fs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import itemApi from '@/api/item.api';
import ItemImagePicker from './item-image-picker';
import { useToast } from '@/hooks/use-toast';
import { Separator } from './ui/separator';
import CreateRecipeDialog from './create-recipe-dialog';

interface UpdateItemSheetProps {
  item: Item;
}

export default function UpdateItemSheet({ item }: UpdateItemSheetProps) {
  const [name, setName] = useState(item.name);
  const [picture, setPicture] = useState(item.picture);
  const [base64, setBase64] = useState(item.picture_b64);

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const updateItem = useMutation({
    mutationFn: () =>
      itemApi.update(item.id, {
        game_id: item.game_id,
        name,
        picture,
      }),
    onSuccess: () => {
      toast({
        title: 'Item saved',
        description: `Updated item ${name} data`,
        variant: 'default',
      });
      queryClient.invalidateQueries({ queryKey: ['items', item.game_id] });
    },
  });

  return (
    <>
      <SheetHeader>
        <SheetTitle>Edit {item.name}</SheetTitle>
        <SheetDescription>Make changes to your item here. Click save when you're done.</SheetDescription>
      </SheetHeader>
      <div className='grid gap-4 py-4'>
        <ItemImagePicker base64={base64} onClick={() => imagePicker({ setBase64, setPicture })} />
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='name' className='text-right'>
            Name
          </Label>
          <Input id='name' value={name} className='col-span-3' onChange={(e) => setName(e.target.value)} />
        </div>
      </div>
      <div className='w-full flex justify-end'>
        <Button type='submit' onClick={() => updateItem.mutate()}>
          Save changes
        </Button>
      </div>
      <Separator className='my-4' />
      <h2 className='font-bold'>{item.name} Recipes</h2>
      <div className='w-full flex justify-end'>
        <CreateRecipeDialog item={item} />
      </div>
      <SheetFooter>
        <SheetClose asChild></SheetClose>
      </SheetFooter>
    </>
  );
}
