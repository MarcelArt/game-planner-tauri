import gameApi from '@/api/game.api';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import ItemCard from '@/components/item-card';
import { useState } from 'react';
import itemApi from '@/api/item.api';
import Paginator from '@/components/paginator';
import CreateItemDialog from '@/components/create-item-dialog';

export default function ItemsView() {
  const { gameId } = useParams();
  const [page, setPage] = useState(0);

  const gameQuery = useQuery({
    queryKey: ['game', gameId],
    queryFn: () => gameApi.getById(gameId!),
  });

  const itemsQuery = useQuery({
    queryKey: ['items', gameId, page],
    queryFn: () => itemApi.getByGameId(gameId!, page, 20),
  });

  return (
    <div className='m-20'>
      <Card>
        <CardHeader>
          <CardTitle>{gameQuery.data?.name} Items</CardTitle>
          <CardDescription>All available {gameQuery.data?.name} items</CardDescription>
        </CardHeader>
        <CardContent className='space-y-2'>
          <CreateItemDialog gameId={gameId!} />
          <div className='grid grid-cols-5 gap-2'>
            {itemsQuery.data?.items.map((item) => (
              <ItemCard item={item} />
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Paginator page={page} limit={20} onClickPage={setPage} total={itemsQuery.data?.total!} />
        </CardFooter>
      </Card>
    </div>
  );
}
