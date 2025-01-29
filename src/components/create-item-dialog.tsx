import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import itemApi from '@/api/item.api';
import { useToast } from '@/hooks/use-toast';
import { imagePicker } from '@/utils/fs';
import ItemImagePicker from './item-image-picker';

interface CreateItemDialogProps {
  gameId: string;
}

export default function CreateItemDialog(props: CreateItemDialogProps) {
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');
  const [base64, setBase64] = useState('');

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createItem = useMutation({
    mutationFn: () =>
      itemApi.create({
        game_id: props.gameId,
        name,
        picture,
      }),
    onSuccess: () => {
      toast({
        title: 'Item saved',
        description: `Created item ${name} data`,
        variant: 'default',
      });
      queryClient.invalidateQueries({ queryKey: ['items', props.gameId] });
      setName('');
      setPicture('');
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Item</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <ItemImagePicker base64={base64} onClick={() => imagePicker({ setBase64, setPicture })} />
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input id='name' value={name} className='col-span-3' onChange={(e) => setName(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='submit' onClick={() => createItem.mutate()}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
