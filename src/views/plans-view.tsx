import planApi from '@/api/plan.api';
import CreatePlanDialog from '@/components/create-plan-dialog';
import Paginator from '@/components/paginator';
import PlanBox from '@/components/plan-box';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
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
		<div className="m-20">
			<Card>
				<CardHeader>
					<CardTitle>Plans</CardTitle>
					<CardDescription>Your active plans</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-row justify-between mr-4 items-center">
						<p>Plans</p>
						<CreatePlanDialog gameId={gameId!} />
					</div>
					{plansQuery.isPending ? (
						<>
							<Skeleton className="w-full h-32 my-2" />
							<Skeleton className="w-full h-32 my-2" />
							<Skeleton className="w-full h-32 my-2" />
							<Skeleton className="w-full h-32 my-2" />
							<Skeleton className="w-full h-32 my-2" />
						</>
					) : (
						plansQuery.data?.items.map((plan, i) => <PlanBox key={i} plan={plan} gameId={gameId!} />)
					)}
				</CardContent>
				<CardFooter>
					<Paginator page={page} limit={20} onClickPage={setPage} total={plansQuery.data?.total!} />
				</CardFooter>
			</Card>
		</div>
	);
}
