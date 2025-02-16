import { Button } from './ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import itemApi from '@/api/item.api';
import { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import planApi from '@/api/plan.api';
import { useToast } from '@/hooks/use-toast';

interface CreatePlanDialogProps {
	gameId: string;
}

export default function CreatePlanDialog({ gameId }: CreatePlanDialogProps) {
	const [itemId, setItemId] = useState('');
	const [goal, setGoal] = useState(1);

  const { toast } = useToast();

  const queryClient = useQueryClient();

	const itemsQuery = useQuery({
		queryKey: ['dropdown-items', gameId],
		queryFn: () => itemApi.getAllByGameId(gameId),
	});

  const createPlan = useMutation({
    mutationFn: () => planApi.create({ goal, item_id: itemId }),
    onSuccess: () => {
      toast({
        title: 'Plan saved',
        description: `Plan successfully created`,
        variant: 'default',
      });

      queryClient.invalidateQueries({ queryKey: ['plans', gameId] })
    }
  })

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>New Plan</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Recipe</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="item_id" className="text-right">
							Item
						</Label>
						<Select value={itemId} onValueChange={setItemId}>
							<SelectTrigger className="col-span-3" id="item_id">
								<SelectValue placeholder="Select an item" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Item</SelectLabel>
									{itemsQuery.data?.map((item) => (
										<SelectItem value={item.id}>
											<div className="flex flex-row items-center space-x-4">
												<img className="w-8 h-8" src={item.picture_b64} />
												<p>{item.name}</p>
											</div>
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="goal" className="text-right">
							Goal
						</Label>
						<Input id="goal" type="number" value={goal} className="col-span-3" onChange={(e) => setGoal(+e.target.value)} />
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button type="submit" onClick={() => createPlan.mutate()}>
							Save
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
