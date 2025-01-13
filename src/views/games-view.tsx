import { useMutation } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

function GamesView() {
  const createGame = useMutation({
    mutationFn: (input: GameDto) => {
      console.log('input :>> ', input);
      return invoke('create_game', { input });
    },
    onSuccess: () => {},
    onError: (err) => {
      console.log('err :>> ', err);
    },
  });

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className='h-full w-full flex flex-col mx-4 items-start space-y-2'>
      <h1 className='font-bold text-2xl'>Games</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Game</DialogTitle>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Name
              </Label>
              <Input id='name' value={name} className='col-span-3' onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='description' className='text-right'>
                Description
              </Label>
              <Input id='description' value={description} className='col-span-3' onChange={(e) => setDescription(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type='submit' onClick={() => createGame.mutate({ name, description })}>
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default GamesView;
