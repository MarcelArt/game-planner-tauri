import planApi from '@/api/plan.api';
import Paginator from '@/components/paginator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';

export default function PlansView() {
  const { gameId } = useParams();

  const [page, setPage] = useState(0);

  const plansQuery = useQuery({
    queryKey: ['plans', gameId],
    queryFn: () => planApi.getByGameId(gameId!, 10, page),
  });

  return (
    <div className='m-20'>
      <Card>
        <CardHeader>
          <CardTitle>Plans</CardTitle>
          <CardDescription>Your active plans</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Plans</p>
        </CardContent>
        <CardFooter>
          <Paginator page={page} limit={20} onClickPage={setPage} total={plansQuery.data?.total!} />
        </CardFooter>
      </Card>
    </div>
  );
}
