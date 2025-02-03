import inventoryApi from '@/api/inventory.api';
import InventoryBox from '@/components/inventory-box';
import InventoryBoxSkeletonLoader from '@/components/inventory-box-skeleton-loader';
import Paginator from '@/components/paginator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';

function InventoryView() {
  const limit = 40;

  const { gameId } = useParams();

  const [page, setPage] = useState(0);

  const inventoriesQuery = useQuery({
    queryKey: ['inventories', gameId, page],
    queryFn: () => inventoryApi.getByGameId(gameId!, limit, page),
  });

  return (
    <div className='m-20'>
      <Card>
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
          <CardDescription>Your inventory for</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-10 grid-rows-4 gap-2'>
            {inventoriesQuery.isPending ? (
              <InventoryBoxSkeletonLoader repeat={limit} />
            ) : (
              inventoriesQuery.data?.items.map((inventory, i) => <InventoryBox key={i} inventory={inventory} />)
            )}
            {/* <InventoryBoxSkeletonLoader repeat={limit} /> */}
          </div>
        </CardContent>
        <CardFooter>
          <Paginator page={page} limit={20} onClickPage={setPage} total={inventoriesQuery.data?.total!} />
        </CardFooter>
      </Card>
    </div>
  );
}

export default InventoryView;
