import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import GameCard from '@/components/game-card';
import { Skeleton } from '@/components/ui/skeleton';

function GamesView() {
  const queryClient = useQueryClient();
  const createGame = useMutation({
    mutationFn: (input: GameDto) => {
      console.log('input :>> ', input);
      return invoke('create_game', { input });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['games'] }),
    onError: (err) => {
      console.log('err :>> ', err);
    },
  });

  const { isPending, data } = useQuery({
    queryKey: ['games'],
    queryFn: () => invoke('read_game', { page: 0, limit: 20 }),
  });

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');

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
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='picture' className='text-right'>
                Picture URL
              </Label>
              <Input id='picture' value={pictureUrl} className='col-span-3' onChange={(e) => setPictureUrl(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type='submit' onClick={() => createGame.mutate({ name, description, picture: pictureUrl })}>
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {isPending ? onLoading() : readGames(data as Page<Game>)}
    </div>
  );
}

function onLoading() {
  return (
    <div className='grid grid-cols-5 gap-1 pb-4 border-b'>
      {/* <GameCard
        img='https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/key-art/Vanilla-PMP_Collection-Carousel-0_Buzzy-Bees_1280x768.jpg'
        title='Minecraft'
      /> */}
      <Skeleton className='aspect-[16/9] h-[180px] rounded-lg' />
      <Skeleton className='aspect-[16/9] h-[180px] rounded-lg' />
      <Skeleton className='aspect-[16/9] h-[180px] rounded-lg' />
      <Skeleton className='aspect-[16/9] h-[180px] rounded-lg' />
      <Skeleton className='aspect-[16/9] h-[180px] rounded-lg' />
      <Skeleton className='aspect-[16/9] h-[180px] rounded-lg' />
      <Skeleton className='aspect-[16/9] h-[180px] rounded-lg' />
      <Skeleton className='aspect-[16/9] h-[180px] rounded-lg' />
      <Skeleton className='aspect-[16/9] h-[180px] rounded-lg' />
      <Skeleton className='aspect-[16/9] h-[180px] rounded-lg' />
      <Skeleton className='aspect-[16/9] h-[180px] rounded-lg' />
      <Skeleton className='aspect-[16/9] h-[180px] rounded-lg' />
      <Skeleton className='aspect-[16/9] h-[180px] rounded-lg' />
      <Skeleton className='aspect-[16/9] h-[180px] rounded-lg' />
      <Skeleton className='aspect-[16/9] h-[180px] rounded-lg' />
      <Skeleton className='aspect-[16/9] h-[180px] rounded-lg' />
      <Skeleton className='aspect-[16/9] h-[180px] rounded-lg' />
      <Skeleton className='aspect-[16/9] h-[180px] rounded-lg' />
      <Skeleton className='aspect-[16/9] h-[180px] rounded-lg' />
      <Skeleton className='aspect-[16/9] h-[180px] rounded-lg' />
    </div>
  );
}

function readGames(data: Page<Game>) {
  console.log('data :>> ', data);
  return (
    <div className='grid grid-cols-5 gap-1 pb-4 border-b'>
      {data.items.map((game) => {
        console.log('game.picture :>> ', game.picture);
        return <GameCard title={game.name} img={game.picture} />;
      })}
    </div>
  );
}

export default GamesView;
