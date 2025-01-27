import gameApi from '@/api/game.api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

export default function ItemsView() {
  const { gameId } = useParams();
  console.log('gameId :>> ', gameId);

  const gameQuery = useQuery({
    queryKey: ['game', gameId],
    queryFn: () => gameApi.getById(gameId!),
  })

  return (
    <div className='m-20'>
      <Card>
        <CardHeader>
          <CardTitle>{gameQuery.data?.name} Items</CardTitle>
          <CardDescription>All available {gameQuery.data?.name} items</CardDescription>
        </CardHeader>
        <CardContent className='space-y-2'>
          <Button>Create</Button>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
