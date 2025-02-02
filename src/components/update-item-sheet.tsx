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
import { FaArrowRight } from 'react-icons/fa';

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
      <Separator className='my-2' />
      <div className='grid grid-cols-5 mt-2 border-2 p-1 bg-accent rounded-lg border-primary'>
        <div className='col-span-3 grid grid-cols-3 gap-1'>
          <div className='flex flex-col justify-between items-center border-2 rounded-md border-foreground'>
            <img src={base64} alt='Required Item' className='w-8 h-8' />
            <span>1</span>
          </div>
          <div className='flex flex-col justify-between items-center border-2 rounded-md border-foreground'>
            <img src={base64} alt='Required Item' className='w-8 h-8' />
            <span>1</span>
          </div>
          <div className='flex flex-col justify-between items-center border-2 rounded-md border-foreground'>
            <img src={base64} alt='Required Item' className='w-8 h-8' />
            <span>1</span>
          </div>
          <div className='flex flex-col justify-between items-center border-2 rounded-md border-foreground'>
            <img src={base64} alt='Required Item' className='w-8 h-8' />
            <span>1</span>
          </div>
        </div>
        <div className='col-span-1 flex items-center justify-between text-xl'>
          <Separator orientation='vertical' className='mx-2' />
          <FaArrowRight />
          <Separator orientation='vertical' className='mx-2' />
        </div>
        <div className='col-span-1 flex flex-col'>
          <div className='flex flex-col justify-between items-center border-2 rounded-md border-foreground'>
            <img src={base64} alt='Required Item' className='w-8 h-8' />
            <span>2</span>
          </div>
        </div>
      </div>
      <Separator className='my-2' />
      <div className='grid grid-cols-5 mt-2 border-2 p-1 bg-accent rounded-lg border-primary'>
        <div className='col-span-3 grid grid-cols-3 gap-1'>
          <div className='flex flex-col justify-between items-center border-2 rounded-md border-foreground'>
            <img src={base64} alt='Required Item' className='w-8 h-8' />
            <span>1</span>
          </div>
          <div className='flex flex-col justify-between items-center border-2 rounded-md border-foreground'>
            <img src={base64} alt='Required Item' className='w-8 h-8' />
            <span>1</span>
          </div>
          <div className='flex flex-col justify-between items-center border-2 rounded-md border-foreground'>
            <img src={base64} alt='Required Item' className='w-8 h-8' />
            <span>1</span>
          </div>
          <div className='flex flex-col justify-between items-center border-2 rounded-md border-foreground'>
            <img src={base64} alt='Required Item' className='w-8 h-8' />
            <span>1</span>
          </div>
        </div>
        <div className='col-span-1 flex items-center justify-between text-xl'>
          <Separator orientation='vertical' className='mx-2' />
          <FaArrowRight />
          <Separator orientation='vertical' className='mx-2' />
        </div>
        <div className='col-span-1 flex flex-col'>
          <div className='flex flex-col justify-between items-center border-2 rounded-md border-foreground'>
            <img src={base64} alt='Required Item' className='w-8 h-8' />
            <span>2</span>
          </div>
        </div>
      </div>
      <SheetFooter>
        <SheetClose asChild></SheetClose>
      </SheetFooter>
    </>
  );
}
