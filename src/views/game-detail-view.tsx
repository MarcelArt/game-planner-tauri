import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UpdateGame from '@/components/update-game';
import { useQuery } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';
import { useParams } from 'react-router';

function GameDetailView() {
  const { gameId } = useParams();
  console.log('gameId :>> ', gameId);

  const { data, isPending } = useQuery({
    queryKey: ['game', gameId],
    queryFn: () => invoke('get_game_by_id', { id: gameId }),
  });

  const renderUpdateGame = () => {
    if (isPending || !gameId) {
      return null;
    }
    const game = data as Game;
    return <UpdateGame title={game.name} description={game.description} picture={game.picture} gameId={gameId} />;
  }

  return (
    <div className='flex flex-col items-center space-y-4 w-full'>
      <h1 className='font-bold text-2xl'>Game</h1> 
      <Tabs defaultValue='game' className='w-full my-10'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='game'>Game</TabsTrigger>
          <TabsTrigger value='password'>Password</TabsTrigger>
        </TabsList>
        <TabsContent value='game'>
          {renderUpdateGame()}
        </TabsContent>
        <TabsContent value='password'>
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='space-y-1'>
                <Label htmlFor='current'>Current password</Label>
                <Input id='current' type='password' />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='new'>New password</Label>
                <Input id='new' type='password' />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default GameDetailView;
